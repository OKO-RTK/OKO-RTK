import { Box, Button, Input, Text, VStack, HStack } from '@chakra-ui/react'
import { useState } from 'react'

const CustomTabs = () => {
	const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')

	return (
		<Box
			maxH='703px'
			p={8}
			spaceY = {6}
			rounded='2xl'
			bg='white'
			boxShadow='md'
			fontFamily='RostelecomBasis'
			
		>
			<p className='text-black !text-[32px]'>Авторизация по коду</p>

			<Text fontSize='md' mb={6} color='gray.700'>
				Укажите номер телефона, email или логин, и мы вышлем вам код
				подтверждения
			</Text>

			{/* Табы */}
			<HStack mb={6}>
				<Button
					flex={1}
					bg={activeTab === 'user' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'user' ? 'white' : '#7700FF'}
					onClick={() => setActiveTab('user')}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
				>
					Пользователь
				</Button>
				<Button
					flex={1}
					bg={activeTab === 'admin' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'admin' ? 'white' : '#7700FF'}
					onClick={() => setActiveTab('admin')}
					_hover={{ bg: '#7700FF', color: 'white' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
				>
					Админ
				</Button>
			</HStack>

			{/* Контент табов */}
			{activeTab === 'user' && (
				<VStack>
					<Input
						placeholder='Телефон, почта или логин'
						bg='#F2F3F4'
						fontSize='18px'
						_placeholder={{ opacity: 0.6 }}
						h='52px'
					/>
					<Button bg='#7700FF' color='white' w='full' h='60px' fontSize='20px'>
						Получить код
					</Button>
					<Button
						variant='ghost'
						color='#7700FF'
						bg='#F7F0FF'
						w='full'
						h='60px'
						fontWeight='500'
						fontSize='20px'
					>
						Войти по паролю
					</Button>
					<Text fontSize='16px' color='black'>
						Нет аккаунта?{' '}
						<Box as='span' color='#7700FF' cursor='pointer'>
							Зарегистрироваться
						</Box>
					</Text>
				</VStack>
			)}

			{activeTab === 'admin' && (
				<VStack>
					<Input placeholder='Admin login' h='52px' bg='#F2F3F4' />
					<Input placeholder='Пароль' h='52px' bg='#F2F3F4' type='password' />
					<Button bg='#7700FF' color='white' w='full' h='60px' fontSize='20px'>
						Войти
					</Button>
				</VStack>
			)}
		</Box>
	)
}

export default CustomTabs
