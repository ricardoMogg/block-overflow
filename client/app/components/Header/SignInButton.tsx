"use client";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import React, { memo } from "react";

const SignInButton = memo(function SignInButton() {
  return <DynamicWidget />;
});

export default SignInButton;
