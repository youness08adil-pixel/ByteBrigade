"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./Themetoggle";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserNav } from "./UserNav";
import { navItems } from "./UserNav";

export function MobileNavbar({ isAuthenticated, user, dbUser }: any) {
  const [isOpen, setIsOpen] = useState(false);

  // close menu when resizing back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="md:hidden border-b bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/">
          <h1 className="font-bold text-2xl">
            Byte<span className="text-primary">Brigade</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 px-6 py-4 border-t bg-background">
          {!isAuthenticated && (
            <div className="flex flex-col gap-3">
              {navItems
                .filter((item) => item.name === "Club Admins" || item.name === "Activities")
                .map((item, index) => (
                  <Button key={index} asChild className="w-full">
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
            </div>
          )}

          {isAuthenticated ? (
            <UserNav
              email={user?.email}
              image={user?.picture}
              name={user?.given_name}
              dbUser={dbUser}
            />
          ) : (
            <div className="flex flex-col gap-3">
              <LoginLink>
                <Button className="w-full">Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary" className="w-full">
                  Sign Up
                </Button>
              </RegisterLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
