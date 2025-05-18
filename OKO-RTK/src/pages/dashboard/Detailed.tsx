import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Text,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
} from "@chakra-ui/react";

function Detailed() {
  return (
		<Box w='full' h='full' fontFamily='RostelecomBasis'>
			<VStack h='full' w='full' spaceY={3}>
				<HStack border={'1px solid #7700FF'} w='full' h='25.22%'>
					<Box w='20.4%' h='full' border={'1px solid #7700FF'}>
						<Box w='full' h='45%' border={'1px solid #FF4F12'}></Box>
						<Box w='full' h='50%' border={'1px solid #FF4F12'}></Box>
					</Box>
				</HStack>
				<HStack border={'1px solid #7700FF'} w='full' h='32.36%'></HStack>
				<HStack border={'1px solid #7700FF'} w='full' h='39.1%'></HStack>
			</VStack>
		</Box>
		//		<Box w='full' fontFamily='RostelecomBasis'>
		//			<Grid templateColumns='repeat(12, 1fr)' gap={3} h='full'>
		//				{/* Левая вертикальная колонка (1/12 ширины, растягивается) */}
		//				<GridItem
		//					colSpan={3}
		//					rowSpan={1}
		//					/* border={'1px solid #7700FF'} */
		//					display='flex'
		//					flexDirection='column'
		//					gap={3}
		//				>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//						h='45%'
		//						w='280px'
		//						minH='50px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//						p='2'
		//					>
		//						<Flex justifyContent='space-between' alignItems='center'>
		//							<Text color='black' fontWeight='500' fontSize='20px'>
		//								Текущий статус
		//							</Text>
		//							<Text color='#666666' fontWeight='500' fontSize='12px' mt='1'>
		//								14:14 - 03.05.2025
		//							</Text>
		//						</Flex>
		//
		//						<Flex justifyContent='center'>
		//							<Text color='#0ACB5B' fontWeight='500' fontSize='20px'>
		//								Работает
		//							</Text>
		//						</Flex>
		//					</Box>
		//					<Box
		//						bg='white'
		//						w='280px'
		//						borderRadius='10px'
		//						h='55%'
		//						minH='60px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//
		//				{/* Верхний ряд, 2 блока */}
		//				<GridItem colSpan={5} /* border={'1px solid #7700FF'} */>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//						h='200px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//				<GridItem colSpan={4} /* border={'1px solid #7700FF'} */>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//						h='200px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//
		//				{/* Средний большой блок */}
		//				<GridItem colSpan={8} /* border={'1px solid #7700FF'} */>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//						h='280px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//				<GridItem colSpan={4} /*  border={'1px solid #7700FF'} */>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//						h='280px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//
		//				<GridItem colSpan={4} /* border={'1px solid #7700FF'} */>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//            w='337px'
		//						h='320px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//
		//				<GridItem colSpan={8} /* border={'1px solid #7700FF'} */>
		//					<Box
		//						bg='white'
		//						borderRadius='10px'
		//						h='320px'
		//						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
		//					/>
		//				</GridItem>
		//			</Grid>
		//		</Box>
	)
}

export default Detailed;
