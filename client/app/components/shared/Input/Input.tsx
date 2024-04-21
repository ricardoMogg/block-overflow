import { Input, InputProps } from "@chakra-ui/react";
import { memo } from "react";

function BOInput(props: InputProps) {
  return (
    <Input
      borderRadius={8}
      borderColor="#5B616EA8"
      borderWidth={1}
      {...props}
    />
  );
}

export default memo(BOInput);
