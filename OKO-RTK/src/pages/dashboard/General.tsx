import React, { useEffect, useState } from "react";
import { Box, HStack, Flex, VStack, Text } from '@chakra-ui/react'

function General() {
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
					<VStack h='full' w='36.5%'>
						<HStack w='full' h='20%'>
							<Box
								bg='white'
								h='full'
								w='50%'
								borderRadius='10px'
								boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
								py='1'
								px='2'
								spaceY='-3'
							>
								<Text fontSize='20px'>Работает</Text>
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
							<Box
								bg='white'
								h='full'
								w='50%'
								borderRadius='10px'
								boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
								py='1'
								px='2'
								spaceY='-3'
							>
								<Text fontSize='20px'>Предупреждение</Text>
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
						</HStack>
						<HStack w='full' h='20%'>
							<Box
								bg='white'
								h='full'
								w='50%'
								borderRadius='10px'
								boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
								py='1'
								px='2'
								spaceY='-3'
							>
								<Text fontSize='20px'>Критическое состояние</Text>
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
							<Box
								bg='white'
								h='full'
								w='50%'
								borderRadius='10px'
								boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
								py='1'
								px='2'
								spaceY='-3'
							>
								<Text fontSize='20px'>Недоступно</Text>
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
						</HStack>
						<Box
							bg='white'
							h='64%'
							w='full'
							borderRadius='10px'
							boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
							py='1'
							px='2'
						></Box>
					</VStack>
					<Box
						bg='white'
						h='full'
						w='63.5%'
						borderRadius='10px'
						boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
						py='1'
						px='2'
					></Box>
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
						<Text fontSize='20px'>Статистика работоспособности устройств</Text>
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
	)
}

export default General;
