import { EmailRepository } from "@/api/repositories/email.respository";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EmailEditor from "./email-editor";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import ProspectCard from "@/components/prospect/prospect-card";
import TriggerCard from "@/components/prospect/trigger-card";

type Props = {
  email: EmailRepository;
};

export default function EmailEditorSheet({ email }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="xs">
          Edit
          <PenIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[800px] flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>Email to: {email.prospect?.name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {email.prospect && <ProspectCard prospect={email.prospect} />}
          {email.trigger && <TriggerCard trigger={email.trigger} />}
          <EmailEditor email={email} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
