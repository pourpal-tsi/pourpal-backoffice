import React, { Suspense } from "react";

// FIXME: This is a workaround to allow the page to use search params.
export default function Layout({ children }: React.PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
