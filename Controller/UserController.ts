import prisma from "../config/db";

export const addUser = async (req: any, res: any) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};
