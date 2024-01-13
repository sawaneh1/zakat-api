import prisma from "../config/db";

export const addUser = async (req: any, res: any) => {
  const { user } = req.body;
  console.log('user...', user);
  
  try {
    const userData = await prisma.user.create({
      data: user
    });

    res.json({ message: 'User added successfully', userData }).status(201);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};

export const getAllUsers = async (req: any, res: any) => {

  try {
    const user = await prisma.user.findMany()
    res.json({message:'success', user }).status(200);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};


export const  assignRoleToUser = async (userId:number, roleId:number) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      role: {
        connect: { id: roleId },
      },
    },
  });
  return updatedUser;
}





