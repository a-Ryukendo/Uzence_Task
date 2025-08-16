"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@/lib/types";
import { ArrowDown, ArrowUp } from "lucide-react";

interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
};

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<T[]>([]);
  const [sortConfig, setSortConfig] = React.useState<SortConfig<T> | null>(null);

  React.useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (row: T) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some((r) => r.id === row.id);
      if (isSelected) {
        return prev.filter((r) => r.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };

  const allRowsSelected = data.length > 0 && selectedRows.length === data.length;
  const someRowsSelected = selectedRows.length > 0 && selectedRows.length < data.length;
  const selectionState = allRowsSelected ? true : someRowsSelected ? "indeterminate" : false;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectionState}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={String(column.accessorKey)}
                onClick={() => requestSort(column.accessorKey)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {sortConfig?.key === column.accessorKey && (
                    <span>
                      {sortConfig.direction === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {selectable && (
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={String(column.accessorKey)}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : sortedData.length > 0 ? (
            sortedData.map((row) => (
              <TableRow
                key={row.id}
                data-state={selectedRows.some((r) => r.id === row.id) ? "selected" : "unselected"}
              >
                {selectable && (
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.some((r) => r.id === row.id)}
                      onCheckedChange={() => handleSelectRow(row)}
                      aria-label={`Select row ${row.id}`}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={String(column.accessorKey)}>
                    {column.cell ? column.cell(row) : String(row[column.accessorKey])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="h-24 text-center"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
