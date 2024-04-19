"use client";
import { Button } from "@chakra-ui/react";
import React, { memo, useCallback } from "react";

const AskQuestionButton = memo(function AskQuestionButton() {
  const handleClick = useCallback(() => {
    alert("Ask a question");
  }, []);
  return <Button onClick={handleClick}>Ask away</Button>;
});

export default AskQuestionButton;
