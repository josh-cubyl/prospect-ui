import EmailContainer from "@/components/email/email-container";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <header className="w-full p-4 border-b gap-4 flex items-center">
        <SidebarTrigger />
        <div className="rounded text-lg">Dashboard</div>
      </header>
      <div className="p-4">
        <EmailContainer />
      </div>
    </main>
  );
}
