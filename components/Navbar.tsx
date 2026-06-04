"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { House, LogIn, ShieldUser, UserRoundPlus } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <section className="z-[999] flex w-full items-center lg:min-h-18 lg:px-[5%] border-b border-border">
        <div className="mx-auto size-full lg:grid lg:grid-cols-[0.375fr_0.375fr] lg:items-center lg:justify-between lg:gap-4">
          <div className="overflow-hidden px-[5%] text-center lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]">
            <Link href="/" className="font-semibold text-2xl pr-5">
              FirmaNavn
            </Link>
            <Link
              href="/"
              className="block flex gap-2 py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2 hover:text-primary transition"
            >
              <House />
              Hjem
            </Link>
          </div>
          <div className="hidden justify-self-end lg:block">
            {session.data?.user && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    signOut();
                    window.location.href = "/";
                  }}
                >
                  Logg Ut
                </Button>
                {session.data?.user.role === "ADMIN" && (
                  <Button asChild>
                    <Link
                      href="/admin"
                      className={cn(
                        "navigation-link",
                        isActive("/admin") && "border-primary text-primary",
                      )}
                    >
                      <ShieldUser />
                      Admin
                    </Link>
                  </Button>
                )}
                <ModeToggle />
              </div>
            )}
            {!session.data?.user && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    signOut();
                    window.location.href = "/signin";
                  }}
                >
                  <LogIn />
                  Logg Inn
                </Button>
                <Button
                  className="navigation-link"
                  onClick={() => {
                    signOut();
                    window.location.href = "/signup";
                  }}
                >
                  <UserRoundPlus />
                  Registrer
                </Button>
                <ModeToggle />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
