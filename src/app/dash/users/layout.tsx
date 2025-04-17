import { getToken } from "@/lib/session";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isManager, isAdmin } = await getToken();

  const content = isManager || isAdmin ? <>{children}</> : <p>Unauthorized</p>;

  return content;
}
