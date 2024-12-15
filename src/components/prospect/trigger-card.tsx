import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ProspectEmailTriggerEnum } from "@/api/enums/prospect-email-trigger.enum";
import { TriggerRepository } from "@/api/repositories/trigger.repository";

type Props = {
  trigger: TriggerRepository;
};

export default function TriggerCard({ trigger }: Props) {
  return (
    <Card>
      <CardHeader>Email Trigger(s)</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>
          <div className="flex flex-col gap-2">
            {trigger.type === ProspectEmailTriggerEnum.DELTA && (
              <DeltaTriggerContent trigger={trigger} />
            )}
            {trigger.type === ProspectEmailTriggerEnum.MANUAL && (
              <ManualTriggerContent />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DeltaTriggerContent({ trigger }: Props) {
  if (!trigger.delta) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="text-sm text-muted-foreground">{trigger.delta.field}</div>
      <div className="text-sm">
        {trigger.delta.prevValue} → {trigger.delta.newValue}
      </div>
    </div>
  );
}

export function ManualTriggerContent() {
  return (
    <div className="flex flex-col">
      <div className="text-sm text-muted-foreground">Trigger Description</div>
      <div className="text-sm">Manual trigger</div>
    </div>
  );
}
