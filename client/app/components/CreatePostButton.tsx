'use client';

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { memo, useCallback } from "react";

function CreatePostButton() {
  const router = useRouter();
  const onClick = useCallback(() => router.push("/create"), [router]);

  return (
    <Button
      backgroundColor="#fff"
      color="#0052FF"
      fontWeight={500}
      border="1px solid #0052FF"
      borderRadius={100}
      px={32}
      py={16}
      maxW={327}
      w="100%"
      onClick={onClick}
    >
      Ask away
    </Button>
  );
}

export default memo(CreatePostButton);
