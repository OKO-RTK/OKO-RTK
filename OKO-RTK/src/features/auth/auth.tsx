import { Box, Button, Input, Text, VStack, HStack } from '@chakra-ui/react'
import { useState } from 'react'

const CustomTabs = () => {
	const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')
	const [isPasswordLogin, setIsPasswordLogin] = useState(false)

	return (
		<Box
			className='shadow-[0_0px_15px_rgba(0,0,0,0.1)]'
			p={8}
			spaceY={6}
			rounded='2xl'
			bg='white'
			fontFamily='RostelecomBasis'
			borderRadius={15}
		>
			{/* Контент табов */}
			{!isPasswordLogin && activeTab === 'user' && (
				<VStack spaceY={4}>
					<Text color='black' fontSize='34px' fontWeight='700' mb={4}>
				Авторизация по коду
			</Text>
			<Text fontSize='24px' mb={6} fontWeight={400} color='black'>
				Укажите номер телефона, email или логин, и мы вышлем вам код
				подтверждения
			</Text>
			<HStack mb={6}>
				<Button
					flex={1}
					bg={activeTab === 'user' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'user' ? 'white' : '#7700FF'}
					onClick={() => {
						setActiveTab('user')
						setIsPasswordLogin(false)
					}}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Пользователь
				</Button>
				<Button
					flex={1}
					bg={activeTab === 'admin' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'admin' ? 'white' : '#7700FF'}
					onClick={() => {
						setActiveTab('admin')
						setIsPasswordLogin(false)
					}}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Админ
				</Button>
			</HStack>
					<Input
						placeholder='Телефон, почта или логин'
						borderColor={'transparent'}
						bg='#F2F3F4'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						borderRadius={10}
					/>
					<Button bg='#7700FF' color='white' w='full' h='68px' fontSize={22}>
						Получить код
					</Button>
					<Button
						variant='ghost'
						color='#7700FF'
						bg='#F7F0FF'
						w='full'
						h='68px'
						fontWeight='500'
						fontSize='22px'
						onClick={() => setIsPasswordLogin(true)}
					>
						Войти по паролю
					</Button>
					<Text fontWeight={500} fontSize={22} color='black'>
						Нет аккаунта?{' '}
						<Box
							as='span'
							color='#7700FF'
							cursor='pointer'
							fontWeight={500}
							fontSize={22}
						>
							Зарегистрироваться
						</Box>
					</Text>
				</VStack>
			)}

			{isPasswordLogin && activeTab === 'user' && (
				<VStack spaceY={4}>
					<Text color='black' fontSize='34px' fontWeight='700' mb={4}>
				Авторизация по паролю
			</Text>
			<Text fontSize='24px' mb={6} fontWeight={400} color='black'>
				Укажите номер email или логин, и пароль от вашего аккаунта
				
			</Text>
			<HStack mb={6}>
				<Button
					flex={1}
					bg={activeTab === 'user' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'user' ? 'white' : '#7700FF'}
					onClick={() => {
						setActiveTab('user')
						setIsPasswordLogin(false)
					}}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Пользователь
				</Button>
				<Button
					flex={1}
					bg={activeTab === 'admin' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'admin' ? 'white' : '#7700FF'}
					onClick={() => {
						setActiveTab('admin')
						setIsPasswordLogin(false)
					}}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Админ
				</Button>
			</HStack>
					<Input
						placeholder='Логин или email'
						borderColor={'transparent'}
						bg='#F2F3F4'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						borderRadius={10}
					/>
					<Input
						placeholder='Пароль'
						type='password'
						borderColor={'transparent'}
						bg='#F2F3F4'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						borderRadius={10}
					/>
					<Button bg='#7700FF' color='white' w='full' h='68px' fontSize={22}>
						Войти
					</Button>
					<Button
						variant='ghost'
						color='#7700FF'
						bg='#F7F0FF'
						w='full'
						h='68px'
						fontWeight='500'
						fontSize='22px'
						onClick={() => setIsPasswordLogin(false)}
					>
						Назад
					</Button><Text fontWeight={500} fontSize={22} color='black'>
						Нет аккаунта?{' '}
						<Box
							as='span'
							color='#7700FF'
							cursor='pointer'
							fontWeight={500}
							fontSize={22}
						>
							Зарегистрироваться
						</Box>
					</Text>
				</VStack>
			)}

			{activeTab === 'admin' && (
				
				<VStack>
					<HStack mb={6}>
				<Button
					flex={1}
					bg={activeTab === 'user' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'user' ? 'white' : '#7700FF'}
					onClick={() => {
						setActiveTab('user')
						setIsPasswordLogin(false)
					}}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Пользователь
				</Button>
				<Button
					flex={1}
					bg={activeTab === 'admin' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'admin' ? 'white' : '#7700FF'}
					onClick={() => {
						setActiveTab('admin')
						setIsPasswordLogin(false)
					}}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Админ
				</Button>
			</HStack>
					<Input placeholder='Admin login' h='68px' bg='#F2F3F4' />
					<Input placeholder='Пароль' h='68px' bg='#F2F3F4' type='password' />
					<Button bg='#7700FF' color='white' w='full' h='60px' fontSize='20px'>
						Войти
					</Button>
				</VStack>
			)}
		</Box>
	)
}

export default CustomTabs
