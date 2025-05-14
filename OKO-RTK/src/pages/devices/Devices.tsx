import Sidebar from '../../components/sidebar/Sidebar'
import { Flex, Box, Text, VStack } from '@chakra-ui/react'
import { FiServer, FiGlobe, FiMonitor } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'


function Devices() {
	return (
		<Flex h='100vh' w='100vw' overflow='hidden' fontFamily='RostelecomBasis'>
			{/* Sidebar (фиксированной ширины) */}
			<Sidebar />

			{/* Правая часть (занимает оставшееся пространство) */}
			<Flex direction='column' flex='1'>
				{/* Header */}
				<Box
					as='header'
					h='8.4vh'
					bg='white'
					px={'2%'}
					/* py={5} */
					zIndex={10}
					className='shadow-[0_4px_4px_rgba(0,0,0,0.1)]'
				>
					<Box display='flex' alignItems='center' h='100%'>
						<Text
							color={'black'}
							fontWeight={700}
							fontSize='clamp(16px, 5vh, 40px)'
						>
							Устройства
						</Text>
					</Box>
				</Box>
				{/* Основной контент */}
				<Box
					as='main'
					flex='1'
					bg='#F4F4F5'
					px={{ base: 2, md: 5 }}
					py={6}
					overflowY='auto'
				>
					<VStack align='flex-start' mb='2.54%' spaceY={2}>
						<Flex
							bg='#FFFFFF'
							w='full'
							h='72px'
							px={3}
							borderRadius='15px'
							alignItems='center'
							justifyContent='space-between'
						>
							<Box alignContent='center'>
								<Text fontSize='30px' fontWeight='500' color='black'>
									Сервер ХХХХ
								</Text>
							</Box>
							<Box textAlign='right'>
								<Text fontSize='20px' fontWeight='400' color='#5A606D'>
									Добавлено: 02.05.2025
								</Text>
								<Text fontSize='20px' fontWeight='400' color='#5A606D'>
									Статус: Работает
								</Text>
							</Box>
						</Flex>
					</VStack>
				</Box> 
			</Flex>
		</Flex>
	)
}

export default Devices
