import { EmailRepository } from "@/api/repositories/email.respository";
import { ColumnDef } from "@tanstack/react-table";
import EmailEditorSheet from "../email-editor/email-editor-sheet";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<EmailRepository>[] = [
  {
    accessorKey: "name",
    header: "Name",
    accessorFn: (row) => row.prospect?.name,
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
  },
  {
    accessorKey: "content",
    header: "Content",
    size: 400,
    cell: ({ row }) => (
      <div className="line-clamp-1 max-w-[300px]">
        <p className="truncate text-muted-foreground">{row.original.content}</p>
      </div>
    ),
  },
  {
    accessorKey: "isApproved",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isApproved ? (
          <Badge variant="default">Approved</Badge>
        ) : row.original.isDenied ? (
          <Badge variant="destructive">Denied</Badge>
        ) : (
          <Badge variant="outline">Pending Review</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <></>,
    cell: ({ row }) => (
      <div>
        <EmailEditorSheet email={row.original} />
      </div>
    ),
  },
];
