"use client";

import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { EmailRepository } from "@/api/repositories/email.respository";

type Props = {
  emails: EmailRepository[];
};

export default function EmailTable({ emails }: Props) {
  return <DataTable columns={columns} data={emails} />;
}
