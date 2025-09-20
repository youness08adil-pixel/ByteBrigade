"use client";

import { useState,useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Calendar,
  ArrowUpDown,
  UserCheck,
  Ban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface User {
  id: string;
  name: string|null;
  email: string;
  status: string;
  role: string;
  joinDate: Date;
  lastLogin: Date;
}

interface UsersTableProps {
  users: User[];
  toggleUserStatus: (id: string, status: string) => Promise<void>;

}

export default function UsersTable({ users, toggleUserStatus }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
const [statuses, setStatuses] = useState(
  users.map((u) => u.status) // array of booleans
);

const handleToggle = (id: string, index: number) => {
  const currentStatus = statuses[index]; // ✅ use local state, not props

  const newStatus =
    currentStatus === "SUSPENDED" ? "INACTIVE" : "SUSPENDED";

  // 1. Optimistically update UI
  setStatuses((prev) =>
    prev.map((s, i) => (i === index ? newStatus : s))
  );

  // 2. Update DB
  startTransition(() => toggleUserStatus(id, currentStatus));
};



  const usersPerPage = 10;

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "SUSPENDED":
        return <Badge variant="destructive">Suspended</Badge>;
      case "INACTIVE":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
    }
  };

  const getRoleBadge = (plan: string) => {
    switch (plan) {
      case 'ADMIN':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">ADMIN</Badge>;
      case 'USER':
        return <Badge variant="secondary">USER</Badge>;
    }
  };


  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  User <ArrowUpDown className="inline-block ml-1 w-3 h-3" />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user,index) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined {user.joinDate.toLocaleDateString("en-GB")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(statuses[index])}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.lastLogin.toLocaleString("en-GB", { 
                              day: "2-digit", month: "2-digit", year: "numeric",
                              hour: "2-digit", minute: "2-digit" 
                            })}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="ghost" size="icon"
                      disabled={isPending}
                      onClick={() => handleToggle(user.id, index)}>
                      {statuses[index] === "ACTIVE" || statuses[index] === "INACTIVE" ? (
                        <Ban className="w-4 h-4 text-orange-600" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-green-600" />
                      )}
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
