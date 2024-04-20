"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicContextProvider
          settings={{
            // Find your environment id at https://app.dynamic.xyz/dashboard/developer
            environmentId: "f70aa699-4197-4c47-bede-c2e8cf23f927",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
