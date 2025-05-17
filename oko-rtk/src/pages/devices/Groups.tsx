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

interface Group {
  group_id: string
  group_name: string
  group_created_at: string
  num_of_devices: string
}

function Groups() {

  const [groups, setGroups] = useState<Group[]>([])

  const fetchDevices = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get<{ groups: Group[] }>(
				'http://130.193.56.188:3000/group',
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
      const groupsArr = response.data.groups
      if (Array.isArray(groupsArr)) {
				setGroups(groupsArr.slice(0, 30))
			} else alert('Ошибка при формировании массива групп')
    } catch (err) {
      alert('Ошибка при загрузке списка групп ' + err)
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
            {groups.map(group => {
              const { day, time } = formatDate(group.group_created_at)
              return (
								<Dialog.Root>
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
										>
											<HStack>
												{' '}
												<Text fontSize='30px' fontWeight='500' color='black'>
													{group.group_name}
												</Text>
											</HStack>
											<Box textAlign='right'>
												<Text fontSize='20px' fontWeight='400' color='#5A606D'>
													Создана: {day} - {time}
												</Text>
												<Text fontSize='20px' fontWeight='400' color='#5A606D'>
													Количество устройств: {group.num_of_devices}
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
																Название группы
															</Text>
															<Input
																placeholder={'Название вашей группы'}
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
															/>
														</Box>
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

export default Groups
