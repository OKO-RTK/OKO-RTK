import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Heading,
  Flex,
  Select,
  Text
} from "@chakra-ui/react";

function Detailed() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData({ name: "General Data" });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} bg={"black"} color={"white"}>
        dETAILED Information
      </Heading>
      <Text fontSize="xl">{data?.name}</Text>
    </Box>
  );
}

export default Detailed;
