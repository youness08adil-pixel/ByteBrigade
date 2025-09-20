export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
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
  const users = await prisma.user.findMany();



  // Format dates for display
  const formattedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    status: u.status,
    role: u.role,
    joinDate: u.joinedAt,
    lastLogin: u.lastLogin

  }));

  return <UsersTable 
  users={formattedUsers} 
  toggleUserStatus={toggleUserStatus} 
  />;
}
