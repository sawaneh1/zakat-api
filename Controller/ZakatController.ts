import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';
import { calculateZakat } from '../services/zakat/CalculateZakat.';
import { customResponse } from '../responses';
import { updateBalance } from '../services/acoount/UpdateBalance';
import { createTransaction } from '../services/transaction/CreateTransaction';



export const createZakat = async (req: Request, res: Response, next: NextFunction) => {
  const { value, collectionDate, location, userId, items } = req.body;
  let transaction;

  try {
    if (!value || !collectionDate || !location || !userId || !items || items.length === 0) {
      throw new CustomError('Invalid input data', 400);
    }
    await prisma.$transaction(async (prisma) => {
      const zakat = await prisma.zakat.create({
        data: {
          value,
          collectionDate,
          location,
          userId,
          items: {
            create: items,
          },
        },
        include: {
          user: true,
          items: true,
        },
      });

       const data = await createTransaction(value)

       if(data.status) {

         await updateBalance('credit', value, 1);
         transaction = zakat;
       } else{
        throw new CustomError('Unable to create zakat', 400, {reason: 'Failed at creating transaction!!!'})
       }

      });

    res.json({ message: 'Zakat created successfully', zakat: transaction }).status(201);

  } catch (error) {
    console.error('Error creating Zakat:', error);                                                                                              
    next(new CustomError('Could not create Zakat', 500));
  }
};



export const ZakatPayable = async (req:Request , res: Response , next: NextFunction) =>{
      const userId =  req.session.userId
  try {
    const nisab = await prisma.nisab.findFirst()
    console.log('nisab', nisab);
    
    const  data =  await calculateZakat(req.body, nisab, userId)
    if( data?.sucesss == false) {
     customResponse(res, data.sucesss, data.message, data.data, 400 )

    }
     customResponse(res, true, 'Zzakat Calucated Successfully', data?.data, 201)

  

  } catch (error) {
    next(new CustomError('Could not calculate your zakat please try again', 500));


  }


}

export const getZakat = async (req: Request, res: Response, next: NextFunction) => {
  const zakatId = parseInt(req.params.zakatId, 10);

  try {
    const zakat = await prisma.zakat.findUnique({
      where: { id: zakatId },
      include: {
        user: true,
        items: true,
      },
    });

    if (!zakat) {
      throw new CustomError('Zakat not found', 404);
    }

    res.json({ message: 'Zakat retrieved successfully', zakat }).status(200);
  } catch (error) {
    console.error('Error retrieving Zakat:', error);
    next(new CustomError('Could not retrieve Zakat', 500));
  }
};

export const updateZakat = async (req: Request, res: Response, next: NextFunction) => {
  const zakatId = parseInt(req.params.zakatId, 10);
  const { value, collectionDate, location, userId, items } = req.body;

  try {
    if (!value || !collectionDate || !location || !userId || !items || items.length === 0) {
      throw new CustomError('Invalid input data', 400);
    }

    const updatedZakat = await prisma.zakat.update({
      where: { id: zakatId },
      data: {
        value,
        collectionDate,
        location,
        userId,
        items: {
          deleteMany: {},
          create: items,
        },
      },
      include: {
        user: true,
        items: true,
      },
    });

    res.json({ message: 'Zakat updated successfully', updatedZakat }).status(200);
  } catch (error) {
    console.error('Error updating Zakat:', error);
    next(new CustomError('Could not update Zakat', 500));
  }
};


export const getZakats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zakats = await prisma.zakat.findMany({
      include: {
        user: true,
        items: true,
      },
    });

    res.json({ message: 'Zakats retrieved successfully', zakats }).status(200);
  } catch (error) {
    console.error('Error retrieving Zakats:', error);
    next(new CustomError('Could not retrieve Zakats', 500));
  }
};
