<script lang="ts">
  import mapboxgl from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  import { onMount, onDestroy } from "svelte";

  import { env } from "$env/dynamic/public";
  import { mode } from "mode-watcher";

  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "$lib/components/ui/select";

  import CalendarIcon from "lucide-svelte/icons/calendar";
  import SearchIcon from "lucide-svelte/icons/search";
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "$lib/components/ui/popover";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;

  let map: mapboxgl.Map;
  let mapContainer: HTMLElement;
  let currentMapCoords = { lat: 3.140853, lon: 101.693207 };
  let currentZoom = 10;

  const updateCoordsAndZoom = () => {
    currentZoom = map.getZoom();
    currentMapCoords.lat = map.getCenter().lat;
    currentMapCoords.lon = map.getCenter().lng;
  };

  let currentMode: "dark" | "light" | undefined;
  mode.subscribe((value) => {
    currentMode = value;
  });

  onMount(() => {
    const initialState = { lat: 3.140853, lon: 101.693207 };
    const zoom = 10;

    map = new mapboxgl.Map({
      container: mapContainer,
      accessToken: env.PUBLIC_MAPBOX_API_KEY,
      style:
        !currentMode || currentMode == "dark"
          ? "mapbox://styles/mapbox/navigation-night-v1"
          : "mapbox://styles/mapbox/navigation-day-v1",
      center: initialState,
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
    );

    map.on("move", () => {
      updateCoordsAndZoom();
    });
  });

  onDestroy(() => {
    map && map.remove && map.remove();
  });
</script>

<main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="relative hidden flex-col items-start gap-8 md:flex">
    <form class="grid w-full items-start gap-6">
      <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium">Journey</legend>
        <div class="grid gap-3">
          <Label for="fromLocation">From</Label>
          <Input id="fromLocation" type="text" placeholder="Home" />
        </div>
        <div class="grid gap-3">
          <Label for="destinationLocation">Destination</Label>
          <Input id="destinationLocation" type="text" placeholder="Office" />
        </div>
      </fieldset>
      <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium">Details</legend>
        <div class="flex gap-6">
          <div class="grid flex-1 gap-3">
            <Label for="role">Mode of Transportation</Label>
            <Select selected={{ value: "best", label: "Best" }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
                <SelectItem value="public transport">Public Transport</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid flex-1 gap-3">
            <Label for="content">Leave Later</Label>
            <Popover>
              <PopoverTrigger asChild let:builder>
                <Button
                  variant="outline"
                  class={cn(
                    "justify-start text-left font-normal",
                    !value && "text-muted-foreground",
                  )}
                  builders={[builder]}
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar bind:value initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </fieldset>
      <Button type="submit" class="flex justify-center gap-2">
        <SearchIcon class="h-5 w-5" />
        Search
      </Button>
    </form>
  </div>
  <!-- <Map
    accessToken={env.PUBLIC_MAPBOX_API_KEY}
    bind:this={mapComponent}
    center={{ lat: 3.140853, lon: 101.693207 }}
    zoom={10}
    version="v3.7.0"
    style={!currentMode || currentMode == "dark"
      ? "mapbox://styles/mapbox/navigation-night-v1"
      : "mapbox://styles/mapbox/navigation-day-v1"}
  >
    <NavigationControl />
    <GeolocateControl on:geolocate={(e) => console.log("geolocated", e.detail)} />
    <ScaleControl />
  </Map> -->
  <div class="map" bind:this={mapContainer}></div>
</main>

<style lang="postcss">
  :global(.map) {
    @apply relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 lg:col-span-2;
  }
</style>
