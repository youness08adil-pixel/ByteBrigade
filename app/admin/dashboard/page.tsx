export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import prisma from "@/app/lib/db";
import UsersTable from "@/app/components/UsersTable";

async function toggleUserStatus(id: string, status: string) {
  "use server";

  const newStatus = status === "SUSPENDED" ? "INACTIVE" : "SUSPENDED";

  await prisma.user.update({
    where: { id },
    data: { status: newStatus },
  });
}

export default async function AdminUsersPage() {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const users = await prisma.user.findMany();

  // Normalize statuses based on lastLogin
  const updatedUsers = await Promise.all(
    users.map(async (u) => {
      let newStatus = u.status;

      if (u.status !== "SUSPENDED") {
        if (u.lastLogin && u.lastLogin < oneWeekAgo) {
          newStatus = "INACTIVE";
        } else {
          newStatus = "ACTIVE";
        }
      }

      // Only update DB if status changed
      if (newStatus !== u.status) {
        await prisma.user.update({
          where: { id: u.id },
          data: { status: newStatus },
        });
      }

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        status: newStatus,
        role: u.role,
        joinDate: u.joinedAt,
        lastLogin: u.lastLogin,
      };
    })
  );

  return (
    <UsersTable users={updatedUsers} toggleUserStatus={toggleUserStatus} />
  );
}
