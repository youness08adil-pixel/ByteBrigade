import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getDbUser() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) return null;

  const user = await getUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return dbUser;
}