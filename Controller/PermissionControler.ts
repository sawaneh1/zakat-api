
import prisma from "../config/db";


export const addPermission = async(req:any, res:any, next:any) => {
    try {
        const {name} = req.body
        const permission = await prisma.permission.create({
          data: {
            name,
            
          },
        });
        res.json({message:'Permission created succesfully....', permission})
        
    } catch (error) {
        console.log('error', error);
        
res.json('Somethinh went wrong')
        
    }
  }


  export const getAllPermissions = async(req:any, res:any) => {
    try {
        const permissions = await prisma.permission.findMany()
        res.json({message:'success', permissions }).status(200);
      } catch (error) {
        console.error("Error getting  role:", error);
        throw new Error("Could not get roles");
      }
  }
  