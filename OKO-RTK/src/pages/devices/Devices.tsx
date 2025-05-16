import Sidebar from '../../components/sidebar/Sidebar'
import {
	Flex,
	Box,
	Text,
	VStack,
	HStack,
} from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiServer, FiGlobe, FiMonitor} from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'


interface Device {				//информация об устройстве
	device_name: string
	ip_address: string
	device_type: string
	checked_at: string
	status: string
}

function Devices() {

	const [devices, setDevices] = useState<Device[]>([])
	const token = localStorage.getItem('token')

	const [selectedMethods, setSelectedMethods] = useState<string[]>([])

	const fetchDevices = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get<{ devices: Device[] }>(
				'http://130.193.56.188:3000/device',
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			const devicesArr = response.data.devices
			if (Array.isArray(devicesArr)) {
				setDevices(devicesArr.slice(0, 50))
			} else alert('Ошибка при формировании массива устройств')
		} catch (err) {
			alert('Ошибка при загрузке уведомлений ' + err)
		}
	}

	useEffect(() => {
		if (location.pathname === '/devices') {
			fetchDevices()
		}
	}, [])


	const getColorByStatus = (status:string):string=>{			//функция для задания цвета границы в зависимости от статуса устройства
		switch (status){
			case 'Работает':
				return '#0ACB5B'
			case 'Предупреждение':
				return '#FDA610'
			case 'Критическое состояние':
				return '#FF2626'
			case 'Недоступно':
				return '#797E8B'
			default:
				return 'transparent'
		}
	}

	const getIconByType = (device_type: string): IconType => {
		//функция для задания цвета границы в зависимости от статуса устройства
		switch (device_type.toLowerCase()) {
			case 'service':
				return FiGlobe
			case 'server':
				return FiServer
			default:
				return FiMonitor
		}
	}

	const formatDate = (isoString: string) => {					//функция форматирования даты
		const date = new Date(isoString)
		const time = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
		const day = date.toLocaleDateString('ru-RU')
		return { time, day }
	}

	return (
		<Flex flex='1' overflow='hidden' fontFamily='RostelecomBasis'>
			{/* Основной контент */}
			<Box
				as='main'
				flex='1'
				bg='#F4F4F5'
				px={{ base: 2, md: 5 }}
				py={6}
				overflowY='auto'
			>
				<Box
					maxH='screen'
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
					<VStack align='flex-start' mb='2.54%' spaceY={2}>
						{devices.map(device => {
							const { day, time } = formatDate(device.checked_at)
							const Icon = getIconByType(device.device_type)
							return (
								<Flex
									bg='#FFFFFF'
									w='full'
									h='72px'
									px={3}
									borderRadius='15px'
									alignItems='center'
									justifyContent='space-between'
									borderWidth='2px'
									borderColor={getColorByStatus(device.status)}
								>
									<HStack>
										<Icon size={28} color='black' />
										<Text fontSize='30px' fontWeight='500' color='black'>
											{device.device_name}
										</Text>
									</HStack>
									<Box textAlign='right'>
										<Text fontSize='20px' fontWeight='400' color='#5A606D'>
											Проверено: {day} - {time}
										</Text>
										<Text fontSize='20px' fontWeight='400' color='#5A606D'>
											Статус: {device.status}
										</Text>
									</Box>
								</Flex>
							)
						})}
					</VStack>
				</Box>
			</Box>
		</Flex>
	)
}

export default Devices
