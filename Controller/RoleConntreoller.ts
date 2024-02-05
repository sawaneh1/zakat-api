
import prisma from "../config/db";


export const addRole = async(req:any, res:any) => {
    const {name,permission_id} = req.body
    const role = await prisma.role.create({
      data: {
        name,
        permissions: {
          create: permission_id,
        },
      },
      include: {
        permissions: true,
      },
    });
    res.json({message:'Permission created succesfully....', role})
  }


  export const getAllRoles = async(req:any, res:any) => {
    try {
        const role = await prisma.role.findMany()
        res.json({message:'success', role }).status(200);
      } catch (error) {
        console.error("Error getting  role:", error);
        throw new Error("Could not get roles");
      }
  }
  
  export const assignPermissionToRole = async(req:any, res:any) => {
    const {roleId,permissionIds} = req.body
    console.log('permissionIds', permissionIds);
    
    const updatedRole = await prisma.role.update({
        where: { id: roleId },
        data: {
          permissions: {
            connect: permissionIds.map((id:number) => ({ id })),
          },
        },
        include: {
          permissions: true,
        },
      });
    
    res.json({message:'permission created successuly', updatedRole})
  }