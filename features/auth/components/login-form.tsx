import { LoginInput, useLogin } from "@/features/auth/api/login";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface LoginFormProps {
  onSubmit?: () => void;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export function LoginForm({ onSubmit, onSuccess, onFailure }: LoginFormProps) {
  const form = useLoginForm();
  const { mutateAsync, isPending } = useLogin();
  return (
    <Form {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit((values: LoginInput) => {
          onSubmit?.();
          mutateAsync(values).then(onSuccess).catch(onFailure);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
