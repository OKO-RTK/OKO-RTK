import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Flex,
  Grid,
  GridItem
} from "@chakra-ui/react";

function Detailed() {
  return (
		<Box w='full'>
			<Grid templateColumns='repeat(12, 1fr)' gap={4} >
				{/* Левая вертикальная колонка (1/12 ширины, растягивается) */}
        <GridItem colSpan={3} rowSpan={1} border={'1px solid #7700FF'} display="flex" flexDirection="column" gap={4}>
          <Box bg='white' borderRadius='lg' h='45%' minH='50px' border={'1px solid #7700FF'} />
          <Box bg='white' borderRadius='lg' h='55%' minH='60px' border={'1px solid #7700FF'}/>
        </GridItem>

				{/* Верхний ряд, 2 блока */}
				<GridItem colSpan={5} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='170px' />
				</GridItem>
				<GridItem colSpan={4} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='170px' />
				</GridItem>

				{/* Средний большой блок */}
				<GridItem colSpan={8} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='200px' />
				</GridItem>
        <GridItem colSpan={4} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='200px' />
				</GridItem>

				{/* Три блока снизу */}
				<GridItem colSpan={4} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='220px' />
				</GridItem>
				
				<GridItem colSpan={8} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='220px' />
				</GridItem>
			</Grid>
		</Box>
	)
}

export default Detailed;
