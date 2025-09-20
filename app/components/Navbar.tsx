import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import prisma from "../lib/db";
import { navItems } from "./UserNav";
import { cn } from "@/lib/utils";
import { getDbUser } from "../lib/user";

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await getDbUser();


  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            Byte<span className="text-primary">Brigade</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          {!(await isAuthenticated()) && (
            <div className="flex items-center gap-x-5">
              {navItems
                .filter((item) => item.name === "Club Admins" || item.name === "Activities")
                .map((item, index) => (
                  <Button key={index} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
            </div>
          )}
          <ThemeToggle />
            
          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}
              dbUser={dbUser}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>

              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
