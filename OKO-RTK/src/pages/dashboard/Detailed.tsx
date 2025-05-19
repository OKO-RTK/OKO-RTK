import React, { useEffect, useState } from "react";
import {
	Box,
	Spinner,
	Text,
	Flex,
	Separator,
	HStack,
	VStack,
} from '@chakra-ui/react'

function Detailed() {
  return (
		<Box
			w='full'
			h='full'
			fontFamily='RostelecomBasis'
			color='black'
			fontWeight='500'
		>
			<VStack h='full' w='full' spaceY={1}>
				<HStack w='full' h='56.9%' spaceX={1}>
					<VStack w='67%' h='full' spaceY={1}>
						<HStack w='full' h='42%' spaceX={1}>
							<VStack h='full' w='31.6%' spaceY={1}>
								<Box
									bg='white'
									h='45%'
									w='full'
									borderRadius='10px'
									boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
									py='1'
									px='2'
								>
									<Flex justifyContent='space-between' alignItems='center'>
										<Text color='black' fontWeight='500' fontSize='16px'>
											Текущий статус
										</Text>
										<Text
											color='#666666'
											fontWeight='500'
											fontSize='10px'
											mt='1'
										>
											14:14 - 03.05
										</Text>
									</Flex>

									<Flex justifyContent='center'>
										<Text color='#0ACB5B' fontWeight='500' fontSize='20px'>
											Работает
										</Text>
									</Flex>
								</Box>
								<Box
									bg='white'
									h='55%'
									w='full'
									borderRadius='10px'
									boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
									py='1'
									px='2'
									spaceY='-2'
								>
									<Text fontSize='20px'>Ping</Text>
									<Flex
										mb='3'
										spaceY='-2'
										flexDirection='column'
										alignItems={'center'}
									>
										<Text color='#0ACB5B' fontWeight='500' fontSize='28px'>
											67ms
										</Text>
										<Text color='#CCCCCC' fontWeight='500' fontSize='10px'>
											Пинг устройства в миллисекундах
										</Text>
									</Flex>
								</Box>
							</VStack>
							<Box
								bg='white'
								h='full'
								w='full'
								borderRadius='10px'
								boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
								py='1'
								px='2'
							>
								<Text fontSize='20px'>История изменения статусов</Text>
							</Box>
						</HStack>
						<Box
							h='58%'
							w='full'
							bg='white'
							borderRadius='10px'
							boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
							py='1'
							px='2'
						>
							<Text fontSize='20px'>График загрузки CPU</Text>
						</Box>
					</VStack>
					<VStack w='33%' h='full' spaceY={1.5}>
						<Box
							bg='white'
							w='full'
							h='48.47%'
							borderRadius='10px'
							boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
							py='1'
							px='2'
						>
							<Text fontSize='20px'>Основные метрики</Text>
							<VStack fontSize='16px' fontWeight='400' px='1' spaceY={-1.5}>
								<Flex w='full' justifyContent='space-between'>
									<Text>Ping</Text>
									<Text>63ms</Text>
								</Flex>
								<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />
								<Flex w='full' justifyContent='space-between'>
									<Text>Загрузка CPU</Text>
									<Text>83%</Text>
								</Flex>
								<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />
								<Flex w='full' justifyContent='space-between'>
									<Text>Использование памяти</Text>
									<Text>99%</Text>
								</Flex>
								<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />
								<Flex w='full' justifyContent='space-between'>
									<Text>Пропускная способность</Text>
									<Text>10Gb/s</Text>
								</Flex>
							</VStack>
						</Box>
						<Box
							bg='white'
							w='full'
							h='51.53%'
							borderRadius='10px'
							boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
							py='1'
							px='2'
						>
							<Text fontSize='20px'>Журнал событий</Text>
						</Box>
					</VStack>
				</HStack>
				<HStack w='full' h='41.1%' spaceX={2}>
					<Box
						bg='white'
						h='full'
						w='25%'
						borderRadius='10px'
						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
						py='1'
						px='2'
					>
						<Text fontSize='20px'>Статистика портов</Text>
					</Box>
					<Box
						bg='white'
						h='full'
						w='75%'
						borderRadius='10px'
						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
						py='1'
						px='2'
					>
						<Text fontSize='20px'>Сбои за последние 24 часа</Text>
					</Box>
				</HStack>
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
