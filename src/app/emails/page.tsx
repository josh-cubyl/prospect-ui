import EmailContainer from "@/components/email/email-container";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

type Props = {};

export default function EmailsPage({}: Props) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <header className="w-full p-4 border-b gap-4 flex items-center">
        <SidebarTrigger />
        <div className="rounded text-lg">Emails</div>
      </header>
      <div className="p-4">
        <EmailContainer />
      </div>
    </main>
  );
}
