<script lang="ts">
  import "iconify-icon";

  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { toast } from "svelte-sonner";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    FormField,
    FormControl,
    FormDescription,
    FormFieldErrors,
    FormButton,
  } from "$lib/components/ui/form";
  import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
  } from "$lib/components/ui/card";
  import type { ActionData, SubmitFunction } from "./$types";

  let { form }: { form: ActionData } = $props();

  const submitCredentials: SubmitFunction = ({
    formElement,
    formData,
    action,
    cancel,
    submitter,
  }) => {
    console.log("Form Element:", formElement);
    console.log("Form Data:", formData);
    console.log("Action:", action);
    console.log("Cancel:", cancel);
    console.log("Submitter:", submitter);
    // return async ({ result, update }) => {};
  };

  $effect(() => {
    if (form?.message) {
      const currentDate = new Date();
      toast.error(form?.message, {
        description: currentDate.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  });
</script>

<div class="flex items-center justify-center">
  <Card class="max-w-xl">
    <CardHeader>
      <CardTitle>Login/Register</CardTitle>
      <CardDescription>You must have an account to access protected pages.</CardDescription>
    </CardHeader>
    <CardContent>
      <form
        id="credsForm"
        method="post"
        action="?/login"
        use:enhance={submitCredentials}
        class="grid w-full items-center gap-4"
      >
        <div class="flex flex-col space-y-1.5">
          <Label for="username">Username</Label>
          <Input id="username" name="username" placeholder="username" />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="password" />
        </div>
        <div class="flex justify-between gap-6">
          <Button type="submit" class="flex-1">Login</Button>
          <Button type="submit" formaction="?/register" class="flex-1" variant="outline"
            >Register</Button
          >
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex">
      <Button type="button" variant="outline" class="flex-1">
        <iconify-icon icon="logos:google-icon" class="mr-2"></iconify-icon>
        Login with Google
      </Button>
    </CardFooter>
  </Card>
</div>
