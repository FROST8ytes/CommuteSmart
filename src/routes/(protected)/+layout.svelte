<script lang="ts">
  import House from "lucide-svelte/icons/house";
  import Package2 from "lucide-svelte/icons/package-2";
  import PanelLeft from "lucide-svelte/icons/panel-left";
  import Map from "lucide-svelte/icons/map";
  import MapPin from "lucide-svelte/icons/map-pin";
  import History from "lucide-svelte/icons/history";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";

  import { page } from "$app/stores";

  import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbLink,
    BreadcrumbPage,
  } from "$lib/components/ui/breadcrumb";
  import { Button } from "$lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";
  import { Sheet, SheetTrigger, SheetContent } from "$lib/components/ui/sheet";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";

  import { resetMode, setMode } from "mode-watcher";

  let { children } = $props();

  let paths = $derived($page.url.pathname.split("/"));

  let navItems = $derived([
    {
      name: "Home",
      href: "/home",
      isActive: $page.url.pathname == "/home",
      icon: House,
    },
    {
      name: "Map",
      href: "/map",
      isActive: $page.url.pathname == "/map",
      icon: Map,
    },
    {
      name: "Saved Locations",
      href: "/locations",
      isActive: $page.url.pathname == "/locations",
      icon: MapPin,
    },
    {
      name: "History",
      href: "/history",
      isActive: $page.url.pathname == "/history",
      icon: History,
    },
  ]);
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
  <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
      <a
        href="/"
        class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
        <span class="sr-only">FROST Finance</span>
      </a>
      {#each navItems as item}
        <Tooltip>
          <TooltipTrigger asChild let:builder>
            <a
              href={item.href}
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              class:bg-accent={item.isActive}
              class:text-accent-foreground={item.isActive}
              use:builder.action
              {...builder}
            >
              <!-- svelte-ignore a11y_missing_attribute -->
              <item.icon class="h-5 w-5" />
              <span class="sr-only">{item.name}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">{item.name}</TooltipContent>
        </Tooltip>
      {/each}
    </nav>
    <nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <Tooltip>
        <TooltipTrigger asChild let:builder>
          <DropdownMenu>
            <DropdownMenuTrigger asChild let:builder>
              <Button builders={[builder]} variant="outline" size="icon">
                <Sun
                  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onclick={() => setMode("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onclick={() => setMode("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onclick={() => resetMode()}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="right">Switch Light/Dark Mode</TooltipContent>
      </Tooltip>
    </nav>
  </aside>
  <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <header
      class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
    >
      <Sheet>
        <SheetTrigger asChild let:builder>
          <Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
            <PanelLeft class="h-5 w-5" />
            <span class="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="sm:max-w-xs">
          <nav class="grid gap-5 text-lg font-medium">
            <a
              href="/"
              class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
              <span class="sr-only">FROST Finance</span>
            </a>
            {#each navItems as item}
              <a
                href={item.href}
                class="flex items-center gap-4 rounded-xl px-2.5 py-2 text-muted-foreground hover:text-foreground"
                class:bg-accent={item.isActive}
                class:text-accent-foreground={item.isActive}
              >
                <item.icon class="h-5 w-5" />
                {item.name}
              </a>
            {/each}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb class="hidden md:flex">
        <BreadcrumbList>
          {#each paths as path, i}
            <BreadcrumbItem>
              <BreadcrumbLink href={"/" + paths.slice(0, i + 1).join("/")}>{path}</BreadcrumbLink>
            </BreadcrumbItem>
            {#if i + 1 != paths.length}
              <BreadcrumbSeparator />
            {/if}
          {/each}
        </BreadcrumbList>
      </Breadcrumb>
      <div class="relative ml-auto flex-1 md:grow-0"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="outline"
            size="icon"
            class="overflow-hidden rounded-full"
          >
            <img
              src="/frost8ytes.png"
              width={36}
              height={36}
              alt="Avatar"
              class="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
    {@render children()}
  </div>
</div>
