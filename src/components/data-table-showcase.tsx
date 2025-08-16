"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type User = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  lastLogin: Date;
};

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice.j@example.com", status: "Active", lastLogin: new Date("2023-10-26T10:00:00Z") },
  { id: 2, name: "Bob Williams", email: "bob.w@example.com", status: "Inactive", lastLogin: new Date("2023-09-15T14:30:00Z") },
  { id: 3, name: "Charlie Brown", email: "charlie.b@example.com", status: "Active", lastLogin: new Date("2023-10-27T08:45:00Z") },
  { id: 4, name: "Diana Miller", email: "diana.m@example.com", status: "Pending", lastLogin: new Date("2023-10-20T12:00:00Z") },
  { id: 5, name: "Ethan Davis", email: "ethan.d@example.com", status: "Active", lastLogin: new Date("2023-10-25T18:20:00Z") },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const variant = {
        Active: "default",
        Inactive: "secondary",
        Pending: "outline",
      }[row.status] as "default" | "secondary" | "outline";
      return <Badge variant={variant}>{row.status}</Badge>;
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: (row) => row.lastLogin.toLocaleDateString(),
  },
];

export function DataTableShowcase() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Switch id="loading-state" checked={loading} onCheckedChange={setLoading} />
        <Label htmlFor="loading-state">Toggle Loading State</Label>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        selectable
        onRowSelect={(selectedRows) => setSelected(selectedRows)}
      />

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium">Selected Rows:</h3>
          {selected.length > 0 ? (
            <pre className="mt-2 rounded-md bg-muted p-4 text-sm">
              <code>{JSON.stringify(selected.map(r => r.name), null, 2)}</code>
            </pre>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">No rows selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
