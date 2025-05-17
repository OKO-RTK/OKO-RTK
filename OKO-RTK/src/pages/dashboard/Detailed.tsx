import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Flex,
  Grid,
  GridItem
} from "@chakra-ui/react";

function Detailed() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ name: string } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setData({ name: "Detailed Data" });
      setLoading(false);
    });
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
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>

        <GridItem colSpan={2} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>

        <GridItem colSpan={3} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>

        <GridItem colSpan={2} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>

        <GridItem colSpan={2} rowSpan={1}>
          <Box h="10" border="1px solid red" borderRadius="md" />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Detailed;
