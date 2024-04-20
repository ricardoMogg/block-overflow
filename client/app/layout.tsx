import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from "../lib/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Block overflow",
  description: "Don't be scared to ask anon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "f70aa699-4197-4c47-bede-c2e8cf23f927",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <body className={inter.className}>{children}</body>
      </DynamicContextProvider>
    </html>
  );
}
