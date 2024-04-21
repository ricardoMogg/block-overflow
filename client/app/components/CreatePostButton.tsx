"use client";

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
      py="28px"
      w="327px"
      onClick={onClick}
    >
      Ask away
    </Button>
  );
}

export default memo(CreatePostButton);
