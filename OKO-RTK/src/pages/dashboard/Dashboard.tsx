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
	VStack,
	Select,
	createListCollection,
} from '@chakra-ui/react'
import { FiUpload, FiCheck, FiX } from 'react-icons/fi'
import '../../index.css'
import General from './General'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
	Cell,
	Pie,
	PieChart,
	Tooltip,
	Legend,
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Line,
	LineChart,
} from 'recharts'
import { Toaster, toaster } from '@/components/ui/toaster'
import { Chart, useChart } from '@chakra-ui/charts'

interface Device {
	device_id: string
	device_name: string
	ip_address: string
	device_type: string
	checked_at: string
	status: string
}

interface Alert{
	message: string
  description: string
  time: string
}

function Dashboard() {

	const [activeTab, setActiveTab] = useState<'general' | 'detailed'>('detailed')

	const [devices, setDevices] = useState<Device[]>([])

	const [alerts, setAlerts] = useState<Alert[]>([])

	const [exportFile, setExportFile] = useState({
		file_name: ''
	})

	const [deviceData, setDeviceData] = useState({
		device_id: '',
		device_name: '',
	})

	const [deviceMonitor, setDeviceMonitor] = useState<{
		base_metrics: {
			cpu_load: number | null
			memory_used: number | null
			network_transmitted: number | null
			ping: number | null
			status: string
			time: string
			port: string | null
			cpu_model: string | null
			cpu_cores: string | null
			cpu_freq: string | null
			packet_loss: string | null
		}
		chart: {
			cpu: { cpu_load: number | null; time: string }
			status_update: { status: string; time: string }
		}[]
		portStats?: {
			open: number
			closed: number
		}
		statusChartData?:{Status: string, Time:string}[]
		cpuChartData?: { CPU: number; month: string }[]
	} | null>(null)


	const handleExport = async(deviceName:string, filename:string) =>{
		const token = localStorage.getItem('token')
		try{
			const response = await axios.get(
				'http://130.193.56.188:3000/dashboard/export/' + deviceName + '/' + filename,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					responseType: 'blob', // важно для скачивания файлов
				}
			)
			const blob = new Blob([response.data], { type: 'text/csv' })
			const url = window.URL.createObjectURL(blob)

			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', filename+'.csv') // имя сохраняемого файла
			document.body.appendChild(link)
			link.click()
			link.remove()

			window.URL.revokeObjectURL(url) // очищаем память
		}
		catch (err){
			toaster.error({
				title: 'Ошибка при загрузке отчета',
				description: 'Ошибка ' + err,
				duration: 5000,
			})
		}
	}

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

	const fetchMetrics = async (name: string) => {

		const token = localStorage.getItem('token')

		try {
			const response = await axios.get(
				`http://130.193.56.188:3000/dashboard/device/` + name,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			const monitor = response.data

			// --- Обработка портов ---
			const portString = monitor.base_metrics?.port
			let open = 0
			let closed = 0

			if (portString) {
				try {
					const parsedPorts = JSON.parse(portString)
					const entries = Object.entries(parsedPorts)

					open = entries.filter(([, status]) => status === 'доступен').length
					closed = entries.length - open
				} catch (err) {
					alert('Ошибка при разборе портов:' + err)
				}
			} else {
				toaster.error({
					title: 'Ошибка при считывании портов ',
					duration: 5000,
				})
			}

			// --- Обработка графика загрузки ---
			const cpuChartData = (monitor.chart || [])
				.filter((entry: any) => entry.cpu?.cpu_load !== null)
				.map((entry: any) => ({
					CPU: entry.cpu.cpu_load,
					month: new Date(entry.cpu.time).toLocaleString('ru-RU', {
						hour: '2-digit',
						minute: '2-digit',
					}),
				}))

			// --- Обработка графика статусов ---
			const statusChartData = (monitor.chart || [])
				.filter((entry: any) => entry.status?.status !== null)
				.map((entry: any) => ({
					Status: entry.status.cpu_load,
					Time: new Date(entry.status.time).toLocaleString('ru-RU', {
						hour: '2-digit',
						minute: '2-digit',
					}),
				}))


			// --- Обработка уведомлений ---
			setAlerts(monitor.alerts.slice(0, 30))

			setDeviceMonitor({
				...monitor,
				portStats: { open, closed },
				cpuChartData,
			})
		} catch (error) {
			toaster.error({
				title: 'Ошибка при получении метрик устройства',
				description: 'Ошибка: ' + error,
				duration: 5000,
			})
		}
	}

	useEffect(() => {
		if (location.pathname === '/'){
			fetchDevices()
			if (deviceData.device_name) {
				const interval = setInterval(() => {
					fetchMetrics(deviceData.device_name)
				}, 500)

				return () => clearInterval(interval)
			}
		}
	}, [deviceData.device_name])


	const portChart = useChart({
		data: [
			{
				name: 'открытые порты',
				value: deviceMonitor?.portStats?.open || 0,
				color: '#7700FF',
			},
			{
				name: 'закрытые порты',
				value: deviceMonitor?.portStats?.closed || 0,
				color: '#FF4F12',
			},
		],
	})

	const cpuChart = useChart({
		data: deviceMonitor?.cpuChartData || [],
		series: [{ name: 'CPU', color: 'rgba(119, 0, 255, 0.6)' }],
	})

	const statusChart = useChart({
		data: deviceMonitor?.statusChartData || [],
		series: [{ name: 'Status', color: 'rgba(119, 0, 255, 0.6)' }],
	})

	const getColorByStatus = (status: string | undefined): string => {
		switch (status) {
			case 'Работает':
				return '#0ACB5B'
			case 'Предупреждение':
				return '#FDA610'
			case 'Критическое состояние':
				return '#FF2626'
			case 'Недоступно':
				return '#797E8B'
			default:
				return '#CCCCCC'
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
		<Flex h='100vh' w='100vw' overflow='hidden' fontFamily='RostelecomBasis'>
			{/* Sidebar (фиксированной ширины) */}
			<Sidebar />
			<Toaster />
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
									fontSize='clamp(5px, 2.4vh, 40px)'
									borderRadius={10}
									fontWeight={500}
									cursor='pointer'
									value={deviceData.device_name}
									onChange={e => {
										const name = e.target.value
										setDeviceData(prev => ({
											...prev,
											device_name: name,
										}))
										fetchMetrics(name)
									}}
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

							{deviceData.device_name != '' && (
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
												mb='2'
												spaceY={-4}
												borderRadius={'10px'}
												bg='#EFEFF0'
												fontFamily={'RostelecomBasis'}
												className='text-black'
											>
												<Dialog.CloseTrigger asChild>
													<Box
														display='flex'
														alignItems='top'
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
												<Dialog.Header px={3}>
													<Dialog.Title fontSize='25px'>
														Экспорт отчета
													</Dialog.Title>
												</Dialog.Header>

												<Dialog.Body px={3} spaceY={3}>
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
															value={exportFile.file_name}
															onChange={e =>
																setExportFile({
																	file_name: e.target.value,
																})
															}
														/>
													</Box>
												</Dialog.Body>

												<Dialog.Footer px={3} py={3} paddingTop={0}>
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
																onClick={() =>
																	setExportFile({
																		file_name: '',
																	})
																}
															>
																<FiX />
																Отмена
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
																	await handleExport(
																		deviceData.device_name,
																		exportFile.file_name
																	)
																	setExportFile({ file_name: '' })
																}}
															>
																<FiCheck />
																Сохранить
															</Button>
														</HStack>
													</Dialog.ActionTrigger>
												</Dialog.Footer>
											</Dialog.Content>
										</Dialog.Positioner>
									</Portal>
								</Dialog.Root>
							)}
							{deviceData.device_name === '' && (
								<Box
									display='flex'
									alignItems='center'
									justifyContent='center'
									h='57.253%'
									aspectRatio={1}
									borderRadius='10px'
									outline='1px solid #CCCCCC'
									boxShadow='0 0 15px rgba(204, 204, 204, 1)'
									color='#CCCCCC'
									cursor={'disabled'}
								>
									<FiUpload className='h-[70%] w-[70%] stroke-[1.5]' />
								</Box>
							)}
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
					{activeTab.includes('detailed') && (
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
											<VStack h='full' w='38.6%' spaceY={1}>
												<Box
													bg='white'
													h='45%'
													w='full'
													borderRadius='10px'
													boxShadow='0 0 5px rgba(0, 0, 0, 0.1)'
													py='1'
													px='2'
												>
													<Flex
														justifyContent='space-between'
														alignItems='center'
													>
														<Text
															color='black'
															fontWeight='500'
															fontSize='16px'
														>
															Текущий статус
														</Text>
														<Text
															color='#666666'
															fontWeight='500'
															fontSize='10px'
															mt='1'
														>
															{deviceMonitor?.base_metrics.time
																? `${
																		formatDate(deviceMonitor.base_metrics.time)
																			.time
																  } - ${
																		formatDate(deviceMonitor.base_metrics.time)
																			.day
																  }`
																: 'Нет данных'}
														</Text>
													</Flex>

													<Flex justifyContent='center'>
														<Text
															color={getColorByStatus(
																deviceMonitor?.base_metrics.status
															)}
															fontWeight='500'
															fontSize='20px'
														>
															{deviceMonitor?.base_metrics.status ||
																'Устройство не выбрано '}
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
														<Text
															color='black'
															fontWeight='500'
															fontSize='28px'
														>
															{deviceMonitor?.base_metrics.ping || 'NULL'}ms
														</Text>
														<Text
															color='#CCCCCC'
															fontWeight='500'
															fontSize='10px'
														>
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
												<Chart.Root maxH='90%' chart={statusChart}>
													<LineChart
														data={statusChart.data}
														margin={{ left: 40, right: 40, top: 40 }}
													>
														<CartesianGrid
															stroke={statusChart.color('border')}
															strokeDasharray='3 3'
															horizontal={false}
														/>
														<XAxis
															dataKey={statusChart.key('Time')}
															tickFormatter={value => value.slice(0, 3)}
															stroke={statusChart.color('border')}
														/>
														<YAxis
															dataKey={statusChart.key('Status')}
															stroke={statusChart.color('border')}
															domain={[140, 'dataMax']}
														/>
														<Tooltip
															animationDuration={100}
															cursor={{ stroke: statusChart.color('border') }}
															content={<Chart.Tooltip hideLabel />}
														/>
														{statusChart.series.map(item => (
															<Line
																key={item.name}
																connectNulls
																isAnimationActive={false}
																dataKey={statusChart.key(item.name)}
																stroke={statusChart.color(item.color)}
																fill={statusChart.color(item.color)}
																dot={{ strokeDasharray: '0' }}
																strokeWidth={2}
																strokeDasharray={item.strokeDasharray}
															/>
														))}
													</LineChart>
												</Chart.Root>
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
											<Flex justifyContent='space-between'>
												<Text fontSize='20px'>График загрузки CPU</Text>
												<Text fontSize='20px'>
													{deviceMonitor?.base_metrics.cpu_model}
												</Text>
											</Flex>

											<Chart.Root h='90%' chart={cpuChart} w='full'>
												<AreaChart data={cpuChart.data}>
													<CartesianGrid
														stroke={cpuChart.color('#CCCCCC')}
														vertical={true}
														horizontal={true}
													/>
													<YAxis
														type='number'
														domain={[0, 100]}
														ticks={[0, 25, 50, 75, 100]}
														interval='preserveStartEnd'
														stroke={cpuChart.color('#CCCCCC')}
													/>
													<XAxis
														dataKey={cpuChart.key('month')}
														axisLine={true}
														tick={<></>} // Безопасный способ убрать подписи
														stroke={cpuChart.color('#CCCCCC')}
														tickFormatter={value => value.slice(0, 150)}
													/>
													<Tooltip
														cursor={false}
														animationDuration={100}
														content={<Chart.Tooltip />}
													/>
													{cpuChart.series.map(item => (
														<Area
															key={item.name}
															isAnimationActive={false}
															dataKey={cpuChart.key(item.name)}
															fill={cpuChart.color(item.color)}
															fillOpacity={0.2}
															stroke={cpuChart.color(item.color)}
															stackId='a'
														/>
													))}
												</AreaChart>
											</Chart.Root>
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
											<VStack
												fontSize='16px'
												fontWeight='400'
												px='1'
												spaceY={-1.5}
											>
												<Flex w='full' justifyContent='space-between'>
													<Text>Ping</Text>
													<Text>
														{deviceMonitor?.base_metrics.ping || 'NULL '}m/s
													</Text>
												</Flex>

												<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />

												<Flex w='full' justifyContent='space-between'>
													<Text>Потеря пакетов</Text>
													<Text>
														{deviceMonitor?.base_metrics.packet_loss || 'NULL '}
														%
													</Text>
												</Flex>

												<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />

												<Flex w='full' justifyContent='space-between'>
													<Text>Загрузка CPU</Text>
													<Text>
														{deviceMonitor?.base_metrics.cpu_load || '0'}%
													</Text>
												</Flex>

												<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />

												<Flex w='full' justifyContent='space-between'>
													<Text>Использование памяти</Text>
													<Text>
														{deviceMonitor?.base_metrics.memory_used || 'NULL '}
														%
													</Text>
												</Flex>

												<Box w='full' h='2px' bg='#D9D9D9' borderRadius='lg' />

												<Flex w='full' justifyContent='space-between'>
													<Text>Пропускная способность</Text>
													<Text>
														{(
															Number(
																deviceMonitor?.base_metrics.network_transmitted
															) / 1048576
														).toFixed(2)}
														Mb/s
													</Text>
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
											<VStack
												h='85%'
												overflowY='auto'
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
												{alerts.map(alert => {
													const { time, day } = formatDate(alert.time)
													return (
														<Flex
															bg='#F4F4F5'
															w='full'
															h='50px'
															px={3}
															borderRadius='10px'
															alignItems='center'
															justifyContent='space-between'
															fontSize='14px'
														>
															<Box>
																<Text fontWeight='500' color='black'>
																	{alert.message}
																</Text>
																<Text fontWeight='400' color='#5A606D'>
																	{alert.description}
																</Text>
															</Box>
															<Box textAlign='right'>
																<Text fontWeight='400' color='#5A606D'>
																	{time}
																</Text>
																<Text fontWeight='400' color='#5A606D'>
																	{day}
																</Text>
															</Box>
														</Flex>
													)
												})}
											</VStack>
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
										<Chart.Root
											fontSize='15px'
											boxSize='90%'
											mx='auto'
											chart={portChart}
										>
											<PieChart>
												<Legend content={<Chart.Legend />} />
												<Tooltip
													cursor={false}
													animationDuration={100}
													content={<Chart.Tooltip hideLabel />}
												/>
												<Pie
													isAnimationActive={false}
													data={portChart.data}
													dataKey={portChart.key('value')}
													labelLine={{
														stroke: portChart.color('border.emphasized'),
													}}
													label={{
														fill: portChart.color('fg.muted'),
														style: { fontWeight: '600' },
													}}
												>
													{portChart.data.map(item => (
														<Cell
															key={item.name}
															fill={portChart.color(item.color)}
														/>
													))}
												</Pie>
											</PieChart>
										</Chart.Root>
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
					)}
					{activeTab.includes('general') && <General />}
				</Box>
			</Flex>
		</Flex>
	)
}

export default Dashboard
