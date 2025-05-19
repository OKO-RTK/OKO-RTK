import {
	Box,
	Text,
	VStack,
  Flex,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Notification {
	id: number
	created_at: string
	message: string
	message_discript: string
}
import { toaster } from '@/components/ui/toaster'

function Notifications() {
	
  const [notifications,setNotifications] = useState<Notification[]>([])
  const token = localStorage.getItem('token')

  useEffect(()=> {
    if (location.pathname === '/settings'){
      const fetchNotifications = async () => {
				const token = localStorage.getItem('token')
				try {
					const response = await axios.get<Notification[]>(
						'http://130.193.56.188:3000/alert',
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'application/json',
							},
						}
					)
					setNotifications(response.data.slice(0, 30))
				} catch (err) {
					toaster.error({
						title: 'Ошибка при формировании загрузке уведомлений ',
						description: 'Ошибка ' + err,
						duration: 5000,
					})
				}
			}
			fetchNotifications()
			const interval = setInterval(fetchNotifications, 5000)
			return () => clearInterval(interval)
    }
  },[])

   const formatDateTime = (isoString: string) => {
		const date = new Date(isoString)
		const time = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
		const day = date.toLocaleDateString('ru-RU')
		return { time, day }
	}
 
  return (
		<VStack align='flex-start' mx='2.54%' mb='2.54%' spaceY={2}>
			<Box w='100%' mb='-3'>
				<Text fontSize='36px' fontWeight='700' color='black'>
					Уведомления
				</Text>
			</Box>
			<Box
				maxH='600px'
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
				<VStack>
					{notifications.map(notification => {
						const { time, day } = formatDateTime(notification.created_at)
						return (
							<Flex
								bg='#F4F4F5'
								w='full'
								h='60px'
								px={3}
								borderRadius='10px'
								alignItems='center'
								justifyContent='space-between'
								fontSize='16px'
							>
								<Box>
									<Text fontWeight='500' color='black'>
										{notification.message}
									</Text>
									<Text fontWeight='400' color='#5A606D'>
										{notification.message_discript}
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
	)
}
export default Notifications
