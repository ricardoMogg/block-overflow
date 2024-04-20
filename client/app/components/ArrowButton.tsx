"use client";

import { Button, Image } from "@chakra-ui/react";
import { memo } from "react";

type ArrowButtonProp = {
  direction: "up" | "down";
  onClick: () => void;
};

const ArrowButton = memo(function ArrowButton({
  direction,
  onClick,
}: ArrowButtonProp) {
  return (
    <Button onClick={onClick}>
      <Image
        src={`/arrow-${direction}.svg`}
        alt={`${direction}Vote`}
      />
    </Button>
  );
});

export default ArrowButton;
