import type { ReactNode } from "react";

export type ColumnDef<T> = {
  accessorKey: keyof T;
  header: ReactNode;
  cell?: (row: T) => ReactNode;
};
