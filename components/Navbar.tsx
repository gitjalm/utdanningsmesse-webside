"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  GraduationCap,
  House,
  LogIn,
  LogOut,
  Menu,
  ShieldUser,
  UserRoundPlus,
  X,
} from "lucide-react";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export default function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = session.data?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const handleSignOut = (redirectTo = "/") => {
    signOut();
    window.location.href = redirectTo;
  };

  return (
    <header className="sticky top-0 z-[999] w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/"
            className="flex gap-2 truncate text-xl font-semibold tracking-normal sm:text-2xl"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </div>
            Utdanningsmessen
          </Link>

          <nav
            aria-label="Hovedmeny"
            className="hidden items-center gap-1 lg:flex"
          >
            <Button
              asChild
              variant={isActive("/") ? "secondary" : "ghost"}
              className="gap-2"
            >
              <Link href="/">
                <House className="size-4" />
                Hjem
              </Link>
            </Button>

            {user?.role === "ADMIN" && (
              <Button
                asChild
                variant={isActive("/admin") ? "secondary" : "ghost"}
                className="gap-2"
              >
                <Link href="/admin">
                  <ShieldUser className="size-4" />
                  Admin
                </Link>
              </Button>
            )}
          </nav>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Button variant="outline" onClick={() => handleSignOut()}>
              <LogOut className="size-4" />
              Logg Ut
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleSignOut("/signin")}
              >
                <LogIn className="size-4" />
                Logg Inn
              </Button>
              <Button onClick={() => handleSignOut("/signup")}>
                <UserRoundPlus className="size-4" />
                Registrer
              </Button>
            </>
          )}
          <ModeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={isMenuOpen ? "Lukk meny" : "Apne meny"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "grid border-t border-border transition-[grid-template-rows] duration-200 lg:hidden",
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {isMenuOpen && (
            <nav aria-label="Mobilmeny">
              <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4">
                <Button
                  asChild
                  variant={isActive("/") ? "secondary" : "ghost"}
                  className="h-11 justify-start gap-3 px-3"
                >
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <House className="size-4" />
                    Hjem
                  </Link>
                </Button>

                {user?.role === "ADMIN" && (
                  <Button
                    asChild
                    variant={isActive("/admin") ? "secondary" : "ghost"}
                    className="h-11 justify-start gap-3 px-3"
                  >
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      <ShieldUser className="size-4" />
                      Admin
                    </Link>
                  </Button>
                )}

                <div className="mt-2 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
                  {user ? (
                    <Button
                      variant="outline"
                      className="h-11 justify-start gap-3 px-3 sm:col-span-2"
                      onClick={() => handleSignOut()}
                    >
                      <LogOut className="size-4" />
                      Logg Ut
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="h-11 justify-start gap-3 px-3"
                        onClick={() => handleSignOut("/signin")}
                      >
                        <LogIn className="size-4" />
                        Logg Inn
                      </Button>
                      <Button
                        className="h-11 justify-start gap-3 px-3"
                        onClick={() => handleSignOut("/signup")}
                      >
                        <UserRoundPlus className="size-4" />
                        Registrer
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
