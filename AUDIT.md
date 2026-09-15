# UI audit

Scope: web, seller, management. Includes existing uncommitted changes.

| App | Component | Original SHA256 prefix | Decision |
| --- | --- | --- | --- |
| mpeep-web | avatar.tsx | cef1c929998a | Shared from mpeep-seller |
| mpeep-web | button.tsx | 37dcbd19854e | Shared from mpeep-management |
| mpeep-web | calendar.tsx | 2b005a53fe67 | Shared from mpeep-web |
| mpeep-web | card.tsx | 576609033f9f | Shared from mpeep-web |
| mpeep-web | date-picker.tsx | a42961582afa | Shared from mpeep-web |
| mpeep-web | field.tsx | 3e454662784b | Shared from mpeep-web |
| mpeep-web | input-otp.tsx | 3d3f4d656daf | Shared from mpeep-web |
| mpeep-web | input.tsx | 9c0820227f1d | Shared from mpeep-seller |
| mpeep-web | label.tsx | 68ca39837a90 | Shared from mpeep-seller |
| mpeep-web | location-picker.tsx | a119b93c2448 | Keep app-specific |
| mpeep-web | phone-verification.tsx | 343a45507f72 | Keep app-specific |
| mpeep-web | popover.tsx | f772cf4d327d | Shared from mpeep-web |
| mpeep-web | select.tsx | 7af15016a8de | Shared from mpeep-seller |
| mpeep-web | sub-banner.tsx | 288b67237936 | Keep app-specific |
| mpeep-web | textarea.tsx | f564539bcfc3 | Shared from mpeep-seller |
| mpeep-web | time-picker.tsx | 186e8bf08d1a | Shared from mpeep-web |
| mpeep-seller | avatar.tsx | cef1c929998a | Shared from mpeep-seller |
| mpeep-seller | badge.tsx | a5927e8859d3 | Shared from mpeep-seller |
| mpeep-seller | button.tsx | 37dcbd19854e | Shared from mpeep-management |
| mpeep-seller | card.tsx | 3c09215e9a83 | Shared from mpeep-web |
| mpeep-seller | checkbox.tsx | 9b2fb9c2278f | Shared from mpeep-seller |
| mpeep-seller | data-table.tsx | 919b9c5ec3be | Shared from mpeep-seller |
| mpeep-seller | dialog.tsx | 684481ed6540 | Shared from mpeep-seller |
| mpeep-seller | dismissible-banner.tsx | a3b0a9ed7299 | Shared from mpeep-seller |
| mpeep-seller | dropdown-menu.tsx | 384ba805e87e | Shared from mpeep-seller |
| mpeep-seller | field.tsx | e64a3ea0355c | Shared from mpeep-web |
| mpeep-seller | input.tsx | 9c0820227f1d | Shared from mpeep-seller |
| mpeep-seller | label.tsx | b0984a796a31 | Shared from mpeep-seller |
| mpeep-seller | main-card.tsx | afe8047ce542 | Keep app-specific |
| mpeep-seller | page-header.tsx | 8158d44602e9 | Shared from mpeep-seller |
| mpeep-seller | pagination-primitives.tsx | 1a425548fdf0 | Shared from mpeep-seller |
| mpeep-seller | pagination.tsx | 99dbbe6a8ea6 | Shared from mpeep-seller |
| mpeep-seller | search-input.tsx | ddd01f9cace0 | Shared from mpeep-seller |
| mpeep-seller | select.tsx | 653991ec2979 | Shared from mpeep-seller |
| mpeep-seller | separator.tsx | cd73cf5ab677 | Shared from mpeep-seller |
| mpeep-seller | sheet.tsx | 7607d318f411 | Shared from mpeep-seller |
| mpeep-seller | skeleton/data-table-skeleton.tsx | b4706b733151 | Shared from mpeep-seller |
| mpeep-seller | skeleton/order-detail-skeleton.tsx | b54d782053d3 | Keep app-specific |
| mpeep-seller | skeleton/orders-table-skeleton.tsx | bb8183e8c563 | Keep app-specific |
| mpeep-seller | skeleton/skeleton.tsx | 4c340675fe93 | Shared from mpeep-seller |
| mpeep-seller | slider.tsx | a35e4ba51419 | Shared from mpeep-seller |
| mpeep-seller | table.tsx | 9ca3084e7626 | Shared from mpeep-seller |
| mpeep-seller | textarea.tsx | f564539bcfc3 | Shared from mpeep-seller |
| mpeep-management | avatar.tsx | cef1c929998a | Shared from mpeep-seller |
| mpeep-management | badge.tsx | a5927e8859d3 | Shared from mpeep-seller |
| mpeep-management | button.tsx | caf0d2453162 | Shared from mpeep-management |
| mpeep-management | card.tsx | 3c09215e9a83 | Shared from mpeep-web |
| mpeep-management | checkbox.tsx | 9a109df2d24f | Shared from mpeep-seller |
| mpeep-management | dialog.tsx | 684481ed6540 | Shared from mpeep-seller |
| mpeep-management | dropdown-menu.tsx | bee4cd08d546 | Shared from mpeep-seller |
| mpeep-management | input.tsx | 6b3ddc1f6de6 | Shared from mpeep-seller |
| mpeep-management | label.tsx | 5b60323b1423 | Shared from mpeep-seller |
| mpeep-management | main-card.tsx | 9cd2b3238241 | Keep app-specific |
| mpeep-management | select.tsx | 03827e4b5e7b | Shared from mpeep-seller |
| mpeep-management | separator.tsx | cd73cf5ab677 | Shared from mpeep-seller |
| mpeep-management | sheet.tsx | 7607d318f411 | Shared from mpeep-seller |
| mpeep-management | table.tsx | 0eefba1daf10 | Shared from mpeep-seller |
| mpeep-management | textarea.tsx | f564539bcfc3 | Shared from mpeep-seller |

Button retains management destructive variant. Select retains seller truncation and focus ring. Card uses web surface tokens with compact corners and no shadow. Field includes FormField alias. MainCard retains differing app layout contracts; location, verification, navigation and order skeleton compositions stay app-owned. Forwarding modules retain imports without duplicated implementation.

## Universal styling

Web's default sans typography is the reference for all three applications. Shared base styles, theme colors and corner radii live in mpeep-ui/src/styles.css. Removed seller/management unlayered font and border overrides, and web inline theme overrides, so component classes win consistently. The web header uses tighter tablet spacing to fit the shared typography at 768px.

## Verification coverage

The standalone mpeep-ui /ui-preview catalog exercises buttons, input, select, date picker, card, dialog, sheet, table, filter/search, loading, empty, and semantic status states. It includes copyable usage examples and source-generated accepted props. Preview routes have been removed from the three consuming applications. Browser checks cover the standalone catalog at 1440px and 768px. Application business workflows and existing page-level overrides are not an exhaustive part of this component migration.
