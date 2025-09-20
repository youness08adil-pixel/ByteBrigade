import prisma from "./db";

export async function getAllUsers() {

  const AllUsers = await prisma.user.findMany();

  return AllUsers;
}