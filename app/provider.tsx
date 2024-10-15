"use client";

import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
} from "@tanstack/react-query";
import { ColorSchemeProvider } from "@/components/color-scheme/color-scheme-provider";

const client = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (_data, _variables, _context, mutation) => {
      await client.invalidateQueries({
        queryKey: mutation.options.mutationKey,
      });
    },
  }),
});

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        <ColorSchemeProvider>
          <>{children}</>
        </ColorSchemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
