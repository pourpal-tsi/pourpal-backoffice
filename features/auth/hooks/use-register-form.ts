import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput } from "@/features/auth/api/login";
import { registerSchema } from "@/features/auth/api/register";

export function useRegisterForm() {
  return useForm<LoginInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });
}
