import { Box, Button, Input, Text, VStack, HStack } from '@chakra-ui/react'
import { useState } from 'react'

const CustomTabs = () => {
	const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')

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
			<Text color='black' fontSize='34px' fontWeight='700' mb={4}>
				Авторизация
			</Text>

			<Text fontSize='24px' mb={6} fontWeight={400} color='black'>
				Укажите номер телефона, email или логин, а также введите Ваш пароль
			</Text>

			{/* Табы */}
			<HStack mb={6}>
				<Button
					flex={1}
					bg={activeTab === 'user' ? '#7700FF' : '#F7F0FF'}
					color={activeTab === 'user' ? 'white' : '#7700FF'}
					onClick={() => setActiveTab('user')}
					_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)' }}
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
					onClick={() => setActiveTab('admin')}
					_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.3)' }}
					fontWeight='500'
					fontSize='18px'
					h='48px'
					borderRadius={10}
				>
					Админ
				</Button>
			</HStack>

			{/* Контент табов */}
			{activeTab === 'user' && (
				<VStack spaceY={4}>
					<Input
						placeholder='Телефон, почта или логин'
						borderColor={'transparent'}
						bg='#F2F3F4'
						color='black'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						outlineWidth={1}
						borderRadius={10}
					/>
					<Input
						placeholder='Пароль'
						type='password'
						borderColor={'transparent'}
						bg='#F2F3F4'
						color='black'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						outlineWidth={1}
						borderRadius={10}
					/>
					<Button
						bg='#7700FF'
						color='white'
						w='full'
						h='68px'
						fontSize='22px'
						borderRadius={10}
						_hover={{ boxShadow: '0 0px 15px rgba(119, 0, 255, 0.4)' }}
					>
						Войти
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

			{activeTab === 'admin' && (
				<VStack spaceY={4}>
					<Input
						placeholder='Admin Login'
						type='email'
						borderColor={'transparent'}
						bg='#F2F3F4'
						color='black'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						outlineWidth={1}
						borderRadius={10}
					/>
					<Input
						placeholder='Пароль'
						type='password'
						borderColor={'transparent'}
						bg='#F2F3F4'
						color='black'
						fontSize='22px'
						_placeholder={{ opacity: 0.6 }}
						h='68px'
						outlineWidth={1}
						borderRadius={10}
					/>
					<Button
						bg='#7700FF'
						color='white'
						w='full'
						h='68px'
						fontSize='22px'
						borderRadius={10}
					>
						Войти
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
		</Box>
	)
}
export default CustomTabs