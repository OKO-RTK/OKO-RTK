import Sidebar from '../../components/sidebar/Sidebar'
import { Flex, Box, Text, VStack } from '@chakra-ui/react'
import { FiServer, FiGlobe, FiMonitor } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Device {
	device_name: string
	ip_address: string
	device_type: string
	checked_at: string
	status: string
}

const [devices, setDevices] = useState<Device[]>([])
const token = localStorage.getItem('token')

useEffect(() => {
	if (location.pathname === '/devices') {
		const fetch = async () => {
			const token = localStorage.getItem('token')
			try {
				const response = await axios.get<Device[]>(
					'http://130.193.56.188:3000/device',
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
				setDevices(response.data.slice(0, 50))
			} catch (err) {
				alert('Ошибка при загрузке уcтройств ' + err)
			}
		}
		fetch()
		const interval = setInterval(fetch, 5000)
		return () => clearInterval(interval)
	}
}, [])


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
					maxH='600px'
					w='100%'
					borderRadius='20'
					overflowY='auto'
					pr='4px'
					css={{
						'&::-webkit-scrollbar': { width: '3px' },
						'&::-webkit-scrollbar-thumb': {
							background: '#ccc',
							borderRadius: '8px',
						},
					}}
				>
					<VStack>
						{devices.map(device => {
							return (
								<Flex
									bg='#F4F4F5'
									w='full'
									h='60px'
									px={3}
									borderRadius='10px'
									alignItems='center'
									justifyContent='space-between'
									fontSize='16px'
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
												{/* <FiGlobe color='black' /> */}
												<Text fontSize='30px' fontWeight='500' color='black'>
													{device.device_type} {device.device_name}
												</Text>
											</Box>
											<Box textAlign='right'>
												<Text fontSize='20px' fontWeight='400' color='#5A606D'>
													Добавлено: {device.checked_at}
												</Text>
												<Text fontSize='20px' fontWeight='400' color='#5A606D'>
													Статус: {device.status}
												</Text>
											</Box>
										</Flex>
									</VStack>
								</Flex>
							)
						})}
					</VStack>
				</Box>
{/* 				<Box
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
				</Box> */}
			</Flex>
		</Flex>
	)
}

export default Devices
