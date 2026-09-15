# Seller shared UI migration

The Seller portal consumes @mpeep/ui. Local components/ui primitive files are compatibility re-exports, not separate implementations. The preview remains exclusively at mpeep-ui /ui-preview.

## Shared implementations

- Sidebar and SidebarItem: active, locked, collapsed desktop navigation and a Radix Sheet navigation drawer for tablet widths.
- WorkspaceShell: consistent workspace header, navigation control, status slot, and content offsets. Both dashboard and operational Seller pages use it.
- MetricCard: replaces the local MainCard and InventoryMetricCard presentation.
- DataTable: default, compact, and catalog row spacing. The product catalogue now uses a semantic shared table instead of a custom grid that imitated a table; inventory and orders already use DataTable.
- MultiSelect: controlled selection, grouped options, disabled chips, and Radix popover focus management.
- ImageUploader: the existing four-image, 5 MB, JPEG/PNG/WebP upload contract, moved without changing Seller submission ownership.
- RichTextEditor: existing formatting controls moved to the package. This migration retains the existing editing engine; it is not a new sanitization boundary.
- Stepper: shared product creation progress and back-navigation control.
- EmptyState, StatusBadge, Button, and Skeleton replace duplicated empty state, status treatments, raw buttons, and header loading markup.

## App-owned behavior

Seller API calls, approval checks, route configuration, order status mappings, product/variant transformations, location/geocoding integration, registration validation, and business-specific drawer/page compositions remain in mpeep-seller. These compose shared UI rather than moving Seller business logic into the design system. Order-specific skeleton compositions also remain local and use shared skeleton primitives.

The public marketing landing page is not redesigned as part of the portal migration. Existing business-specific content layouts are retained.

New generic controls belong in mpeep-ui/src and need a preview example and generated props. After a shared source change, refresh the file dependency with pnpm install in each affected consuming app.
