"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-900">
      {isError && (
        <Alert className="w-full max-w-sm" variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid credentials</AlertTitle>
          <AlertDescription>
            Incorrect email or password. Please, try again.
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Backoffice</CardTitle>
          <CardDescription>
            The internal management system of PourPal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            onSubmit={() => setIsError(false)}
            onFailure={() => setIsError(true)}
            onSuccess={() => router.push("/store/inventory")}
          />
        </CardContent>
        <CardFooter>
          <small>
            Don&apos;t have an account?{" "}
            <Link
              target="_blank"
              className="underline"
              href="https://www.youtube.com/watch?v=IFYSF_BKWIQ"
            >
              Contact your manager.
            </Link>
          </small>
        </CardFooter>
      </Card>
    </div>
  );
}
