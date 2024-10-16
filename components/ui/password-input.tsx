"use client";

import * as React from "react";

import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          className={cn("pr-10", className)}
          type={showPassword ? "text" : "password"}
          ref={ref}
        />
        <span className="absolute right-3 top-[7px] cursor-pointer select-none">
          {showPassword ? (
            <EyeIcon onClick={() => setShowPassword(false)} />
          ) : (
            <EyeOffIcon onClick={() => setShowPassword(true)} />
          )}
        </span>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
