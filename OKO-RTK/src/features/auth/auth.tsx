import { Box, Button, Input, Text, VStack, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import {useNavigate} from 'react-router-dom'
const CustomTabs = () => {
	const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')
	const [isRegistering, setIsRegistering] = useState(false)

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleLogin = async () => {
		setLoading(true)

		const payload = { login, password }
		console.log('Check payload:', payload)

		try {
			const endpoint =
				activeTab === 'user'
					? 'http://130.193.56.188:3000/login'
					: 'http://130.193.56.188:3000/login/admin'

			const response = await axios.post(endpoint, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			console.log('Login success:', response.data)
			alert('Ваш токен: ' + response.data.access_token)
			localStorage.setItem('token', response.data.access_token)
			navigate('/')
		} catch (error) {
			const err = error as AxiosError<{ message?: string }>

			if (err.response) {
				alert(
					`Ошибка входа: ${
						err.response.data?.message || err.response.statusText
					}`
				)
			} else {
				alert('Ошибка входа: Сервер недоступен или нет ответа')
			}
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async () => {
		setLoading(true)

		if (password !== confirmPassword) {
			alert('Пароли не совпадают')
			setLoading(false)
			return
		}

		const payload = { login, password }
		console.log('Register payload:', payload)

		try {
			const endpoint =
				activeTab === 'user'
					? 'http://130.193.56.188:3000/register'
					: 'http://130.193.56.188:3000/register/admin'

			const response = await axios.post(endpoint, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			alert('Регистрация прошла успешно! Теперь вы можете войти.')
			console.log('Register success:', response.data)
			setIsRegistering(false)
		} catch (error) {
			const err = error as AxiosError<{ message?: string }>

			if (err.response) {
				alert(
					`Ошибка регистрации: ${
						err.response.data?.message || err.response.statusText
					}`
				)
			} else {
				alert('Ошибка регистрации: Сервер недоступен или нет ответа')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box
			className='h-[99%] shadow-[0_0px_15px_rgba(0,0,0,0.1)]'
			p={8}
			spaceY={6}
			w='full'
			h='full'
			rounded='15'
			bg='white'
			fontFamily='RostelecomBasis'
			borderRadius={15}
		>
			<Text color='black' fontSize='34px' fontWeight='700' mb={-4}>
				{isRegistering ? 'Регистрация' : 'Авторизация'}
			</Text>

			<Text fontSize='24px' fontWeight={400} color='black'>
				{isRegistering
					? 'Заполните данные для регистрации'
					: 'Укажите номер телефона, email или логин, а также введите Ваш пароль'}
			</Text>

			{!isRegistering && (
				<HStack mb={6}>
					<Button
						flex={1}
						bg={activeTab === 'user' ? '#7700FF' : '#F7F0FF'}
						color={activeTab === 'user' ? 'white' : '#7700FF'}
						onClick={() => setActiveTab('user')}
						_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)' }}
						fontWeight='500'
						fontSize='22px'
						h='48px'
						borderRadius={10}
						_focus={{ outline: 'none' }}
						transition='all 0.2s ease-in-out'
					>
						Пользователь
					</Button>
					<Button
						flex={1}
						bg={activeTab === 'admin' ? '#7700FF' : '#F7F0FF'}
						color={activeTab === 'admin' ? 'white' : '#7700FF'}
						onClick={() => setActiveTab('admin')}
						_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)' }}
						fontWeight='500'
						fontSize='22px'
						h='48px'
						borderRadius={10}
						_focus={{ outline: 'none' }}
						transition='all 0.2s ease-in-out'
					>
						Админ
					</Button>
				</HStack>
			)}

			<VStack spaceY={4}>
				<Input
					placeholder={
						isRegistering ? 'Введите логин' : 'Телефон, почта или логин'
					}
					borderColor={'transparent'}
					bg='#F2F3F4'
					color='black'
					fontSize='22px'
					_placeholder={{ opacity: 0.6 }}
					h='68px'
					outlineWidth={1}
					borderRadius={10}
					fontWeight={500}
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
				<Input
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					type='password'
					borderColor={'transparent'}
					bg='#F2F3F4'
					color='black'
					fontSize='22px'
					_placeholder={{ opacity: 0.6 }}
					h='68px'
					outlineWidth={1}
					borderRadius={10}
					fontWeight={500}
				/>
				{isRegistering && (
					<Input
						placeholder='Подтвердите пароль'
						type='password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						borderColor={'transparent'}
						bg='#F2F3F4'
						color='black'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						outlineWidth={1}
						borderRadius={10}
						fontWeight={500}
					/>
				)}
				<Button
					bg='#7700FF'
					color='white'
					w='full'
					h='68px'
					fontSize='22px'
					borderRadius={10}
					_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.4)' }}
					_focus={{ outline: 'none' }}
					onClick={isRegistering ? handleRegister : handleLogin}
					loading={loading}
					transition='all 0.2s ease-in-out'
				>
					{isRegistering ? 'Зарегистрироваться' : 'Войти'}
				</Button>
				<Text fontWeight={500} fontSize={22} color='black' mb={-10}>
					{isRegistering ? (
						<>
							Уже есть аккаунт?{' '}
							<Box
								as='span'
								color='#7700FF'
								cursor='pointer'
								fontWeight={500}
								fontSize={22}
								onClick={() => setIsRegistering(false)}
							>
								Войти
							</Box>
						</>
					) : (
						<>
							Нет аккаунта?{' '}
							<Box
								as='span'
								color='#7700FF'
								cursor='pointer'
								fontWeight={500}
								fontSize={22}
								onClick={() => setIsRegistering(true)}
							>
								Зарегистрироваться
							</Box>
						</>
					)}
				</Text>
			</VStack>
		</Box>
	)
}

export default CustomTabs
