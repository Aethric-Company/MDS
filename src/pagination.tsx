"use client";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination-primitives";

const SIBLINGS = 1;

function pageRange(page: number, pageCount: number): (number | "ellipsis")[] {
  const totalVisible = SIBLINGS * 2 + 5;
  if (pageCount <= totalVisible)
    return Array.from({ length: pageCount }, (_, i) => i + 1);

  const left = Math.max(page - SIBLINGS, 2);
  const right = Math.min(page + SIBLINGS, pageCount - 1);
  const range: (number | "ellipsis")[] = [1];

  if (left > 2) range.push("ellipsis");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < pageCount - 1) range.push("ellipsis");
  range.push(pageCount);

  return range;
}

export function Pagination({
  page,
  pageSize,
  total,
  disabled,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  function go(next: number) {
    if (disabled || next < 1 || next > pageCount || next === page) return;
    onPageChange(next);
  }

  return (
    <div className="flex flex-col flex-wrap gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="shrink-0 text-sm text-muted-foreground">
        {total === 0 ? "No results" : `Showing ${from}–${to} of ${total}`}
      </p>
      <PaginationRoot className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={disabled || page <= 1}
              className={
                disabled || page <= 1
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                go(page - 1);
              }}
            />
          </PaginationItem>
          {pageRange(page, pageCount).map((entry, i) =>
            entry === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={entry}>
                <PaginationLink
                  href="#"
                  isActive={entry === page}
                  aria-disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault();
                    go(entry);
                  }}
                >
                  {entry}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={disabled || page >= pageCount}
              className={
                disabled || page >= pageCount
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                go(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
}
