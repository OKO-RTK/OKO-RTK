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
	Spinner,
} from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiServer, FiGlobe, FiMonitor, FiX, FiCheck } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import {AxiosError} from 'axios'
import axios from '../../api/axiosInstance'
import { toaster } from '@/components/ui/toaster'


interface Device {
	device_id: string
	device_name: string
	ip_address: string
	device_type: string
	checked_at: string
	status: string
}

interface DeviceExtended {
	device_group: string
	device_name: string
	device_login: string
	device_password: string
	device_type: string
	ip_address: string
	monitoring_interval: string
	port: string
	serial_number: string
	type_check: string[]
	user_id: string
}

interface Group {
	group_id: string
	group_name: string
	group_created_at: string
	num_of_devices: string
}

function Devices() {
	const items = [
		//массив для реализации выбора метода мониторинга
		{ value: 'ping', title: 'Ping' },
		{ value: 'snmp', title: 'SNMP' },
		{ value: 'port', title: 'Проверка порта' },
	]

	const [devices, setDevices] = useState<Device[]>([])
	const [groups, setGroups] = useState<Group[]>([])

	const [saveLoading, setSaveLoading] = useState(false)

	const [showSpinner, setShowSpinner] = useState(true)

	const [extendedData, setExtendedData] = useState<DeviceExtended>({
		device_group: '',
		device_name: '',
		device_login: '',
		device_password: '',
		device_type: '',
		ip_address: '',
		monitoring_interval: '',
		port: '',
		serial_number: '',
		type_check: [],
		user_id: '',
	})

	const getColorByStatus = (status: string): string => {
		switch (status) {
			case 'Работает':
				return 'rgba(10, 203, 91, 1)'
			case 'Предупреждение':
				return 'rgba(253, 166, 16, 1)'
			case 'Критическое состояние':
				return 'rgba(255, 38, 38, 1)'
			case 'Недоступно':
				return 'rgba(121, 126, 139, 1)'
			default:
				return 'transparent'
		}
	}

	const fetchGroups = async () => {
			const token = localStorage.getItem('token')
			const endpoint = 'http://84.201.180.84:3000/api/group';
			try {
				const response = await axios.get<{ groups: Group[] }>(
					endpoint,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)
				const groupsArr = response.data.groups
				if (Array.isArray(groupsArr)) {
					setGroups(groupsArr)
				} 
			} catch (err) {
				toaster.error({
					title: 'Ошибка при загрузке списка групп ',
					description: '' + err,
					duration: 5000,
				})
			}
			finally{
			}
		}

	const fetchDevices = async () => {
		const token = localStorage.getItem('token')
		try {
			const endpoint = 'http://84.201.180.84:3000/api/device'
			const response = await axios.get<{ devices: Device[] }>(
				endpoint,
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
		} catch (err) {
			toaster.error({
				title: 'Ошибка при формировании списка устройств ',
				description: '' + err,
				duration: 5000,
			})
		}
	}

  const handleSave = async (id: string) => {
		setSaveLoading(true)
		try {
			const token = localStorage.getItem('token')
			await axios.put(
				'http://84.201.180.84:3000/api/device/' + id + '/edit',
				{
					device_name: extendedData.device_name,
					device_login: extendedData.device_login,
					device_password: extendedData.device_password,
					ip_address: extendedData.ip_address,
					serial_number: extendedData.serial_number,
					device_type: extendedData.device_type,
					device_group: extendedData.device_group,
					monitoring_interval: parseInt(extendedData.monitoring_interval),
					type_check: extendedData.type_check,
					port: extendedData.port,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			)
			toaster.success({
				title: 'Изменения успешно сохранёны',
				description: `Информация о устройстве '${extendedData.device_name}' сохранена`,
				duration: 5000,
			})
			fetchDevices()
		} catch (error) {
			const err = error as AxiosError<{ error?: string }>
			const message = err.response?.data?.error || 'Неизвестная ошибка'
			if (err.response){
				toaster.error({
					title: 'Ошибка при редактировании устройств ',
					description: message,
					duration: 5000,
				})
			}
		}
		finally{
			setSaveLoading(false)
		}
	}

	const handleDelete = async (id: string) => {
		const token = localStorage.getItem('token')
		try{
			await axios.delete<{ device: DeviceExtended }>(
				`http://84.201.180.84:3000/api/device/` + id + `/delete`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			toaster.success({
				title:
					`Устройство '${extendedData.device_name}' удалено`,
				duration: 5000,
			})
			fetchDevices()
		}
		catch(err){
			toaster.error({
				title: 'Ошибка при удалении устройства ',
				description: '' + err,
				duration: 5000,
			})
		}
	}

	const fetchDeviceById = async (id: string) => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get<{ device: DeviceExtended }>(
				`http://84.201.180.84:3000/api/device/` + id,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			const raw = response.data.device
			const parsed = {
				...raw,
				type_check:
					typeof raw.type_check === 'string'
						? JSON.parse(raw.type_check)
						: raw.type_check,
				port: typeof raw.port === 'string' ? raw.port.slice(1, -1) : ''
			}

			setExtendedData(parsed)

			/* alert('Тип проверки - ' + extendedData.type_check) */
		} catch (err) {
			toaster.error({
				title: 'Ошибка при загрузке устройства ',
				description: '' + err,
				duration: 5000,
			})
		}
	}

	useEffect(() => {
		if (location.pathname === '/devices') {
			fetchDevices()
		}
	}, [])

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (devices.length === 0) {
			timer = setTimeout(() => setShowSpinner(false), 6000)
		} else {
			setShowSpinner(true)
		}
		return () => clearTimeout(timer)
	}, [devices.length])
	


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

	const formatDate = (isoString: string) => {
		//функция форматирования даты
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
					{devices.length === 0 ? (
						<VStack fontSize={25} fontWeight='500'>
							{showSpinner && (
								<Spinner
									size='lg'
									color='#7700FF'
									borderWidth='3px'
									animationDuration='0.7s'
								/>
							)}
							<Text color='#7700FF'>
								{showSpinner
									? 'Загрузка списка устройств...'
									: 'Устройства не найдены'}
							</Text>
						</VStack>
					) : (
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
												_hover={{
													boxShadow: `0 0px 5px ${getColorByStatus(
														device.status
													)}`,
												}}
												transition='all 0.2s ease-in-out'
												onClick={fetchGroups}
											>
												<HStack>
													<Icon size={28} color='black' />
													<Text fontSize='30px' fontWeight='500' color='black'>
														{device.device_name}
													</Text>
												</HStack>
												<Box textAlign='right'>
													<Text
														fontSize='20px'
														fontWeight='400'
														color='#5A606D'
													>
														Проверено: {day} - {time}
													</Text>
													<Text
														fontSize='20px'
														fontWeight='400'
														color='#5A606D'
													>
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
																	Название
																</Text>
																<Input
																	required={true}
																	placeholder={'Название вашего устройства'}
																	borderColor={'transparent'}
																	bg='#F2F3F4'
																	color='black'
																	id='device_name'
																	value={extendedData.device_name}
																	fontSize='16px'
																	_placeholder={{ opacity: 0.6 }}
																	h='40px'
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setExtendedData({
																			...extendedData,
																			device_name: e.target.value,
																		})
																	}
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
																	value={extendedData.ip_address}
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setExtendedData({
																			...extendedData,
																			ip_address: e.target.value,
																		})
																	}
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
																	value={extendedData.serial_number}
																	_placeholder={{ opacity: 0.6 }}
																	h='40px'
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setExtendedData({
																			...extendedData,
																			serial_number: e.target.value,
																		})
																	}
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
																		value={extendedData.device_type}
																		cursor='pointer'
																		onChange={e =>
																			setExtendedData(prev => ({
																				...prev,
																				device_type: e.target.value,
																			}))
																		}
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
																		<option
																			value='hub'
																			className='!bg-[#F2F3F4]'
																		>
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
																<NativeSelect.Root
																	disabled={groups.length === 0}
																>
																	<NativeSelect.Field
																		bg='#F2F3F4'
																		color='black'
																		fontSize='16px'
																		borderRadius={10}
																		borderColor={'transparent'}
																		fontWeight={500}
																		placeholder={
																			groups.length === 0
																				? 'Сначала создайте хотя-бы одну группу'
																				: undefined
																		}
																		cursor={
																			groups.length === 0
																				? 'disabled'
																				: 'pointer'
																		}
																		value={extendedData.device_group}
																		onChange={e =>
																			setExtendedData(prev => ({
																				...prev,
																				device_group: e.target.value,
																			}))
																		}
																	>
																		<option
																			value=''
																			hidden
																			className='!bg-[#F2F3F4] text-gray-500'
																		>
																			Выберите группу
																		</option>

																		{groups.map(group => (
																			<option
																				key={group.group_id}
																				value={group.group_name}
																				className='!bg-[#F2F3F4]'
																			>
																				{group.group_name}
																			</option>
																		))}
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
																	Интервал проверки
																</Text>
																<Input
																	placeholder={
																		'Целое число, интервал проверки в миллисекундах'
																	}
																	borderColor={'transparent'}
																	bg='#F2F3F4'
																	color='black'
																	fontSize='16px'
																	value={extendedData.monitoring_interval}
																	_placeholder={{ opacity: 0.6 }}
																	h='40px'
																	outlineWidth={1}
																	borderRadius={10}
																	fontWeight={500}
																	onChange={e =>
																		setExtendedData({
																			...extendedData,
																			monitoring_interval: e.target.value,
																		})
																	}
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
																	value={
																		Array.isArray(extendedData.type_check)
																			? extendedData.type_check
																			: []
																	}
																	onValueChange={(values: string[]) =>
																		setExtendedData(prev => ({
																			...prev,
																			type_check: values,
																		}))
																	}
																>
																	<Flex gap='2'>
																		{items.map(item => {
																			const isPing = item.value === 'ping'
																			return (
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
																					cursor={
																						isPing ? 'not-allowed' : 'pointer'
																					}
																					opacity={isPing ? 0.8 : 1}
																					pointerEvents={
																						isPing ? 'none' : 'auto'
																					}
																					background={
																						isPing ? '#7700FF' : 'auto'
																					}
																					color={isPing ? 'white' : 'auto'}
																					className='text-[#7700FF] transition-all 
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
																			)
																	})}
																	</Flex>
																</CheckboxGroup>
															</Box>
															{extendedData.type_check.includes('snmp') && (
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
																		value={extendedData.device_login}
																		onChange={e =>
																			setExtendedData({
																				...extendedData,
																				device_login: e.target.value,
																			})
																		}
																	/>
																</Box>
															)}

															{extendedData.type_check.includes('snmp') && (
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
																		value={extendedData.device_password}
																		onChange={e =>
																			setExtendedData({
																				...extendedData,
																				device_login: e.target.value,
																			})
																		}
																	/>
																</Box>
															)}

															{extendedData.type_check.includes('port') && (
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
																		value={extendedData.port}
																		onChange={e =>
																			setExtendedData({
																				...extendedData,
																				port: e.target.value,
																			})
																		}
																	/>
																</Box>
															)}
														</Dialog.Body>
													</Box>
													<Dialog.Footer p='10px' w='99.5%'>
														{/* тут небольшой костыль - из-за Dialog.ActionTrigger модальное окно закрывается сразу по нажатии кнопки, а не ждет ответа функции handleCreateDevice */}
														{/* Кнопка "Сохранить" */}
														<Dialog.ActionTrigger asChild>
															<HStack
																justifyContent='center'
																alignItems='center'
																w='100%'
															>
																<Button
																	bg='white'
																	color='#FF4F12'
																	borderColor='#FF4F12'
																	borderWidth='2px'
																	h='40px'
																	w='49%'
																	fontSize='18px'
																	fontWeight='500'
																	borderRadius={10}
																	_hover={{
																		boxShadow:
																			'0 0px 15px rgba(255, 79, 18, 0.3)',
																	}}
																	_focus={{ outline: 'none' }}
																	transition='all 0.2s ease-in-out'
																	onClick={() => handleDelete(currentId)}
																>
																	<FiX />
																	Удалить устройство
																</Button>
																<Button
																	bg='white'
																	color='#7700FF'
																	borderColor='#7700FF'
																	borderWidth='2px'
																	h='40px'
																	w='49%'
																	fontSize='18px'
																	fontWeight='500'
																	borderRadius={10}
																	_hover={{
																		boxShadow:
																			'0 0px 15px rgba(119, 0, 255, 0.3)',
																	}}
																	_focus={{ outline: 'none' }}
																	transition='all 0.2s ease-in-out'
																	onClick={async () => {
																		await handleSave(currentId)
																		// если всё прошло успешно — закрой вручную
																		// closeDialog() или onClose() — в зависимости от твоей реализации
																	}}
																	loading={saveLoading}
																>
																	<FiCheck />
																	Сохранить изменения
																</Button>
															</HStack>
														</Dialog.ActionTrigger>
													</Dialog.Footer>
												</Dialog.Content>
											</Dialog.Positioner>
										</Portal>
									</Dialog.Root>
								)
							})}
						</VStack>
					)}
				</Box>
			</Box>
		</Flex>
	)
}

export default Devices
