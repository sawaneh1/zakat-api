import { CustomError } from "../../Middleware/error"
import prisma from "../../config/db"

export const updateBalance = async (type:string, amount:number, accountId:number) =>{


  const account = prisma.account.findUnique({
    where:{id:accountId}
  })

   if(!account){
     throw new CustomError('Ops that resource was not found...', 404, {reason:'Unable to locate the resouce'}) 
   } 
  
   await prisma.account.update({
    where: { id: accountId },
    data: {
      balance: {
        [type === 'credit' ? 'increment' : 'decrement']: amount,
      },
    },
  });
  return {status:true,}

}