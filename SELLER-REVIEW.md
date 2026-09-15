# Seller website review

Scope: Seller portal, following the shared header and logout update. This is not a review of mpeep-web. Screenshots were captured and displayed inline in the task.

## Findings

1. Payments navigation leads to a 404 page. Verified by following the visible Payments link from the dashboard. Hide or disable the destination until implemented, or add the intended Payments page.
2. The approved dashboard remains a placeholder. Its welcome panel says product, inventory, and order tools will live here even though those tools already exist. The main action sends users back to the public Seller home rather than into an operational workflow. Replace this with current metrics and links to products, orders, and inventory.

## Reviewed steps

1. Products and shared header: healthy layout at desktop and 768px. Logout is visible, the header has a computed 0px bottom border, and the page has no document-level horizontal overflow. The dense table uses its own horizontal scroll area at tablet width.
2. Dashboard: shared header and navigation render correctly, but the main content remains incomplete as described above.
3. Payments: broken destination, returning a 404 and losing the workspace navigation.

## Logout implementation and limits

The shared header accepts logoutHref and renders a Log out action. Seller supplies its existing logoutUrl(), which points to the central authentication service with a returnTo destination for Seller. The public Seller header shows the action only when an account is present. The workspace header also shows it.

The rendered destination was inspected without activating logout, preserving the user's live session. Actual cookie invalidation and cross-application sign-out were not tested. This was a focused visual/navigation review, not a full accessibility or security audit; no purchases, uploads, account changes, or submissions were performed.
