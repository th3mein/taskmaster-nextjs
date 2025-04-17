import DashFooter from "@/components/DashFooter";
import DashHeader from "@/components/DashHeader";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <DashHeader />
      <div className="flex-1">{children}</div>
      <DashFooter className="sticky bottom-0" />
    </div>
  );
}
