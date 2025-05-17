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
				<GridItem colSpan={2} rowSpan={2} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='100%' minH='150px' />
				</GridItem>

				{/* Верхний ряд, 2 блока */}
				<GridItem colSpan={5} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='150px' />
				</GridItem>
				<GridItem colSpan={5} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='150px' />
				</GridItem>

				{/* Средний большой блок */}
				<GridItem colSpan={10} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='200px' />
				</GridItem>

				{/* Три блока снизу */}
				<GridItem colSpan={4} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='150px' />
				</GridItem>
				<GridItem colSpan={4} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='150px' />
				</GridItem>
				<GridItem colSpan={4} border={'1px solid #7700FF'}>
					<Box bg='white' borderRadius='lg' h='150px' />
				</GridItem>
			</Grid>
		</Box>
	)
}

export default Detailed;
