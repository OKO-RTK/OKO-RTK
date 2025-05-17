import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Select,
  Text
} from "@chakra-ui/react";

function General() {
  return (
		<Box w='full'>
			<Grid
				templateColumns='233px 233px 487px 987px'
				templateRows='repeat(4, 90px) 387px'
				gap='20px'
				bg='#F8F8F8'
			>
				{/* Верхние 4 маленьких блока слева */}
				<GridItem colSpan={1} rowSpan={1}>
					<Box
						w='100%'
						h='100%'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>
				<GridItem colStart={2} rowStart={1}>
					<Box
						w='100%'
						h='100%'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>
				<GridItem colStart={1} rowStart={2}>
					<Box
						w='100%'
						h='100%'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>
				<GridItem colStart={2} rowStart={2}>
					<Box
						w='100%'
						h='100%'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>

				{/* Блок ниже четырех маленьких слева (ширина 487px, высота 320px) */}
				<GridItem colStart={1} colSpan={2} rowStart={3} rowSpan={2}>
					<Box
						w='100%'
						h='100%'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>

				{/* Правый большой блок (827x540) */}
				<GridItem colStart={3} rowStart={1} rowSpan={4}>
					<Box
						w='100%'
						h='100%'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>

				{/* Нижний левый блок (333x387) */}
				<GridItem colStart={1} colSpan={1} rowStart={5}>
					<Box
						w='333px'
						h='387px'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>

				{/* Нижний правый блок (987x387) */}
				<GridItem colStart={3} colSpan={2} rowStart={5}>
					<Box
						w='987px'
						h='387px'
						bg='white'
						border='1px solid #7700FF'
						borderRadius='8px'
					/>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default General;
