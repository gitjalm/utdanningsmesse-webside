import { getCurrentUserRole } from "@/lib/auth-utils";
import { redirect } from "next/dist/client/components/navigation";

export default async function AdminPage() {
  const userRole = await getCurrentUserRole();

  if (userRole !== "ADMIN") {
    redirect("/signin");
  }

  return (
    <main>
      <h1>Admin Page</h1>
    </main>
  );
}
