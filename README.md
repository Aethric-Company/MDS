# Mpeep UI

The /ui-preview catalog is organized into Foundations, Core Components, Navigation, Cards, Data Display, Feedback, Mpeep Business Components, and Page Templates. Search finds entries across all groups. Live examples use Mpeep Web's shared theme. Items marked Not yet shared or App-specific reserve menu entries and do not claim an implemented shared component.

Shared UI for mpeep-web, mpeep-seller and mpeep-management. Mobile is excluded.

## Usage

```tsx
import { Button, Input, DatePicker } from "@mpeep/ui";
import { DataTable } from "@mpeep/ui/data-table";
```

Existing app components/ui files forward to this package for compatibility. Add shared implementations here, never to those forwarding files. Keep API calls, authorization, business status mappings, and navigation in the app. MainCard, location/verification workflows, and order-specific skeleton compositions remain local; see AUDIT.md.

## Local installation and deployment

This source package is consumed using file:../mpeep-ui. Keep the package beside each app when installing or building, including CI. Run pnpm install in mpeep-ui for its own development tools, and in each app to install its dependency. Next transpiles the package; each app's Tailwind stylesheet explicitly scans its installed source.

After changing package source, run pnpm install in each consumer to refresh its local file dependency before validation. Commit the package source and lockfile together with the consumer changes. The parent directory is not a Git repository; include mpeep-ui in your repository/CI checkout arrangement before deployment. No publishing or repository creation is performed by this migration.

## Shared contracts

- Button retains default, outline, ghost, destructive variants and default/sm/lg/icon sizes. Set type explicitly for actions inside forms.
- Core components preserve React props, refs, className overrides, and Radix behavior.
- DatePicker uses ISO date strings. Calendar date restrictions remain caller-controlled.
- FilterBar composes a controlled search input, filter children, reset callback and action slot.
- DataTable accepts typed columns, rows and rowKey. Loading takes precedence over empty content. Clickable rows support Enter/Space; interactive child controls retain their own keyboard behavior. Sorting and pagination state belong to the caller.
- StatusBadge takes an explicit semantic tone: neutral, success, warning, error or info. Always provide readable status text. Business-to-tone mappings stay in the app.
- EmptyState accepts title, description and action. LoadingState announces its label. Generic skeletons support table-shaped loading.
- Web is the typography reference: Tailwind's default sans font family, 14px standard control text, 36px standard control height. Shared base rules stay in the base cascade layer so component variants and focus/invalid states work in every app.
- Colors, radii and theme mappings live in src/styles.css. Apps must not override shared theme values inline or add unlayered global control styles. Existing page-level layout overrides may still vary by audience.

## Validation

Run pnpm dev in mpeep-ui and open http://localhost:3005/ui-preview. The catalog lives only in this package; Website, Seller, and Manager do not expose preview routes. The standalone host is a development/documentation tool, not part of the consuming app bundles.

Each implemented catalog entry has copyable usage code and an accepted-props reference, including inherited React/Radix props. Required fields, types, and locally declared defaults come from the source. Run pnpm docs:generate after API changes (dev and build do this automatically). Examples live in ui-preview/examples.ts; tests compile them against the real component APIs. Unimplemented catalog entries do not claim an API or offer misleading code.

Run pnpm typecheck, pnpm test, and pnpm build here, then pnpm lint and pnpm build in each changed app. Check the catalog at desktop and 768px, including keyboard focus and overlays.

tests/browser-check.mjs checks the standalone catalog at 1440px and 768px and verifies the three former app preview routes return 404. Run it with Node and a locally available Playwright installation (set PLAYWRIGHT_MODULE to its module path when necessary), with all four development servers running. It checks menu groups, copy code, props search, pagination, dialogs, placeholders, and page overflow. Screenshots default to /tmp/mpeep-ui-check.
