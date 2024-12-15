import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { LinkedinIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ProspectRepository } from "@/api/repositories/prospect.repository";

type Props = {
  prospect: ProspectRepository;
};

export default function ProspectCard({ prospect }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded">
            <UserIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {prospect.name}
              <Link
                href={prospect.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkedinIcon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              {prospect.headline}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Occupation</div>
          <div className="text-sm">{prospect.headline}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Location</div>
          <div className="text-sm">
            {prospect.location ? prospect.location : "Unknown"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
