"use client";

import QueryProvider from "./QueryProvider";
import ContextProvider from "./state-provider/ContextProvider";

type Props = { children: React.ReactNode };

export default function Provider({ children }: Props) {
  return (
    <QueryProvider>
      <ContextProvider>{children}</ContextProvider>
    </QueryProvider>
  );
}
