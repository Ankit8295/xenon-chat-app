"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "./QueryProvider";
import ContextProvider from "./state-provider/ContextProvider";

type Props = { children: React.ReactNode };

export default function AppProvider({ children }: Props) {
  return (
    <SessionProvider>
      <QueryProvider>
        <ContextProvider>{children}</ContextProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
