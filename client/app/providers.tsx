// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <DynamicContextProvider
        settings={{
          environmentId: "f70aa699-4197-4c47-bede-c2e8cf23f927",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        {children}
      </DynamicContextProvider>
    </ChakraProvider>
  );
}
