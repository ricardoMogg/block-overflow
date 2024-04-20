"use client";
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

import { memo, useEffect, useState } from "react";

function BountyInput({
  updateAmount,
}: {
  updateAmount: (arg0: number) => void;
}) {
  const { primaryWallet } = useDynamicContext();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.connector.getBalance();
        setBalance(parseFloat(value as string));
      }
    };
    fetchBalance();
  }, [primaryWallet]);
  return (
    <Box
      width="100%"
      padding={20}
      borderRadius={8}
      borderColor="#5B616EA8"
      borderWidth={1}
      pt={0}
    >
      <HStack
        marginTop={20}
        flex={1}
        gap={40}
        alignItems="flex-start"
        alignSelf="center"
      >
        <VStack maxW="40%" gap={24} alignItems="flex-start">
          <Input
            w="100%"
            fontSize={32}
            placeholder="0.00"
            type="number"
            onChange={(e) => {
              updateAmount(parseFloat(e.target.value));
            }}
          />
        </VStack>
        <VStack alignItems="flex-end">
          <Button
            leftIcon={
              <Image
                boxSize="20px"
                src="https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"
              />
            }
            backgroundColor="#EEF0F3"
            color="#0A0B0D"
            borderRadius={20}
            px={12}
            py={8}
            paddingRight={30}
            paddingLeft={20}
            fontSize={12}
            fontWeight={800}
          >
            ETH
          </Button>
          <HStack>
            <VStack>
              <Text
                maxW={100}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                color="#aaa"
                fontSize="10"
                fontWeight={600}
              >
                Balance: {balance}
              </Text>
            </VStack>
            <VStack>
              <Text color="#aaa" fontSize="10" fontWeight={600}>
                ETH
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

export default memo(BountyInput);
