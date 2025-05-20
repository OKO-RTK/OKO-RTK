import Sidebar from '../../components/sidebar/Sidebar'
import Notifications from '../../features/notifications/Notifications'
import {
	Flex,
	Box,
	Text,
	SimpleGrid,
	GridItem,
	VStack,
	Input,
	NativeSelect,
	Switch,
	Button,
} from '@chakra-ui/react'
import { FiCheck, FiX, FiLogOut } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { Toaster, toaster } from '@/components/ui/toaster'

type User = {
	username: string
	email: string
	email_report: string	
	phone: string
	role: string
}

function Settings() {
  
	
/*   const [settingsData, setSettingsData] = useState<any>(null) */
	const [loading, setLoading] = useState(true)

	const [initialData, setInitialData] = useState<User | null>(null)

	const [showToaster, setShowToaster] = useState(true)

	const [data, setData] = useState<User>({
		username: '',
		email: '',
		email_report: '',
		phone: '',
		role: '',
	})
	
	const handleSave = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.put(
				'http://84.201.180.84:3000/api/user/edit',
				{
					username: data.username,
					email: data.email,
					email_report: data.email_report,
					phone: data.phone,
					role: data.role,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			setInitialData(data)
			if (response.data.access_token) 
				localStorage.setItem('token', response.data.access_token);

			toaster.success({
				title: 'Данные успешно обновлены',
				duration: 5000,
			})
		} catch (err) {
			toaster.error({
				title: 'Ошибка при сохранении данных ',
				description: '' + err,
				duration: 5000,
			})
		}
	}
		
	useEffect(() => {

		const token = localStorage.getItem('token')
		const fetchSettings = async () => {

			try {
				const response = await axios.get('http://84.201.180.84:3000/api/user', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				setData(response.data)
				setInitialData(response.data)
			} catch (err) {
				toaster.error({
					title: 'Ошибка при получении данных ',
					description: '' + err,
					duration: 5000,
				})
			} finally {
				setLoading(false)
			}
		}

		fetchSettings()
	}, [])

	const handleReset = async () => {
		if (initialData) setData(initialData)
	}

	const handleExit = async () => {
		localStorage.removeItem('token')
	}
/* 
	if (loading) return <p>Загрузка...</p>
	if (error) return <p>{error}</p>
   */
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
							Настройки и уведомления
						</Text>
					</Box>
				</Box>
				{/* Основной контент */}
				<Box
					as='main'
					flex='1'
					bg='#F4F4F5'
					px={{ base: 5, md: 5 }}
					py={6}
					overflowY='auto'
				>
					<SimpleGrid templateColumns='repeat(5, 2fr)' gap='6'>
						<GridItem
							colSpan={3}
							bg='white'
							borderRadius='15px'
							boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
						>
							<VStack align='flex-start' mx='2.54%' mb='2.54%' spaceY={2}>
								<Box w='100%' mb='-3'>
									<Text fontSize='36px' fontWeight='700' color='black'>
										Настройки
									</Text>
								</Box>
								<Box w='100%'>
									<Text fontSize='20px' fontWeight='500' color='black' p='0%'>
										Имя пользователя
									</Text>
									<Input
										placeholder={'Придумайте имя пользователя'}
										borderColor={'transparent'}
										bg='#F2F3F4'
										color='black'
										fontSize='16px'
										_placeholder={{ opacity: 0.6 }}
										h='40px'
										outlineWidth={1}
										borderRadius={10}
										fontWeight={500}
										value={data.username}
										onChange={e =>
											setData({ ...data, username: e.target.value })
										}
									/>
								</Box>
								<Box w='full'>
									<Text fontSize='20px' fontWeight='500' color='black' mb={0}>
										Электронная почта
									</Text>
									<Text
										fontSize='12px'
										fontWeight='500'
										color='#BBBBBB'
										mt='-2px'
									>
										Основная почта вашего аккаунта
									</Text>
									<Flex w='100%' align='center' gap={4}>
										<Input
											placeholder='Электронная почта'
											borderColor='transparent'
											bg='#F2F3F4'
											color='black'
											fontSize='16px'
											_placeholder={{ opacity: 0.6 }}
											h='40px'
											borderRadius={10}
											fontWeight={500}
											flex={1}
											value={data.email}
											onChange={e =>
												setData({ ...data, email: e.target.value })
											}
										/>

										<Button
											bg='transparent'
											color='#7700FF'
											borderColor='#7700FF'
											borderWidth='2px'
											h='40px'
											fontSize='16px'
											fontWeight='500'
											borderRadius={10}
											_hover={{
												boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)',
											}}
											_focus={{ outline: 'none' }}
											whiteSpace='nowrap'
											transition='all 0.2s ease-in-out'
											cursor='disabled'
											disabled     //кнопка на будущее
										>
											Сменить почту
										</Button>
									</Flex>
								</Box>
								<Box w='100%'>
									<Text fontSize='20px' fontWeight='500' color='black' p='0%'>
										Почта для отправки отчетов
									</Text>
									<Text fontSize='12px' fontWeight='500' color='#BBBBBB' p='0%'>
										Почта, на которую мы будем отправлять Вам отчеты о работе
										устройств
									</Text>
									<Input
										placeholder={'Электронная почта для отправки отчетов'}
										borderColor={'transparent'}
										bg='#F2F3F4'
										color='black'
										fontSize='16px'
										_placeholder={{ opacity: 0.6 }}
										h='40px'
										outlineWidth={1}
										borderRadius={10}
										fontWeight={500}
										value={data.email_report}
										onChange={e =>
											setData({ ...data, email_report: e.target.value })
										}
									/>
								</Box>
								<Box w='100%'>
									<Text fontSize='20px' fontWeight='500' color='black' p='0%'>
										Номер телефона
									</Text>
									<Text fontSize='12px' fontWeight='500' color='#BBBBBB' p='0%'>
										Может понадобится для восстановления доступа к аккаунту
									</Text>
									<Input
										placeholder={'Номер телефона'}
										borderColor={'transparent'}
										bg='#F2F3F4'
										color='black'
										fontSize='16px'
										_placeholder={{ opacity: 0.6 }}
										h='40px'
										outlineWidth={1}
										borderRadius={10}
										fontWeight={500}
										value={data.phone}
										onChange={e => setData({ ...data, phone: e.target.value })}
									/>
								</Box>
								<Box w='100%'>
									<Text fontSize='20px' fontWeight='500' color='black' p='0%'>
										Роль
									</Text>
									<NativeSelect.Root disabled>
										<NativeSelect.Field
											bg='#F2F3F4'
											color='black'
											fontSize='16px'
											borderRadius={10}
											borderColor={'transparent'}
											fontWeight={500}
											value={data.role}
											onChange={e =>
												setData(prev => ({ ...prev, role: e.target.value }))
											}
										>
											<option value='user' className='!bg-[#F2F3F4]'>
												Пользователь
											</option>
											<option value='admin' className='!bg-[#F2F3F4]'>
												Администратор
											</option>
										</NativeSelect.Field>
										<NativeSelect.Indicator />
									</NativeSelect.Root>
								</Box>
								<Box w='100%'>
									<Switch.Root
										checked={showToaster}
										onChange={e =>
											setShowToaster((e.target as HTMLInputElement).checked)
										}
									>
										<Switch.HiddenInput />
										<Switch.Control
											bg='gray.200'
											_checked={{
												bg: '#7700FF',
											}}
											_focus={{
												boxShadow: 'outline',
											}}
											transition='all 0.2s ease-in-out'
										>
											<Switch.Thumb bg='white' />
										</Switch.Control>
										<Switch.Label
											color='black'
											fontSize='20px'
											fontWeight='500'
										>
											Отображать уведомления в интерфейсе
										</Switch.Label>
									</Switch.Root>
									{showToaster && <Toaster />}
								</Box>
								<SimpleGrid templateColumns='repeat(3, 2fr)' gap='4' w='full'>
									<NavLink to='/auth'>
										<Button
											w='full'
											bg='transparent'
											color='#FF4F12'
											borderColor='#FF4F12'
											borderWidth='2px'
											h='40px'
											fontSize='18px'
											fontWeight='500'
											borderRadius={10}
											_hover={{
												boxShadow: '0 0px 15px rgba(255, 79, 18, 0.3)',
											}}
											_focus={{ outline: 'none' }}
											transition='all 0.2s ease-in-out'
											onClick={handleExit}
										>
											<FiLogOut />
											Выйти
										</Button>
									</NavLink>
									<Button
										bg='transparent'
										color='#5A606D'
										borderColor='#5A606D'
										borderWidth='2px'
										h='40px'
										fontSize='18px'
										fontWeight='500'
										borderRadius={10}
										_hover={{ boxShadow: '0 0px 15px rgba(90, 96, 109, 0.3)' }}
										_focus={{ outline: 'none' }}
										transition='all 0.2s ease-in-out'
										onClick={handleReset}
									>
										<FiX />
										Отменить изменения
									</Button>

									<Button
										bg='transparent'
										color='#7700FF'
										borderColor='#7700FF'
										borderWidth='2px'
										h='40px'
										fontSize='18px'
										fontWeight='500'
										borderRadius={10}
										_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)' }}
										_focus={{ outline: 'none' }}
										transition='all 0.2s ease-in-out'
										onClick={handleSave}
									>
										<FiCheck />
										Сохранить изменения
									</Button>
								</SimpleGrid>
							</VStack>
						</GridItem>

						<GridItem
							bg='white'
							borderRadius='15px'
							boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'
							colSpan={2}
						>
							<Notifications />
						</GridItem>
					</SimpleGrid>
				</Box>
			</Flex>
		</Flex>
	)
}

export default Settings
