import { Skeleton } from "./skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

export type DataTableSkeletonColumn = {
  header: string;
  cellClassName?: string;
  skeletonClassName?: string;
};

export function DataTableSkeleton({
  columns,
  rows = 8,
  label = "Loading",
}: {
  columns: DataTableSkeletonColumn[];
  rows?: number;
  label?: string;
}) {
  return (
    <div role="status" aria-label={label}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column, i) => (
              <TableHead key={i} className="bg-muted/40">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent">
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.cellClassName}>
                  <Skeleton
                    className={column.skeletonClassName ?? "h-4 w-24"}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
