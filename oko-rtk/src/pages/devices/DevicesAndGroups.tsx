import Sidebar from '../../components/sidebar/Sidebar'
import Devices from './Devices'

import {
  Flex,
  Box,
  Text,
  VStack,
  HStack,
  Dialog,
  Button,
  NativeSelect,
  Input,
  CloseButton,
  Portal,
  CheckboxCard,
  CheckboxGroup,
} from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FiServer, FiGlobe, FiMonitor, FiPlus, FiCheck, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'


interface Device {				//информация об устройстве
  device_name: string
  ip_address: string
  device_type: string
  checked_at: string
  status: string
}

function DevicesAndGroups() {

  const [devices, setDevices] = useState<Device[]>([])
  const token = localStorage.getItem('token')

  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

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
      } else alert('Ошибка при формировании массива устройств')
    } catch (err) {
      alert('Ошибка при загрузке уведомлений ' + err)
    }
  }

  const [deviceData, setDeviceData] = useState({
    device_name: '',
    ip_address: '',
    serial_number: '',
    device_type: '',
    device_group: '',
    monitoring_interval: '',
    type_check: '',
  })

  useEffect(() => {
    if (location.pathname === '/devices') {
      fetchDevices()
    }
  }, [])

  const handleCreateDevice = async () => {
    try{
      const token = localStorage.getItem('token');
      await axios.post(
        'http://130.193.56.188:3000/device/add',
        {
          device_name: deviceData.device_name,
          ip_address: deviceData.ip_address,
          serial_number: deviceData.serial_number,
          device_type: deviceData.device_type,
          device_group: deviceData.device_group,
          monitoring_interval: parseInt(deviceData.monitoring_interval),
          type_check: deviceData.device_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      )
    alert('Тип устройства - ' + deviceData.device_type)
    alert('Группа - ' + deviceData.device_group)
    fetchDevices()
  }
    catch (err){
      alert ('Ошибка при добавлении устройства ' + err)
    }
  }


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
    const day = date.toLocaleDateString('ru-RU')
    return { day }
  }


  const items = [																			//массив для реализации выбора метода мониторинга
    { value: 'ping', title: 'Ping' },
    { value: 'snmp', title: 'SNMP' },
    { value: 'check-port', title: 'Проверка порта' },
  ]


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

            <HStack h='100%'>
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

                      {/* Заголовок без крестика */}
                      <Dialog.Header pt='20px' pb='10px'>
                        <Text fontSize='26px' fontWeight='bold'>
                          Добавление нового устройства
                        </Text>
                      </Dialog.Header>

                      <Box
                        overflowY='auto'
                        maxH='calc(80vh - 110px)' // чтобы скролл не съедал футер
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
                            <NativeSelect.Root>
                              <NativeSelect.Field
                                bg='#F2F3F4'
                                color='black'
                                fontSize='16px'
                                borderRadius={10}
                                borderColor={'transparent'}
                                fontWeight={500}
                                cursor='pointer'
                                value={deviceData.device_group}
                                onChange={e =>
                                  setDeviceData(prev => ({
                                    ...prev,
                                    device_group: e.target.value,
                                  }))
                                }
                              >
                                <option
                                  value='group1'
                                  className='!bg-[#F2F3F4]'
                                >
                                  Группа 1
                                </option>
                                <option
                                  value='group2'
                                  className='!bg-[#F2F3F4]'
                                >
                                  Группа 2
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
                              Введите интервал проверки
                            </Text>
                            <Input
                              placeholder={
                                'Целое число, интервал проверки в минутах'
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
                              /* onChange={setSelectedMethods} */
                            >
                              <Flex gap='2'>
                                {items.map(item => (
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
                                    cursor='pointer'
                                    className='text-[#7700FF] transition-all 
                                    bg-white 
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
                                ))}
                              </Flex>
                            </CheckboxGroup>
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
            </HStack>
          </HStack>
        </Box>
        {/* Основной контент */}
        <Devices/>
      </Flex>
    </Flex>
  )
}

export default DevicesAndGroups
