<script lang="ts">
  import { resetMode, setMode } from "mode-watcher";
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";

  import "../../app.css";

  let { children } = $props();
</script>

<div class="flex h-screen w-screen flex-col p-8">
  <div class="flex-0 flex shrink-0 justify-end">
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
      <DropdownMenuContent align="end">
        <DropdownMenuItem onclick={() => setMode("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onclick={() => setMode("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onclick={() => resetMode()}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div class="flex flex-1 flex-col items-center justify-center">
    {@render children()}
  </div>
</div>
