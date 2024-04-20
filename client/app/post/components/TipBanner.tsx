import { Post } from "@/app/components/Post";
import { HStack, VStack, Box, Image, Text } from "@chakra-ui/react";
import { memo } from "react";

// Format bounty amount as currency (assuming it's in Ether for this example)
const formatBounty = (amount: number | undefined) => {
  // If no amount is provided, return a default message
  if (amount == null) return "No bounty";
  // Convert to a string with 2 decimal places and add the ETH symbol
  return `${amount.toFixed(2)} ETH`;
};

type TipBannerProps = {
  post?: Post;
};

const TipBanner = memo(function TipBanner({ post }: TipBannerProps) {
  if (!post) return null;

  return (
    <Box
      bgColor="rgba(0, 121, 0, 0.1)"
      color="green"
      borderColor={"green/5"}
      borderWidth={"1px"}
      borderRadius={"8px"}
      w="100%"
      padding={"16px 24px 16px 24px"}
    >
      <HStack
        flex={1}
        alignItems="flex-start"
        gap={16}
      >
        <Box paddingTop={4}>
          <Image
            src="/vector.svg"
            alt="Vector"
          />
        </Box>
        <VStack
          spacing={4}
          alignItems="flex-start"
        >
          <Text
            as="h1"
            size="xxl"
            fontWeight="bold"
          >
            {formatBounty(post?.bountyAmount)} tip
          </Text>
          <Text
            as="h1"
            size="xl"
          >
            The poster of this question has attached a{" "}
            {formatBounty(post?.bountyAmount)} tip for the best answer
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
});

export default TipBanner;
