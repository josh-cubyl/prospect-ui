"use client";

import React from "react";
import EmailTable from "./email-table/email-table";
import { useQuery } from "@tanstack/react-query";
import { getEmails } from "@/api/endpoints/email/get-emails";
import { Input } from "../ui/input";

type Props = {};

export default function EmailContainer({}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["emails"],
    queryFn: getEmails,
  });

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Search emails" />
      </div>

      <EmailTable emails={data || []} />
    </div>
  );
}
