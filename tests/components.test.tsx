import React from "react";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "../src/button";
import { DataTable } from "../src/data-table";
import { StatusBadge } from "../src/status-badge";
import { FilterBar } from "../src/filter-bar";
import { Field, FormField } from "../src/field";
import { SidebarItem } from "../src/sidebar";
import { MetricCard } from "../src/metric-card";
import { Stepper } from "../src/stepper";
import { MultiSelect } from "../src/multi-select";
import { MpeepLogo } from "../src/logo";
import { Header, WorkspaceHeader, LogoutButton } from "../src/header";
import { PublicHeader } from "../src/public-header";
import { BarChart } from "../src/bar-chart";
import { Select, SelectTrigger, SelectValue } from "../src/select";
import { ImageUploader } from "../src/image-uploader";

test("existing images count toward the uploader limit and remain removable", () => {
  const existing = Array.from({ length: 4 }, (_, index) => ({ id: String(index), url: `/product-${index}.png`, isPrimary: index === 0 }));
  const html = renderToStaticMarkup(<ImageUploader images={[]} existingImages={existing} onChange={() => {}} onError={() => {}} onExistingImagesChange={() => {}} />);
  assert.match(html, /4 \/ 4/);
  assert.match(html, /Remove existing image 4/);
  assert.doesNotMatch(html, /Add image/);
  assert.equal((html.match(/>Primary</g) ?? []).length, 1);
  const readOnly = renderToStaticMarkup(<ImageUploader images={[]} existingImages={existing} onChange={() => {}} onError={() => {}} />);
  assert.doesNotMatch(readOnly, /Remove existing image/);
});

test("editing can revisit future steps while creation remains sequential", () => {
  const props = { steps: ["Details", "Categories", "Variants"], value: 0, onChange: () => {} };
  const creating = renderToStaticMarkup(<Stepper {...props} />);
  const editing = renderToStaticMarkup(<Stepper {...props} allowFutureSteps />);
  assert.match(creating, /disabled=""/);
  assert.doesNotMatch(editing, /disabled=""/);
  assert.match(editing, /aria-current="step"/);
});

test("stepper connects adjacent markers and supports icons and custom radii", () => {
  const html = renderToStaticMarkup(<Stepper steps={[{ label: "Shop", icon: <svg data-testid="shop-icon" /> }, "Location", "Review"]} value={1} onChange={() => {}} borderRadius="50%" />);
  assert.equal((html.match(/data-slot="stepper-connector"/g) ?? []).length, 2);
  assert.match(html, /data-testid="shop-icon"/);
  assert.match(html, /aria-label="1. Shop"/);
  assert.equal((html.match(/border-radius:50%/g) ?? []).length, 3);
  const single = renderToStaticMarkup(<Stepper steps={["Shop"]} value={0} onChange={() => {}} borderRadius={4} />);
  assert.doesNotMatch(single, /stepper-connector/);
  assert.match(single, /border-radius:4px/);
});

test("analytics metrics show signed comparisons without inventing zero baselines", () => {
  const negative = renderToStaticMarkup(<MetricCard variant="analytics" heading={0} subheading="Applications" change={-100} />);
  assert.match(negative, /100 percent decrease/);
  assert.match(negative, /text-rose-700/);
  const noBaseline = renderToStaticMarkup(<MetricCard variant="analytics" heading={4} subheading="Orders" change={null} description="No previous-period baseline" />);
  assert.doesNotMatch(noBaseline, /percent increase/);
  assert.match(noBaseline, /No previous-period baseline/);
});

test("analytics chart has accessible day labels and finite, zero-based bar heights", () => {
  const html = renderToStaticMarkup(<BarChart variant="analytics" label="Orders" data={[{label:"Mon",value:0,formattedValue:"0"},{label:"Tue",value:7,formattedValue:"7"}]} />);
  assert.match(html, /data-variant="analytics"/);
  assert.match(html, /aria-label="Tue: 7"/);
  assert.match(html, /height:87.5%/);
  assert.match(html, /height:0%/);
  assert.doesNotMatch(html, /NaN/);
});

test("metric tones fill the card and preserve readable text", () => {
  const html = renderToStaticMarkup(<MetricCard tone="green" heading={24} subheading="Orders" description="Current period" />);
  assert.match(html, /bg-emerald-800 text-white/);
  assert.doesNotMatch(html, /text-muted-foreground/);
});

test("soft metric cards use borderless tinted surfaces", () => {
  const html = renderToStaticMarkup(<MetricCard variant="soft" tone="amber" heading={24} subheading="Orders" />);
  assert.match(html, /bg-amber-50/);
  assert.doesNotMatch(html, /\bborder\b/);
});

test("table skeleton uses the same columns and density without stale cells", () => {
  const html = renderToStaticMarkup(<DataTable variant="catalog" loading loadingVariant="skeleton" loadingLabel="Loading catalogue" columns={[{key:"name",header:"Product",cell: row => row.name,cellClassName:"min-w-72"}]} rows={[{name:"Stale product"}]} rowKey={row => row.name} />);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /Loading catalogue/);
  assert.match(html, /min-w-72/);
  assert.match(html, /py-5/);
  assert.doesNotMatch(html, /Stale product/);
});

test("select loading is contained inside the disabled trigger", () => {
  const html = renderToStaticMarkup(<Select value="7d"><SelectTrigger loading><SelectValue placeholder="Last 7 days" /></SelectTrigger></Select>);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled/);
  assert.match(html, /animate-spin/);
});

test("bar chart preserves labels and handles empty values", () => {
  const html = renderToStaticMarkup(<BarChart label="Sales" data={[{label:"Mon",value:120,formattedValue:"120",detail:"2 orders"}]} />);
  assert.match(html, /2 orders/);
  assert.match(html, /height:152px/);
  const empty = renderToStaticMarkup(<BarChart label="Sales" data={[]} />);
  assert.match(empty, /No data for this period/);
});

test("button retains destructive styling, disabled and explicit form semantics", () => {
  const html = renderToStaticMarkup(<Button variant="destructive" type="submit" disabled>Delete</Button>);
  assert.match(html, /bg-destructive/);
  assert.match(html, /type="submit"/);
  assert.match(html, /disabled/);
});

test("loading buttons retain labels and block repeat submission", () => {
  const html = renderToStaticMarkup(<Button type="submit" loading>Saving changes</Button>);
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /animate-spin/);
  assert.match(html, /Saving changes/);
});

test("loading works with slotted links and icon-only accessible labels", () => {
  const link = renderToStaticMarkup(<Button asChild loading><a href="/orders">Orders</a></Button>);
  assert.match(link, /^<a /);
  assert.match(link, /aria-disabled="true"/);
  assert.match(link, /Orders/);
  const icon = renderToStaticMarkup(<Button size="icon" loading aria-label="Saving" />);
  assert.match(icon, /aria-label="Saving"/);
  assert.match(icon, /aria-hidden="true"/);
});

test("table loading takes precedence over stale rows and empty messages", () => {
  const html = renderToStaticMarkup(<DataTable columns={[{ key: "name", header: "Name", cell: (row: { id: string }) => row.id }]} rows={[{ id: "stale-item" }]} rowKey={row => row.id} loading loadingLabel="Loading inventory" />);
  assert.match(html, /role="status"/);
  assert.match(html, /Loading inventory/);
  assert.doesNotMatch(html, /stale-item|No results found/);
});

test("empty tables preserve custom content and valid column span", () => {
  const html = renderToStaticMarkup(<DataTable columns={[]} rows={[]} rowKey={() => ""} emptyMessage="No orders yet" />);
  assert.match(html, /colSpan="1"|colspan="1"/);
  assert.match(html, /No orders yet/);
});

test("status has visible text independent of color", () => {
  const html = renderToStaticMarkup(<StatusBadge tone="error">Rejected</StatusBadge>);
  assert.match(html, /data-tone="error"/);
  assert.match(html, /Rejected/);
  assert.match(html, /aria-hidden="true"/);
});

test("filter search has an accessible name and optional reset", () => {
  const html = renderToStaticMarkup(<FilterBar search={{ value: "", onChange: () => {}, placeholder: "Search orders" }} onReset={() => {}} />);
  assert.match(html, /aria-label="Search orders"/);
  assert.match(html, /Clear filters/);
});

test("seller field alias is the shared web field", () => assert.equal(FormField, Field));

test("catalog and compact tables expose their density without changing rows", () => {
  for (const variant of ["catalog", "compact"] as const) {
    const html = renderToStaticMarkup(<DataTable variant={variant} rows={[{id:"one"}]} rowKey={row => row.id} columns={[{key:"id", header:"ID", cell:row => row.id}]} />);
    assert.match(html, new RegExp(`data-variant="${variant}"`));
    assert.match(html, /one/);
    assert.match(html, variant === "catalog" ? /py-5/ : /py-2/);
  }
});

test("sidebar preserves active links and makes locked items non-navigable", () => {
  const active = renderToStaticMarkup(<SidebarItem href="/orders" active>Orders</SidebarItem>);
  assert.match(active, /aria-current="page"/);
  const locked = renderToStaticMarkup(<SidebarItem href="/orders" disabled>Orders</SidebarItem>);
  assert.match(locked, /aria-disabled="true"/);
  assert.doesNotMatch(locked, /href=/);
});

test("sidebar icon and label props compose with slotted links", () => {
  const html = renderToStaticMarkup(<SidebarItem asChild label="Orders" icon={<svg data-testid="menu-icon" />} active><a href="/orders" /></SidebarItem>);
  assert.match(html, /href="\/orders"/);
  assert.match(html, /menu-icon/);
  assert.match(html, /Orders/);
  assert.match(html, /aria-current="page"/);
  const locked = renderToStaticMarkup(<SidebarItem asChild disabled label="Orders" icon={<svg />}><a href="/orders" /></SidebarItem>);
  assert.doesNotMatch(locked, /href=/);
});

test("shared SVG logo remains named when the wordmark is hidden", () => {
  const html = renderToStaticMarkup(<MpeepLogo showWordmark={false} />);
  assert.match(html, /aria-label="MPEEP"/);
  assert.match(html, /viewBox="0 0 245 246"/);
});

test("shared headers preserve content and navigation without a bottom border", () => {
  const header = renderToStaticMarkup(<Header brand="Mpeep" actions={<button>Account</button>} />);
  assert.match(header, /Mpeep/);
  assert.match(header, /Account/);
  const workspace = renderToStaticMarkup(<WorkspaceHeader workspace="Seller" title="Products" status="Approved seller" onOpenNavigation={() => {}} />);
  assert.match(workspace, /Open Seller navigation/);
  assert.match(workspace, /Products/);
  assert.match(workspace, /Approved seller/);
  assert.doesNotMatch(header + workspace, /border-b/);
});

test("workspace header places logout inside the profile dropdown", () => {
  const html = renderToStaticMarkup(<WorkspaceHeader workspace="Seller" title="Dashboard" profileName="Seller account" logoutHref="/logout" onOpenNavigation={() => {}} />);
  assert.match(html, /Open profile menu/);
  assert.doesNotMatch(html, /href="\/logout"/);
});

test("logout uses the app-provided destination", () => {
  const html = renderToStaticMarkup(<LogoutButton href="https://auth.example.test/logout?returnTo=seller" />);
  assert.match(html, /href="https:\/\/auth.example.test\/logout\?returnTo=seller"/);
  assert.match(html, /Log out/);
});

test("public header composes brand and actions without a border", () => {
  const html = renderToStaticMarkup(<PublicHeader brand="Mpeep" actions={<a href="/signin">Log in</a>} />);
  assert.match(html, /data-slot="public-header"/);
  assert.match(html, /Mpeep/);
  assert.match(html, /href="\/signin"/);
  assert.doesNotMatch(html, /border-b/);
});

test("collapsed sidebar items keep accessible names without native title tooltips", () => {
  const html = renderToStaticMarkup(<SidebarItem href="/orders" label="Orders" collapsed icon={<svg />} />);
  assert.match(html, /sr-only/);
  assert.match(html, /Orders/);
  assert.doesNotMatch(html, /title="Orders"/);
  const locked = renderToStaticMarkup(<SidebarItem disabled collapsed label="Payments" />);
  assert.match(locked, /tabindex="0"|tabIndex="0"/);
  assert.match(locked, /aria-disabled="true"/);
});

test("shared seller patterns retain labels and disabled states", () => {
  assert.match(renderToStaticMarkup(<MetricCard heading={12} subheading="Orders" />), /Orders/);
  const steps = renderToStaticMarkup(<Stepper steps={["Details", "Variants"]} value={0} onChange={() => {}} />);
  assert.match(steps, /aria-current="step"/);
  assert.match(steps, /disabled=""/);
  const multi = renderToStaticMarkup(<MultiSelect label="Categories" placeholder="Choose" options={[{value:"steel",label:"Steel"}]} value={["steel"]} onChange={() => {}} disabled />);
  assert.match(multi, /Remove Steel/);
  assert.match(multi, /disabled=""/);
});
