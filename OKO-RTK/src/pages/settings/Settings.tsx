import Sidebar from '../../components/sidebar/Sidebar'
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
  Button
} from '@chakra-ui/react'
import { FiCheck, FiX, FiLogOut} from 'react-icons/fi'

function Settings() {
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
									/>
								</Box>
								<Box w='100%'>
									<Text fontSize='20px' fontWeight='500' color='black' p='0%'>
										Роль
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
									<Switch.Root>
										<Switch.HiddenInput />
										<Switch.Control
											bg='gray.200'
											_checked={{
												bg: '#7700FF', // Фиолетовый при включении
											}}
											_focus={{
												boxShadow: 'outline',
											}}
											transition='all 0.2s ease-in-out'
										>
											<Switch.Thumb
												bg='white' // Белый кружок
											/>
										</Switch.Control>
										<Switch.Label
											color='black'
											fontSize='20px'
											fontWeight='500'
										>
											Отображать уведомления в интерфейсе
										</Switch.Label>
									</Switch.Root>
								</Box>
								<SimpleGrid templateColumns='repeat(3, 2fr)' gap='4' w='full'>
									<Button
										bg='transparent'
										color='#FF4F12'
										borderColor='#FF4F12'
										borderWidth='2px'
										h='40px'
										fontSize='18px'
										fontWeight='500'
										borderRadius={10}
										_hover={{ boxShadow: '0 0px 15px rgba(255, 79, 18, 0.3)' }}
										_focus={{ outline: 'none' }}
										transition='all 0.2s ease-in-out'
									>
										<FiLogOut />
										Выйти
									</Button>

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
							boxShadow='0 0 15px rgba(0, 0, 0, 0.1)'colSpan={2}>
							<VStack align='flex-start' mx='2.54%' mb='2.54%' spaceY={2}>
								<Box w='100%' mb='-3'>
									<Text fontSize='36px' fontWeight='700' color='black'>
										Уведомления
									</Text>
								</Box>
							</VStack>
						</GridItem>
					</SimpleGrid>
				</Box>
			</Flex>
		</Flex>
	)
}

export default Settings
