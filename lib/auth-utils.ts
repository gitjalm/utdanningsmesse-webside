"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
}

export async function getCurrentUserRole() {
  const user = await getCurrentUser();

  return user?.role || null;
}

export async function requireAdmin() {
  const role = await getCurrentUserRole();

  if (!role || role !== "ADMIN") {
    redirect("/");
  }
}
