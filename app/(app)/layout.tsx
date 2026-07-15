import { PageTransition } from "@/components/PageTransition";
import { TabBar } from "@/components/TabBar";

export default function AppShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="pb-[76px]">
        <PageTransition>{children}</PageTransition>
      </div>
      <TabBar />
    </>
  );
}
