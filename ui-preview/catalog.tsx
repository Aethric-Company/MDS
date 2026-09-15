"use client";

import { MpeepLogo } from "../src/logo";
import { Header, WorkspaceHeader } from "../src/header";
import { PublicHeader } from "../src/public-header";
import { ProfileMenu } from "../src/profile-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../src/tooltip";
import { Sidebar, SidebarItem } from "../src/sidebar";
import { MetricCard } from "../src/metric-card";
import { BarChart } from "../src/bar-chart";
import { Stepper } from "../src/stepper";
import { MultiSelect } from "../src/multi-select";
import { ImageUploader } from "../src/image-uploader";
import { RichTextEditor } from "../src/rich-text-editor";
import { useState } from "react";
import { Wrench, MapPin, UserRound, ShoppingCart, CalendarDays, CircleCheck, Plus, ChevronRight, Layers } from "lucide-react";
import { Button } from "../src/button";
import { Input } from "../src/input";
import { Label } from "../src/label";
import { Textarea } from "../src/textarea";
import { Checkbox } from "../src/checkbox";
import { DatePicker } from "../src/date-picker";
import { Card, CardContent, CardHeader } from "../src/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../src/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../src/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../src/sheet";
import { PageHeader } from "../src/page-header";
import { FilterBar } from "../src/filter-bar";
import { DataTable } from "../src/data-table";
import { StatusBadge } from "../src/status-badge";
import { Badge } from "../src/badge";
import { Pagination } from "../src/pagination";
import { Avatar, AvatarFallback } from "../src/avatar";
import { EmptyState } from "../src/empty-state";
import { LoadingState } from "../src/loading-state";
import { Skeleton } from "../src/skeleton/skeleton";
import { DismissibleBanner } from "../src/dismissible-banner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../src/dropdown-menu";
import { cn } from "../src/utils";
import { ComponentDocs } from "./component-docs";
import { Calendar } from "../src/calendar";
import { TimePicker } from "../src/time-picker";
import { InputOtp } from "../src/input-otp";
import { Slider } from "../src/slider";
import { Field, FieldLabel } from "../src/field";
import { Separator } from "../src/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../src/popover";

export const componentGroups = [
  { title: "Foundations", items: ["Logo", "Colors", "Typography", "Spacing", "Radius", "Shadows", "Icons", "Grid/layout"] },
  { title: "Core Components", items: ["Button", "Input field", "Search bar", "Dropdown/select", "Checkbox", "Radio", "Toggle switch", "Date picker", "Calendar", "Time picker", "OTP input", "Slider", "Form field", "File/image uploader", "Multi-select", "Rich text editor", "Textarea", "Form validation message"] },
  { title: "Navigation", items: ["Header/navbar", "Public header", "Sidebar", "Bottom mobile navigation", "Breadcrumb", "Tabs", "Stepper", "PageHeader", "Pagination", "Menu dropdown", "User profile menu"] },
  { title: "Cards", items: ["Card", "Service card", "Professional/seller card", "Product card", "Order card", "Booking card", "Review card", "Address card", "Dashboard metric card", "Notification card"] },
  { title: "Data Display", items: ["Bar chart", "Table", "List item", "Separator", "Badge", "Status badge", "Tag/chip", "Avatar", "Rating stars", "Timeline/activity log", "Empty state", "Loading skeleton"] },
  { title: "Feedback", items: ["Toast notification", "Alert banner", "Modal/dialog", "Confirmation dialog", "Popover", "Sheet", "Tooltip", "Progress bar", "Spinner", "Error page", "Success state"] },
  { title: "Mpeep Business Components", items: ["Professional profile summary", "Seller listing card", "Service category tile", "Product price comparison row", "Location availability selector", "Booking request form", "Order tracking status", "Quote/estimate card", "Portfolio/gallery block", "Verification badge", "Offer/discount badge", "Service package card", "Lead/customer inquiry card"] },
  { title: "Page Templates", items: ["Website home page", "Category listing page", "Professional profile page", "Product detail page", "Checkout/booking page", "Seller dashboard", "Manager dashboard", "Orders page", "Leads page", "Settings page", "Login/signup page"] },
];

const liveItems = new Set(["Bar chart", "User profile menu", "Public header", "Header/navbar", "Tooltip", "Logo", "Sidebar", "Stepper", "Dashboard metric card", "File/image uploader", "Multi-select", "Rich text editor", "Colors", "Typography", "Spacing", "Radius", "Shadows", "Icons", "Grid/layout", "Button", "Input field", "Search bar", "Dropdown/select", "Checkbox", "Date picker", "Textarea", "PageHeader", "Pagination", "Menu dropdown", "Card", "Table", "Badge", "Status badge", "Avatar", "Empty state", "Loading skeleton", "Alert banner", "Modal/dialog", "Sheet", "Spinner", "Calendar", "Time picker", "OTP input", "Slider", "Form field", "Separator", "Popover"]);
const sampleRows = Array.from({ length: 24 }, (_, index) => ({ id: String(index + 1), name: `Material ${String(index + 1).padStart(2, "0")}`, quantity: (index + 1) * 10 }));
const colors = [
  ["Primary", "var(--primary)", "#ffb224"], ["Secondary", "var(--secondary)", "#f5f5f5"],
  ["Success", "var(--color-emerald-700)", "emerald-700"], ["Warning", "var(--color-amber-700)", "amber-700"],
  ["Danger", "var(--destructive)", "#e7000b"], ["Neutral", "var(--muted-foreground)", "#737373"],
] as const;

export function UiPreview() {
  const [selected, setSelected] = useState("Colors");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string[]>(["Foundations"]);
  const group = componentGroups.find(group => group.items.includes(selected))!;
  const live = liveItems.has(selected);
  const filtered = componentGroups.map(group => ({ ...group, items: group.items.filter(item => (group.title + " " + item).toLowerCase().includes(search.toLowerCase())) })).filter(group => group.items.length);
  return (
    <div className="flex min-h-[640px] flex-col bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
        <div className="flex items-center gap-3"><Layers aria-hidden="true" className="size-5 text-primary" /><h1 className="text-lg font-semibold">Mpeep UI</h1></div>
        <span className="text-xs text-muted-foreground">Website · Seller · Manager</span>
      </header>
      <div className="grid min-h-[600px] grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-r">
          <div className="p-4"><Input aria-label="Search components" placeholder="Search components" value={search} onChange={event => setSearch(event.target.value)} /></div>
          <nav aria-label="Component menu" className="max-h-[calc(100dvh-180px)] overflow-y-auto px-2 pb-6">
            {filtered.map((item) => {
              const open = Boolean(search) || expanded.includes(item.title);
              const id = "group-" + componentGroups.findIndex(group => group.title === item.title);
              return <div key={item.title} className="mb-1">
                <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setExpanded(current => current.includes(item.title) ? current.filter(title => title !== item.title) : [...current, item.title])} className="flex w-full items-start gap-2 rounded-sm px-3 py-3 text-left text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                  <ChevronRight aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0 transition-transform", open && "rotate-90")} /><span className="min-w-0 break-words">{item.title}</span>
                </button>
                <div id={id} hidden={!open}>{item.items.map(name => <button type="button" key={name} aria-current={selected === name ? "page" : undefined} onClick={() => setSelected(name)} className={cn("flex w-full items-center gap-2 rounded-sm py-2 pl-9 pr-3 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", selected === name ? "bg-primary/15 font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><span className="min-w-0 flex-1 break-words">{name}</span>{liveItems.has(name) && <span title="Live example" className="size-1.5 shrink-0 rounded-full bg-emerald-700" />}</button>)}</div>
              </div>;
            })}
            {!filtered.length && <p className="px-3 py-4 text-sm text-muted-foreground">No matching components</p>}
          </nav>
        </aside>
        <main className="min-w-0 px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div><p className="mb-2 text-xs text-muted-foreground">{group.title}</p><h2 className="break-words text-2xl font-semibold">{selected}</h2></div>
            <Badge variant={live ? "secondary" : "outline"}>{live ? "Live example" : group.title === "Page Templates" || group.title === "Mpeep Business Components" ? "App-specific" : "Not yet shared"}</Badge>
          </div>
          <div key={selected} className="min-w-0 space-y-8">
            {live ? <ComponentDemo name={selected} /> : <EmptyState title={group.title === "Page Templates" ? "Template preview not yet added" : "Shared preview not yet added"} description={group.title === "Mpeep Business Components" ? "Business rules and data remain in the owning app. This catalog entry reserves its place in the Mpeep library." : "This item is included in the component menu. It is not yet implemented as a shared example."} />}
          <ComponentDocs name={selected} live={live} />
          </div>
        </main>
      </div>
    </div>
  );
}

function ComponentDemo({ name }: { name: string }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("ready");
  const [page, setPage] = useState(1);
  const [banner, setBanner] = useState(true);
  const [day, setDay] = useState<Date>();
  const [density, setDensity] = useState<"default" | "compact" | "catalog">("default");
  const [amount, setAmount] = useState([25]);
  const [selected, setSelected] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  if (name === "Logo") return <div className="flex items-center gap-8"><MpeepLogo /><MpeepLogo showWordmark={false} /></div>;
  if (name === "User profile menu") return <ProfileMenu name="Anjali Sharma" logoutHref="#logout" />;
  if (name === "Public header") return <PublicHeader brand={<MpeepLogo />} actions={<><Button type="button" variant="ghost">Log in</Button><Button type="button">Register</Button></>} />;
  if (name === "Header/navbar") return <div className="space-y-6"><Header brand={<MpeepLogo />} actions={<Button type="button">Dashboard</Button>} /><WorkspaceHeader logoutHref="#logout" workspace="Seller" title="Products" status={<StatusBadge tone="success">Approved seller</StatusBadge>} onOpenNavigation={() => setText("Navigation selected")} /><p role="status" className="text-sm">{text}</p></div>;
  if (name === "Tooltip") return <TooltipProvider><Tooltip><TooltipTrigger asChild><Button type="button" size="icon" variant="outline" aria-label="Add item"><Plus className="size-4" /></Button></TooltipTrigger><TooltipContent>Add item</TooltipContent></Tooltip></TooltipProvider>;
  if (name === "Sidebar") return <div className="space-y-4"><Button type="button" variant="outline" onClick={() => setNavOpen(true)}>Open navigation drawer</Button><Sidebar inline brand={<MpeepLogo showWordmark={!collapsed} />} label="Preview navigation" open={navOpen} onOpenChange={setNavOpen} collapsed={collapsed} onToggleCollapsed={() => setCollapsed(!collapsed)}>{([["Dashboard", Layers], ["Orders", ShoppingCart], ["Products", Wrench], ["Inventory", CircleCheck], ["Bookings", CalendarDays], ["Customers", UserRound], ["Locations", MapPin]] as const).map(([menuLabel, MenuIcon]) => { return <SidebarItem key={menuLabel} label={menuLabel} href={"#" + menuLabel.toLowerCase()} icon={<MenuIcon aria-hidden="true" className="size-4 shrink-0" />} collapsed={collapsed} active={(text || "Dashboard") === menuLabel} onClick={event => {event.preventDefault(); setText(menuLabel); setNavOpen(false);}} title={menuLabel}>{menuLabel}</SidebarItem>; })}<SidebarItem disabled collapsed={collapsed} icon={<ShoppingCart aria-hidden="true" className="size-4 shrink-0" />} title="Payments unavailable">Payments</SidebarItem></Sidebar></div>;
if (name === "Dashboard metric card") return <div className="grid gap-3 md:grid-cols-2"><MetricCard variant="analytics" heading={128} subheading="New users" change={28} description="vs 100 in previous period" /><MetricCard variant="analytics" heading={8} subheading="Seller applications" change={-20} description="vs 10 in previous period" />{(["amber", "green", "blue", "rose"] as const).map(tone => <MetricCard variant="soft" key={tone} tone={tone} heading={24} subheading="Products" description="Published catalogue items" />)}</div>;
  if (name === "Bar chart") return <BarChart variant="analytics" label="Daily paid orders" data={[{label:"Mon",value:4,formattedValue:"4",detail:"orders"},{label:"Tue",value:5,formattedValue:"5",detail:"orders"},{label:"Wed",value:7,formattedValue:"7",detail:"orders"}]} />;
  if (name === "Stepper") return <div className="grid gap-10"><Stepper label="Numbered steps" steps={["Details", "Categories", "Variants"]} value={page - 1} onChange={index => setPage(index + 1)} allowFutureSteps /><Stepper label="Icon steps" steps={[{ label: "Details", icon: <UserRound /> }, { label: "Categories", icon: <Layers /> }, { label: "Variants", icon: <ShoppingCart /> }]} value={page - 1} onChange={index => setPage(index + 1)} borderRadius="50%" allowFutureSteps /></div>;
  if (name === "Multi-select") return <div className="max-w-sm"><MultiSelect label="Categories" options={[{value:"cement",label:"Cement"},{value:"steel",label:"Steel"}]} placeholder="Select categories" value={selected} onChange={setSelected} /></div>;
  if (name === "File/image uploader") return <><ImageUploader images={images} onChange={setImages} onError={setText} /><p role="alert" className="text-sm text-destructive">{text}</p></>;
  if (name === "Rich text editor") return <RichTextEditor value={text} onChange={setText} />;
  if (name === "Calendar") return <Calendar mode="single" selected={day} onSelect={setDay} />;
  if (name === "Time picker") return <div className="max-w-sm"><Label htmlFor="demo-time">Time</Label><TimePicker id="demo-time" value={text} onChange={setText} /></div>;
  if (name === "OTP input") return <InputOtp value={text} onChange={setText} />;
  if (name === "Slider") return <div className="max-w-sm space-y-4"><Slider aria-label="Quantity" value={amount} onValueChange={setAmount} min={0} max={100} /><p className="text-sm">{amount[0]}</p></div>;
  if (name === "Form field") return <Field className="max-w-sm"><FieldLabel htmlFor="demo-field">Material</FieldLabel><Input id="demo-field" placeholder="Material name" /></Field>;
  if (name === "Separator") return <div className="space-y-4"><p>Order details</p><Separator /><p>Delivery details</p></div>;
  if (name === "Popover") return <Popover><PopoverTrigger asChild><Button type="button" variant="outline">Open popover</Button></PopoverTrigger><PopoverContent>Additional material details</PopoverContent></Popover>;
  if (name === "Colors") return <div className="grid grid-cols-2 gap-6 xl:grid-cols-3">{colors.map(([label, color, code]) => <div key={label}><div className="mb-3 h-24 rounded-md border" style={{ backgroundColor: color }} /><p className="text-sm font-medium">{label}</p><p className="mt-1 text-xs text-muted-foreground">{code}</p></div>)}</div>;
  if (name === "Typography") return <div className="space-y-6"><h3 className="text-3xl font-semibold">Build with Mpeep</h3><h4 className="text-xl font-semibold">Materials and professionals</h4><p className="text-base">Find the right materials for your next project.</p><p className="text-sm">Order details and delivery information.</p><Label>Field label</Label><p className="text-xs text-muted-foreground">Caption · Updated today</p></div>;
  if (name === "Spacing") return <div className="space-y-4">{[4,8,12,16,24,32,48].map(size => <div key={size} className="flex items-center gap-6"><span className="w-12 text-sm">{size}px</span><div className="h-6 bg-primary" style={{ width: size }} /></div>)}</div>;
  if (name === "Radius") return <div className="flex flex-wrap items-center gap-6"><Button type="button">Button · 4px</Button><Input aria-label="Input radius" placeholder="Input · 4px" className="max-w-48" /><Card className="w-48"><CardContent>Card · 8px</CardContent></Card></div>;
  if (name === "Shadows") return <div className="grid gap-6 lg:grid-cols-3">{[["Small", "shadow-sm"], ["Medium", "shadow-md"], ["Modal", "shadow-lg"]].map(([label, style]) => <div key={label} className={cn("rounded-md border bg-background p-6 text-sm", style)}>{label}</div>)}</div>;
  if (name === "Icons") return <div className="grid grid-cols-3 gap-8">{[[Wrench,"Service"],[MapPin,"Location"],[UserRound,"User"],[ShoppingCart,"Cart"],[CalendarDays,"Booking"],[CircleCheck,"Status"]].map(([Icon, label]) => { const Symbol = Icon as typeof Wrench; return <div key={String(label)} className="flex flex-col items-center gap-3"><Symbol aria-hidden="true" className="size-6" /><span className="text-sm">{String(label)}</span></div>; })}</div>;
  if (name === "Grid/layout") return <div className="space-y-8">{[["Desktop",12],["Tablet",8],["Mobile web reference",4]].map(([label,count]) => <div key={String(label)}><h3 className="mb-3 text-sm font-medium">{label}</h3><div className="grid gap-2" style={{gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`}}>{Array.from({length:Number(count)},(_,i)=><div key={i} className="h-20 bg-primary/20" />)}</div></div>)}</div>;
  if (name === "Button") return <div className="space-y-6"><div className="flex flex-wrap gap-3"><Button type="button">Primary</Button><Button type="button" variant="outline">Secondary</Button><Button type="button" variant="ghost">Ghost</Button><Button type="button" variant="destructive">Danger</Button><Button type="button" size="icon" aria-label="Add item" title="Add item"><Plus className="size-4" /></Button><Button type="button" disabled>Disabled</Button></div><div className="flex flex-wrap gap-3"><Button type="button"><Plus aria-hidden="true" className="size-4" />Add item</Button><Button type="button" variant="outline">Add item<Plus aria-hidden="true" className="size-4" /></Button><Button type="button" loading>Saving changes</Button><Button type="button" variant="outline" loading>Loading</Button><Button type="button" size="icon" loading aria-label="Saving" title="Saving" /></div></div>;
  if (name === "Input field" || name === "Textarea") return <div className="grid max-w-lg gap-2"><Label htmlFor="demo-input">{name === "Textarea" ? "Notes" : "Name"}</Label>{name === "Textarea" ? <Textarea id="demo-input" value={text} onChange={e=>setText(e.target.value)} placeholder="Add notes" /> : <Input id="demo-input" value={text} onChange={e=>setText(e.target.value)} placeholder="Material name" />}</div>;
  if (name === "Search bar") return <div className="space-y-5"><FilterBar search={{value:text,onChange:setText,placeholder:"Search products"}} onReset={text ? ()=>setText("") : undefined} /><p className="text-sm text-muted-foreground">{sampleRows.filter(row=>row.name.toLowerCase().includes(text.toLowerCase())).length} results</p></div>;
  if (name === "Dropdown/select") return <div className="grid max-w-sm gap-2"><Label htmlFor="demo-select">Status</Label><Select value={value} onValueChange={setValue}><SelectTrigger id="demo-select"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ready">Ready</SelectItem><SelectItem value="pending">Pending review</SelectItem><SelectItem value="paused">Paused</SelectItem></SelectContent></Select></div>;
  if (name === "Checkbox") return <div className="flex items-center gap-3"><Checkbox id="demo-checkbox" /><Label htmlFor="demo-checkbox">Show available materials only</Label></div>;
  if (name === "Date picker") return <div className="grid max-w-sm gap-2"><Label htmlFor="demo-date">Delivery date</Label><DatePicker id="demo-date" value={date} onChange={setDate} toYear={new Date().getFullYear()+2} /></div>;
  if (name === "PageHeader") return <PageHeader title="Inventory" description={text || "Available materials"} actions={<Button type="button" onClick={()=>setText("New item selected")}>Add item</Button>} />;
  if (name === "Pagination" || name === "Table") return <div className="space-y-4"><label className="flex items-center gap-3 text-sm">Table variant<select aria-label="Table variant" className="h-9 rounded-sm border bg-background px-3" value={density} onChange={event => setDensity(event.target.value as typeof density)}><option value="default">Default</option><option value="compact">Compact</option><option value="catalog">Catalogue</option></select></label><DataTable variant={density} columns={[{key:"name",header:"Material",cell:row=>row.name},{key:"quantity",header:"Quantity",cell:row=>row.quantity,align:"right"}]} rows={sampleRows.slice((page-1)*3,page*3)} rowKey={row=>row.id} /><Pagination page={page} pageSize={3} total={sampleRows.length} onPageChange={setPage} /></div>;
  if (name === "Menu dropdown") return <DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="outline">Actions</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onSelect={()=>setText("Edit selected")}>Edit</DropdownMenuItem><DropdownMenuItem onSelect={()=>setText("Archive selected")}>Archive</DropdownMenuItem></DropdownMenuContent><p role="status" className="mt-4 text-sm">{text}</p></DropdownMenu>;
  if (name === "Card") return <Card className="max-w-lg"><CardHeader><h3 className="font-semibold">Item summary</h3></CardHeader><CardContent>Standard construction material</CardContent></Card>;
  if (name === "Badge") return <div className="flex flex-wrap gap-3"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge></div>;
  if (name === "Status badge") return <div className="flex flex-wrap gap-4"><StatusBadge tone="success">Published</StatusBadge><StatusBadge tone="warning">Pending review</StatusBadge><StatusBadge tone="error">Rejected</StatusBadge><StatusBadge tone="info">Processing</StatusBadge><StatusBadge>Draft</StatusBadge></div>;
  if (name === "Avatar") return <div className="flex items-center gap-4"><Avatar><AvatarFallback>MP</AvatarFallback></Avatar><Avatar className="size-12"><AvatarFallback>AS</AvatarFallback></Avatar></div>;
  if (name === "Empty state") return <EmptyState title="No materials found" description="Try another search or clear your filters." />;
  if (name === "Loading skeleton") return <div aria-label="Loading materials" role="status" className="space-y-4">{[1,2,3].map(i=><div key={i} className="flex gap-4"><Skeleton className="size-10" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-1/3" /></div></div>)}</div>;
  if (name === "Spinner") return <LoadingState label="Loading materials" />;
  if (name === "Alert banner") return banner ? <DismissibleBanner message="Your changes have been saved." autoHideMs={0} onDismiss={()=>setBanner(false)} /> : <Button type="button" variant="outline" onClick={()=>setBanner(true)}>Show alert</Button>;
  if (name === "Modal/dialog") return <Dialog><DialogTrigger asChild><Button type="button" variant="outline">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Item details</DialogTitle><DialogDescription>Review the selected material.</DialogDescription></DialogHeader><Input aria-label="Item note" placeholder="Note" /></DialogContent></Dialog>;
  if (name === "Sheet") return <Sheet><SheetTrigger asChild><Button type="button" variant="outline">Open sheet</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Item details</SheetTitle><SheetDescription>Review the selected material.</SheetDescription></SheetHeader></SheetContent></Sheet>;
  return null;
}
