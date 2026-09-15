import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { cn } from "./utils";
import { EmptyState } from "./empty-state";
import { LoadingState } from "./loading-state";
import { Skeleton } from "./skeleton/skeleton";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  headClassName?: string;
  cellClassName?: string;
  align?: "left" | "right" | "center";
  skeletonClassName?: string;
};

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyMessage = "No results found.",
  className,
  loading = false,
  loadingLabel = "Loading results",
  loadingVariant = "spinner",
  variant = "default",
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: ReactNode;
  className?: string;
  loading?: boolean;
  loadingLabel?: string;
  loadingVariant?: "spinner" | "skeleton";
  variant?: "default" | "compact" | "catalog";
}) {
  return (
    <Table data-variant={variant} className={className} aria-busy={loading || undefined} aria-label={loading ? loadingLabel : undefined}>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={cn(
                "bg-muted/40 first:rounded-tl-lg last:rounded-tr-lg",
                alignClass[column.align ?? "left"],
                column.headClassName,
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && loadingVariant === "skeleton" ? (
          Array.from({ length: 8 }, (_, index) => <TableRow key={index} className="hover:bg-transparent">
            {columns.map(column => <TableCell key={column.key} className={cn(variant === "compact" ? "py-2" : variant === "catalog" ? "py-5" : "py-3.5", alignClass[column.align ?? "left"], column.cellClassName)}>
              <Skeleton className={cn("h-5 w-full max-w-32", column.skeletonClassName)} />
            </TableCell>)}
          </TableRow>)
        ) : loading || rows.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={Math.max(1, columns.length)}
              className="h-32 whitespace-normal text-center text-sm text-muted-foreground"
            >
              {loading ? <LoadingState label={loadingLabel} /> : <EmptyState title={emptyMessage} />}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onRowClick(row);
                }
              } : undefined}
              className={cn(onRowClick && "cursor-pointer")}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={cn(
                    variant === "compact" ? "py-2" : variant === "catalog" ? "py-5" : "py-3.5",
                    alignClass[column.align ?? "left"],
                    column.cellClassName,
                  )}
                >
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
