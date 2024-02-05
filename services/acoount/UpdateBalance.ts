import { CustomError } from "../../Middleware/error"
import prisma from "../../config/db"

export const updateBalance = async (type:string, amount:number, accountId:number) =>{


  const account = prisma.account.findUnique({
    where:{id:accountId}
  })

   if(!account){
     throw new CustomError('Ops that resource was  not found...', 404, {reason:'Unable to locate the resouce'}) 
   } 
   if(type == 'credit'){
    await prisma.account.update({
      where: {id:accountId},
      data:{
        balance:account.balance + amount
      }
    })
        return {success: true}
   }else {
       await prisma.account.update({
        where:{id: accountId},
        data:{
          balance:account.balance - amount
        }
       })
       return {success: true}

   }

}