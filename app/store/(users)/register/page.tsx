"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterForm } from "@/features/auth/hooks/use-register-form";
import { useRegister } from "@/features/auth/api/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginInput } from "@/features/auth/api/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { toast } = useToast();
  const [isError, setIsError] = useState(false);

  const form = useRegisterForm();
  const { mutateAsync, isPending } = useRegister();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-background">
      {isError && (
        <Alert className="w-full max-w-sm" variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Duplicate address</AlertTitle>
          <AlertDescription>
            There already exists an administrator user with the specified email
            address.
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Registration</CardTitle>
          <CardDescription>
            Provide another person with access to this system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              noValidate
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(async (values: LoginInput) => {
                setIsError(false);
                try {
                  await mutateAsync(values);
                  form.reset();
                  toast({
                    title: "Registered 🥳",
                    description:
                      "We've sent an email with the generated password to this user!",
                  });
                } catch {
                  setIsError(true);
                }
              })}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@pourpal.site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <small className="text-muted-foreground">
                We&apos;ll send the generated password to this email.
              </small>
              <Button type="submit" disabled={isPending}>
                Give Access
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
