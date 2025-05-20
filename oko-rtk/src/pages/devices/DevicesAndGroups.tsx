import { FiPlus, FiCheck, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import axios from '../../api/axiosInstance'
import { Toaster, toaster } from '@/components/ui/toaster'
import {
  Flex,
  Box,
  Text,
  HStack,
  Dialog,
  Button,
  NativeSelect,
  Input,
  Portal,
  CheckboxCard,
  CheckboxGroup,
} from '@chakra-ui/react'
import Sidebar from '../../components/sidebar/Sidebar'
import Devices from './Devices'
import Groups from './Groups'

interface Device {				//информация об устройстве
  device_name: string
  ip_address: string
  device_type: string
  checked_at: string
  status: string
}

interface Group {
	group_id: string
	group_name: string
	group_created_at: string
	num_of_devices: string
}

function DevicesAndGroups() {

  const [activeTab, setActiveTab] = useState<'groups' | 'devices'>('devices')
  
  const [devices, setDevices] = useState<Device[]>([])
  const [devicesKey, setDevicesKey] = useState(0)
  const [groupsKey, setGroupsKey] = useState(0)

  const [groups, setGroups] = useState<Group[]>([])

	const [deviceData, setDeviceData] = useState({
		device_group: '',
		device_name: '',
		device_login: '',
		device_password: '',
		device_type: 'server',
		ip_address: '',
		monitoring_interval: '',
		port: '',
		serial_number: '',
		type_check: ['ping'],
		user_id: '',
	})

  const [groupData, setGroupData] = useState({
		group_name: '',
	})

  const fetchDevices = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get<{ devices: Device[] }>(
				'http://84.201.180.84:3000/api/device',
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
				title: 'Ошибка при загрузке списка устройств',
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

  const handleCreateDevice = async () => {
    try{
      const token = localStorage.getItem('token');
      await axios.post(
				'http://84.201.180.84:3000/api/device/add',
				{
					device_name: deviceData.device_name,
					device_login: deviceData.device_login,
					device_password: deviceData.device_password,
					ip_address: deviceData.ip_address,
					serial_number: deviceData.serial_number,
					device_type: deviceData.device_type,
					device_group: deviceData.device_group,
					monitoring_interval: parseInt(deviceData.monitoring_interval),
					type_check: deviceData.type_check,
					port: deviceData.port,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			)
    toaster.success({
			title: `Устройство ${deviceData.device_name}' успешно создано`,
			duration: 5000,
		})
    setDevicesKey(prev => prev + 1)
    fetchDevices()
  }
    catch (error){
      const err = error as AxiosError<{ error?: string }>
      const message = err.response?.data?.error || 'Неизвестная ошибка'
      toaster.error({
				title: 'Ошибка при добавлении устройства',
        description: message,
				duration: 5000,
			})
    }
  }


  const fetchGroups = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get<{ groups: Group[] }>(
					'http://84.201.180.84:3000/api/group',
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
          title: 'Ошибка при формировании массива групп ',
          description: '' + err,
          duration: 5000,
        })
      }
    }


  const handleCreateGroup = async () => {
		try {
			const token = localStorage.getItem('token')
			await axios.post(
				'http://84.201.180.84:3000/api/group/add',
				{
					group_name: groupData.group_name,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			)
			toaster.success({
				title: `Группа '${groupData.group_name}' успешно создана`,
				duration: 5000,
			})
			setGroupsKey(prev => prev + 1)
			fetchGroups()
		} catch (err) {
			toaster.error({
				title: 'Ошибка при создании группы',
        description: '' + err, 
				duration: 5000,
			})
		}
	}



  const items = [																			//массив для реализации выбора метода мониторинга
    { value: 'ping', title: 'Ping' },
    { value: 'snmp', title: 'SNMP' },
    { value: 'port', title: 'Проверка порта' },
  ]
  
  return (
		<Flex h='100vh' w='100vw' overflow='hidden' fontFamily='RostelecomBasis'>
			<Toaster />
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
								Устройства
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
									bg={activeTab === 'groups' ? '#7B1EFF' : 'white'}
									color={activeTab === 'groups' ? 'white' : '#7B1EFF'}
									_hover={{
										bg: activeTab === 'groups' ? '#7B1EFF' : '#F7F0FF',
									}}
									onClick={() => setActiveTab('groups')}
									transition='all 0.1s ease-in-out'
								>
									<Text>Группы</Text>
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
									bg={activeTab === 'devices' ? '#7B1EFF' : 'white'}
									color={activeTab === 'devices' ? 'white' : '#7B1EFF'}
									_hover={{
										bg: activeTab === 'devices' ? '#7B1EFF' : '#F7F0FF',
									}}
									onClick={() => setActiveTab('devices')}
									transition='all 0.1s ease-in-out'
								>
									<Text>Устройства</Text>
								</Box>
							</Flex>
							{activeTab.includes('devices') && (
								<Dialog.Root>
									<Dialog.Trigger asChild>
										<Box
											display='flex'
											alignItems='center'
											justifyContent='space-between'
											h='57.253%'
											px='10px' // Добавим отступы слева и справа
											borderRadius='10px'
											outline='1px solid #CCCCCC'
											boxShadow='0 0 15px rgba(119, 0, 255, 0.3)'
											color='#7700FF'
											_hover={{
												bg: '#7700FF',
												color: 'white',
											}}
											transition='all 0.2s ease-in-out'
											cursor='pointer'
											onClick={fetchGroups}
										>
											<Text
												whiteSpace='nowrap'
												fontSize='clamp(5px, 2.4vh, 40px)'
												fontWeight='500'
												paddingRight='4px'
											>
												Добавить устройство
											</Text>
											<FiPlus className='h-[60%] w-[60%] stroke-[2]' />
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
														Добавление нового устройства
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
																autoFocus={false}
																placeholder={'Название вашего устройства'}
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
																	setDeviceData({
																		...deviceData,
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
																color='black'
																fontSize='16px'
																_placeholder={{ opacity: 0.6 }}
																h='40px'
																outlineWidth={1}
																borderRadius={10}
																fontWeight={500}
																onChange={e =>
																	setDeviceData({
																		...deviceData,
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
																_placeholder={{ opacity: 0.6 }}
																h='40px'
																outlineWidth={1}
																borderRadius={10}
																fontWeight={500}
																onChange={e =>
																	setDeviceData({
																		...deviceData,
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
																	value={deviceData.device_type}
																	cursor='pointer'
																	onChange={e =>
																		setDeviceData(prev => ({
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
															<NativeSelect.Root disabled={groups.length === 0}>
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
																		groups.length === 0 ? 'disabled' : 'pointer'
																	}
																	value={deviceData.device_group}
																	onChange={e =>
																		setDeviceData(prev => ({
																			...prev,
																			device_group: e.target.value,
																		}))
																	}
																>
																	<option
																		value=''
                                    disabled
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
																Введите интервал проверки
															</Text>
															<Input
																placeholder={
																	'Целое число, интервал проверки в миллисекундах'
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
																	setDeviceData({
																		...deviceData,
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
																defaultValue={['ping']}
																onValueChange={(values: string[]) =>
																	setDeviceData(prev => ({
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
																				pointerEvents={isPing ? 'none' : 'auto'}
																				background={isPing ? '#7700FF' : 'auto'}
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
														{deviceData.type_check.includes('snmp') && (
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
																			port: e.target.value,
																		}))
																	}
																/>
															</Box>
														)}
													</Dialog.Body>
												</Box>
												<Dialog.Footer p='10px' w='99.5%' mt='-2'>
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
															onClick={handleCreateDevice}
														>
															<FiCheck />
															Подтвердить создание нового устройства
														</Button>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
							)}
							{activeTab.includes('groups') && (
								<Dialog.Root>
									<Dialog.Trigger asChild>
										<Box
											display='flex'
											alignItems='center'
											justifyContent='space-between'
											h='57.253%'
											px='10px' // Добавим отступы слева и справа
											borderRadius='10px'
											outline='1px solid #CCCCCC'
											boxShadow='0 0 15px rgba(119, 0, 255, 0.3)'
											color='#7700FF'
											_hover={{
												bg: '#7700FF',
												color: 'white',
											}}
											transition='all 0.2s ease-in-out'
											cursor='pointer'
										>
											<Text
												whiteSpace='nowrap'
												fontSize='clamp(5px, 2.4vh, 40px)'
												fontWeight='500'
												paddingRight='4px'
											>
												Создать группу
											</Text>
											<FiPlus className='h-[60%] w-[60%] stroke-[2]' />
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
														Создать группу
													</Text>
												</Dialog.Header>

												<Box>
													<Dialog.Body p='10px'>
														<Box
															bg='white'
															p={'10px'}
															borderRadius={15}
															boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
														>
															<Text fontWeight={500} fontSize={20} mb={2}>
																Придумайте название группы
															</Text>
															<Input
																placeholder={'Название новой группы'}
																borderColor={'transparent'}
																bg='#F2F3F4'
																color='black'
																id='device_name'
																/* value={data.group_name} */
																fontSize='16px'
																_placeholder={{ opacity: 0.6 }}
																h='40px'
																outlineWidth={1}
																borderRadius={10}
																fontWeight={500}
																onChange={e =>
																	setGroupData({
																		...groupData,
																		group_name: e.target.value,
																	})
																}
															/>
														</Box>
													</Dialog.Body>
												</Box>
												<Dialog.Footer p='10px' w='99.5%' mt='-2'>
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
															onClick={handleCreateGroup}
														>
															<FiCheck />
															Подтвердить создание новой группы
														</Button>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
							)}
						</HStack>
					</HStack>
				</Box>
				{/* Основной контент */}
				{activeTab.includes('groups') && <Groups key={groupsKey} />}
				{activeTab.includes('devices') && <Devices key={devicesKey} />}
			</Flex>
		</Flex>
	)
}

export default DevicesAndGroups
