import {
	Flex,
	Box,
	Text,
	VStack,
	HStack,
	Dialog,
	Portal,
	Input,
	NativeSelect,
	CheckboxGroup,
	CheckboxCard,
	Button,
} from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiServer, FiGlobe, FiMonitor, FiX, FiCheck } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Device {
	//информация об устройстве
	device_id: string
	device_name: string
	ip_address: string
	device_type: string
	checked_at: string
	status: string
}

function Devices() {

  const items = [
		//массив для реализации выбора метода мониторинга
		{ value: 'ping', title: 'Ping' },
		{ value: 'snmp', title: 'SNMP' },
		{ value: 'port', title: 'Проверка порта' },
	]

	const [devices, setDevices] = useState<Device[]>([])

	const [data, setData] = useState<Device>({
		device_id: '',
		device_name: '',
		ip_address: '',
		device_type: '',
		checked_at: '',
		status: '',
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
			} else alert('Ошибка при формировании массива устройств')
		} catch (err) {
			alert('Ошибка при загрузке уведомлений ' + err)
		}
	}

	const fetchDeviceById = async (id:string) =>{
		alert('ID = ')
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get<Device>(
				`http://130.193.56.188:3000/device/`+id,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			setData(response.data)
			alert('Статус устройства - ' + data.device_id)
		} catch (err) {
			alert('Ошибка при загрузке устройства: ' + err)
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
				css={{
					'&::-webkit-scrollbar': { width: '6px' },
					'&::-webkit-scrollbar-thumb': {
						background: '#BBBBBB',
						borderRadius: '8px',
					},
				}}
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
							background: '#BBBBBB',
							borderRadius: '8px',
						},
					}}
				>
					<VStack align='flex-start' mb='2.54%' spaceY={2}>
						{devices.map(device => {
							const { day, time } = formatDate(device.checked_at)
							const Icon = getIconByType(device.device_type)
							const currentId = device.device_id
							return (
								<Dialog.Root
									key={currentId}
									onOpenChange={isOpen => {
										if (isOpen) {
											fetchDeviceById(currentId)
										}
									}}
								>
									<Dialog.Trigger width='full' padding='0'>
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
												<Dialog.CloseTrigger asChild>
													<Box
														display='flex'
														alignItems='center'
														justifyContent='center'
														w='32px'
														h='32px'
														color='#BBBBBB'
														borderRadius='5px'
														_hover={{ color: 'black' }}
														transition='all 0.2s ease-in-out'
														cursor='pointer'
													>
														<FiX className='w-[80%] h-[80%] stroke-[1.5]' />
													</Box>
												</Dialog.CloseTrigger>

												<Dialog.Header>
													<Text fontSize='26px' fontWeight='bold'>
														Просмотр и редактирование
													</Text>
												</Dialog.Header>

												<Box
													overflowY='auto'
													maxH='calc(80vh - 110px)'
													css={{
														'&::-webkit-scrollbar': {
															width: '4px',
														},
														'&::-webkit-scrollbar-thumb': {
															background: '#aaa',
															borderRadius: '6px',
														},
													}}
												>
													<Dialog.Body spaceY={2} p='10px'>
														<Box
															bg='white'
															p={'10px'}
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Введите название вашего устройства
															</Text>
															<Input
																placeholder={'Название вашего устройства'}
																borderColor={'transparent'}
																bg='#F2F3F4'
																color='black'
																id='device_name'
																value={data.device_name}
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
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Введите IP-адрес или доменное имя
															</Text>
															<Input
																placeholder={
																	'Например, 192.168.1.1. или mywebsite.com'
																}
																borderColor={'transparent'}
																bg='#F2F3F4'
																id='ip_address'
																color='black'
																fontSize='16px'
																_placeholder={{ opacity: 0.6 }}
																h='40px'
																value={data.ip_address}
																outlineWidth={1}
																borderRadius={10}
																fontWeight={500}
															/>
														</Box>

														<Box
															bg='white'
															p={'10px'}
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Серийный номер устройства (при наличии)
															</Text>
															<Input
																placeholder={'Серийный номер устройства'}
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
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Тип устройства
															</Text>
															<NativeSelect.Root>
																<NativeSelect.Field
																	bg='#F2F3F4'
																	color='black'
																	fontSize='16px'
																	borderRadius={10}
																	borderColor={'transparent'}
																	fontWeight={500}
																	/* value={deviceData.device_type} */
																	cursor='pointer'
																>
																	<option
																		value='server'
																		className='!bg-[#F2F3F4]'
																	>
																		Сервер
																	</option>
																	<option
																		value='service'
																		className='!bg-[#F2F3F4]'
																	>
																		Сервис
																	</option>
																	<option
																		value='router'
																		className='!bg-[#F2F3F4]'
																	>
																		Роутер
																	</option>
																	<option
																		value='controller-wlc'
																		className='!bg-[#F2F3F4]'
																	>
																		Контроллер WLC
																	</option>
																	<option
																		value='commutator-l3'
																		className='!bg-[#F2F3F4]'
																	>
																		Коммутатор L3
																	</option>
																	<option
																		value='network-card'
																		className='!bg-[#F2F3F4]'
																	>
																		Сетевая карта
																	</option>
																	<option value='hub' className='!bg-[#F2F3F4]'>
																		Концентратор
																	</option>
																	<option
																		value='media-converter'
																		className='!bg-[#F2F3F4]'
																	>
																		Медиаконвертер
																	</option>
																</NativeSelect.Field>
																<NativeSelect.Indicator />
															</NativeSelect.Root>
														</Box>

														<Box
															bg='white'
															p={'10px'}
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Выберите группу для устройства
															</Text>
															<NativeSelect.Root>
																<NativeSelect.Field
																	bg='#F2F3F4'
																	color='black'
																	fontSize='16px'
																	borderRadius={10}
																	borderColor={'transparent'}
																	fontWeight={500}
																	cursor='pointer'
																	/* value={deviceData.device_group} */
																>
																	<option
																		value='group1'
																		className='!bg-[#F2F3F4]'
																	>
																		Группа 1
																	</option>
																	<option
																		value='group2'
																		className='!bg-[#F2F3F4]'
																	>
																		Группа 2
																	</option>
																</NativeSelect.Field>
																<NativeSelect.Indicator />
															</NativeSelect.Root>
														</Box>

														<Box
															bg='white'
															p={'10px'}
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Введите интервал проверки
															</Text>
															<Input
																placeholder={
																	'Целое число, интервал проверки в минутах'
																}
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
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Выберите методы мониторинга
															</Text>
															<CheckboxGroup
																defaultValue={['ping']}
																/* 																onValueChange={(values: string[]) =>
																	setDeviceData(prev => ({
																		...prev,
																		type_check: values,
																	}))
																} */
															>
																<Flex gap='2'>
																	{items.map(item => (
																		<CheckboxCard.Root
																			key={item.value}
																			value={item.value}
																			borderRadius='10px'
																			borderColor='#7700FF'
																			borderWidth='1.8px'
																			fontSize='14px'
																			maxH='30px'
																			display='flex'
																			alignItems='center'
																			justifyContent='center'
																			cursor='pointer'
																			className='text-[#7700FF] transition-all 
																			bg-white 
																			hover:bg-[#7700FF] hover:text-white focus:bg-[#7700FF] 
																			hover:shadow-[0px_0px_10px_rgba(119,0,255,0.5)] max-h-[30px] w-[107px] 
																			data-[state=checked]:bg-[#7700FF] data-[state=checked]:text-white
																			data-[state=checked]:shadow-[0px_0px_10px_rgba(119,0,255,0.5)]'
																		>
																			<CheckboxCard.HiddenInput />
																			<CheckboxCard.Control>
																				<CheckboxCard.Content>
																					<CheckboxCard.Label>
																						{item.title}
																					</CheckboxCard.Label>
																				</CheckboxCard.Content>
																			</CheckboxCard.Control>
																		</CheckboxCard.Root>
																	))}
																</Flex>
															</CheckboxGroup>
														</Box>
														{/* 														{deviceData.type_check.includes('snmp') && (
															<Box
																bg='white'
																p={'10px'}
																borderRadius={15}
																boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
															>
																<Text fontWeight={500} fontSize={20} mb={2}>
																	Введите логин сервера
																</Text>
																<Input
																	placeholder={'Логин сервера'}
																	borderColor={'transparent'}
																	bg='#F2F3F4'
																	color='black'
																	fontSize='16px'
																	_placeholder={{ opacity: 0.6 }}
																	h='40px'
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setDeviceData(prev => ({
																			...prev,
																			device_login: e.target.value,
																		}))
																	}
																/>
															</Box>
														)}

														{deviceData.type_check.includes('snmp') && (
															<Box
																bg='white'
																p={'10px'}
																borderRadius={15}
																boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
															>
																<Text fontWeight={500} fontSize={20} mb={2}>
																	Введите пароль сервера
																</Text>
																<Input
																	placeholder={'Пароль сервера'}
																	type='password'
																	borderColor={'transparent'}
																	bg='#F2F3F4'
																	color='black'
																	fontSize='16px'
																	_placeholder={{ opacity: 0.6 }}
																	h='40px'
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setDeviceData(prev => ({
																			...prev,
																			device_password: e.target.value,
																		}))
																	}
																/>
															</Box>
														)}

														{deviceData.type_check.includes('port') && (
															<Box
																bg='white'
																p={'10px'}
																borderRadius={15}
																boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
															>
																<Text fontWeight={500} fontSize={20} mb={2}>
																	Заполните номера портов
																</Text>
																<Input
																	placeholder={
																		'Номера портов через запятую без пробела'
																	}
																	borderColor={'transparent'}
																	bg='#F2F3F4'
																	color='black'
																	fontSize='16px'
																	_placeholder={{ opacity: 0.6 }}
																	h='40px'
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setDeviceData(prev => ({
																			...prev,
																			port_number: e.target.value,
																		}))
																	}
																/>
																</Box>
															)} */}
													</Dialog.Body>
												</Box>
												<Dialog.Footer p='10px' w='99.5%'>
													{/* тут небольшой костыль - из-за Dialog.ActionTrigger модальное окно закрывается сразу по нажатии кнопки, а не ждет ответа функции handleCreateDevice */}
													<Dialog.ActionTrigger asChild>
														<Button
															bg='white'
															color='#7700FF'
															borderColor='#7700FF'
															borderWidth='2px'
															h='40px'
															w='full'
															fontSize='18px'
															fontWeight='500'
															borderRadius={10}
															_hover={{
																boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)',
															}}
															_focus={{ outline: 'none' }}
															transition='all 0.2s ease-in-out'
															/* onClick={handleCreateDevice} */
														>
															<FiCheck />
															Сохранить изменения
														</Button>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
							)
						})}
					</VStack>
				</Box>
			</Box>
		</Flex>
	)
}

export default Devices
