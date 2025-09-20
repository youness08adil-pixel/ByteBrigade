import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "../lib/db";

import { CreditCard, DoorClosed, Home, Settings, ShieldUser, BookOpenCheck, UserStar, Clapperboard, LayoutDashboard } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Link from "next/link";
import * as Icons from "lucide-react";

console.log(Icons);
export const navItems = [
  { name: "Admin", href: "/admin", icon: ShieldUser },
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Home", href: "/", icon: Home },
  { name: "Club Admins", href: "/admins", icon: UserStar },
  { name: "Activities", href: "/activities", icon: Clapperboard},
  { name: "Courses", href: "/courses", icon: BookOpenCheck},
  { name: "Settings", href: "/settings", icon: Settings },
];



export async function UserNav({
  name,
  email,
  image,
  dbUser
}: {
  name: string;
  email: string;
  image: string;
  dbUser: { role: string } | null; 
}) {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} alt="" />
            <AvatarFallback>Jan</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.filter(item=> (dbUser?.role=="USER"&&item.name!="Admin"&&item.name!="Dashboard"?true:false) || (dbUser?.role=="ADMIN") ).map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className="w-full flex justify-between items-center"
              >
                {item.name}
                <span>
                  <item.icon className="w-4 h-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="w-full flex justify-between items-center"
          asChild
        >
          <LogoutLink>
            Logout{" "}
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
