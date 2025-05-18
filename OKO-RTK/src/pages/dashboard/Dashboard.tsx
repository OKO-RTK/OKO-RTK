import Sidebar from '../../components/sidebar/Sidebar'
import {
	Flex,
	Box,
	Text,
	HStack,
	Button,
	CloseButton,
	Dialog,
	Portal,
	Input,
	NativeSelect,
	Select,
	createListCollection,
} from '@chakra-ui/react'
import { FiUpload} from 'react-icons/fi'
import '../../index.css'
import Detailed from './Detailed'
import General from './General'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toaster } from '@/components/ui/toaster'


interface Device {
	device_id: string
	device_name: string
	ip_address: string
	device_type: string
	checked_at: string
	status: string
}


function Dashboard() {

	const [activeTab, setActiveTab] = useState<'general' | 'detailed'>('detailed')

	const [devices, setDevices] = useState<Device[]>([])

	const [deviceData, setDeviceData] = useState({
		device_id: '',
		device_name: '',
	})
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
			} 
			else{
				toaster.error({
					title: 'Ошибка при формировании массива устройств ',
					duration: 5000,
				})
			}
		} catch (err) {
			toaster.error({
				title: 'Ошибка при формировании списка устройств ',
				description: 'Ошибка ' + err,
				duration: 5000,
			})
		}
	}
		
	useEffect(() => {
		if (location.pathname === '/') {
			fetchDevices()
		}
	}, [])

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
					<HStack justifyContent={'space-between'} alignItems='center' h='100%'>
						<Box display='flex' alignItems='center' h='100%'>
							<Text
								color={'black'}
								fontWeight={700}
								fontSize='clamp(16px, 5vh, 40px)'
							>
								Дашборд
							</Text>
						</Box>

						<HStack h='100%' spaceX={4}>
							<Flex
								borderRadius='10px'
								outline='1px solid #CCCCCC'
								bg='white'
								p='2px'
								h='57.253%'
								w='fit-content'
								boxShadow='0 0 15px rgba(119, 0, 255, 0.3)'
								transition='all 0.2s ease-in-out'
							>
								<Box
									alignContent='center'
									paddingInline='5'
									fontSize='clamp(5px, 2.4vh, 40px)'
									fontWeight='500'
									borderRadius='10px'
									textAlign='center'
									flex='1'
									cursor='pointer'
									bg={activeTab === 'general' ? '#7B1EFF' : 'white'}
									color={activeTab === 'general' ? 'white' : '#7B1EFF'}
									_hover={{
										bg: activeTab === 'general' ? '#7B1EFF' : '#F7F0FF',
									}}
									onClick={() => setActiveTab('general')}
									transition='all 0.1s ease-in-out'
								>
									<Text>Общий</Text>
								</Box>

								<Box
									alignContent='center'
									paddingInline='5'
									h='100%'
									fontSize='clamp(5px, 2.4vh, 40px)'
									fontWeight='500'
									borderRadius='10px'
									textAlign='center'
									flex='1'
									cursor='pointer'
									bg={activeTab === 'detailed' ? '#7B1EFF' : 'white'}
									color={activeTab === 'detailed' ? 'white' : '#7B1EFF'}
									_hover={{
										bg: activeTab === 'detailed' ? '#7B1EFF' : '#F7F0FF',
									}}
									onClick={() => setActiveTab('detailed')}
									transition='all 0.1s ease-in-out'
								>
									<Text>Детальный</Text>
								</Box>
							</Flex>
							<NativeSelect.Root>
								<NativeSelect.Field
									bg='white'
									boxShadow='0 0 15px rgba(119, 0, 255, 0.3)'
									color='#7700FF'
									border='1px solid #CCCCCC'
									fontSize='16px'
									borderRadius={10}
									borderColor={'transparent'}
									fontWeight={500}
									cursor='pointer'
									value={deviceData.device_name}
									onChange={e =>
										setDeviceData(prev => ({
											...prev,
											device_name: e.target.value,
										}))
									}
								>
									<option
										value=''
										hidden
										className='!bg-[#F2F3F4] text-gray-500'
									>
										Выберите устройство
									</option>
									{devices.map(device => (
										<option
											key={device.device_id}
											value={device.device_name}
											className='!bg-[#F2F3F4]'
										>
											{device.device_name}
										</option>
									))}
								</NativeSelect.Field>
								<NativeSelect.Indicator />
							</NativeSelect.Root>
							<Dialog.Root>
								<Dialog.Trigger asChild>
									<Box
										display='flex'
										alignItems='center'
										justifyContent='center'
										h='57.253%'
										aspectRatio={1}
										borderRadius='10px'
										outline='1px solid #CCCCCC'
										boxShadow='0 0 15px rgba(119, 0, 255, 0.3)'
										color='#7700FF'
										_hover={{
											bg: '#7700FF',
											color: 'white', // Это изменит цвет иконки
										}}
										transition='all 0.2s ease-in-out'
									>
										<FiUpload className='h-[70%] w-[70%] stroke-[1.5]' />
									</Box>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content
											borderRadius={'15px'}
											bg='#EFEFF0'
											fontFamily={'RostelecomBasis'}
											className='text-black'
										>
											<Dialog.Header>
												<Dialog.Title fontSize='30px'>
													Экспорт отчета
												</Dialog.Title>
											</Dialog.Header>

											<Dialog.Body spaceY={2}>
												<Box
													bg='white'
													p={'10px'}
													borderRadius={10}
													boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
												>
													<Text fontWeight={500} fontSize={20} mb={2}>
														Сохранить как
													</Text>
													<Input
														placeholder={'Придумайте имя отчета'}
														borderColor={'transparent'}
														bg='#F2F3F4'
														color='black'
														fontSize='16px'
														_placeholder={{ opacity: 0.6 }}
														h='40px'
														outlineWidth={1}
														borderRadius={10}
														fontWeight={500}
													/>
												</Box>
												<Box
													bg='white'
													p={'10px'}
													borderRadius={10}
													boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
												>
													<Text fontWeight={500} fontSize={20} mb={2}>
														Тип
													</Text>
													<NativeSelect.Root>
														<NativeSelect.Field
															bg='#F2F3F4'
															color='black'
															fontSize='16px'
															borderRadius={10}
															borderColor={'transparent'}
															fontWeight={500}
														>
															<option value='1' className='!bg-[#F2F3F4]'>
																CSV-файл
															</option>
															<option value='2' className='!bg-[#F2F3F4]'>
																JSON-файл
															</option>
														</NativeSelect.Field>
														<NativeSelect.Indicator />
													</NativeSelect.Root>
												</Box>
											</Dialog.Body>

											<Dialog.Footer>
												<Dialog.ActionTrigger asChild>
													<Button variant='outline' color={'black'}>
														Cancel
													</Button>
												</Dialog.ActionTrigger>
												<Button color={'black'}>Save</Button>
											</Dialog.Footer>
											<Dialog.CloseTrigger asChild>
												<CloseButton size='sm' />
											</Dialog.CloseTrigger>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						</HStack>
					</HStack>
				</Box>
				{/* Основной контент */}
				<Box
					as='main'
					flex='1'
					bg='#F4F4F5'
					paddingInline='5'
					py={4}
					overflowY='auto'
				>
					{activeTab.includes('detailed') && <Detailed />}
					{activeTab.includes('general') && <General />}
				</Box>
			</Flex>
		</Flex>
	)
}

export default Dashboard
