import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/adminsidebar/admin-sidebar";
import { getCurrentUser } from "@/lib/auth/auth-utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const userData = {
    name: user?.name || "example",
    email: user?.email || "email@example.com",
  };

  return (
    <SidebarProvider>
      <AdminSidebar user={userData} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
