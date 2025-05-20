import {
	Box,
	Text,
	VStack,
  Flex,
	Spinner,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import axios from '../../api/axiosInstance'

interface Alert {
	id: number
	created_at: string
	message: string
	message_discript: string
}
import { toaster } from '@/components/ui/toaster'

function Notifications() {
	
  const [alerts,setAlerts] = useState<Alert[]>([])
  const token = localStorage.getItem('token')
	const [showSpinner, setShowSpinner] = useState(true)

  useEffect(()=> {
    if (location.pathname === '/settings'){
      const fetchAlerts = async () => {
				const token = localStorage.getItem('token')
				try {
					const response = await axios.get<Alert[]>(
						'http://84.201.180.84:3000/api/alert',
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'application/json',
							},
						}
					)
					setAlerts(response.data.slice(0, 30))
				} catch (err) {
					toaster.error({
						title: 'Ошибка при загрузке уведомлений ',
						description: '' + err,
						duration: 5000,
					})
				}
			}
			fetchAlerts()
			const interval = setInterval(fetchAlerts, 5000)
			return () => clearInterval(interval)
    }
  },[])

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (alerts.length === 0) {
			timer = setTimeout(() => setShowSpinner(false), 10000)
		} else {
			setShowSpinner(true)
		}
		return () => clearTimeout(timer)
	}, [alerts.length])

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
					{alerts.length === 0 ? (
						<VStack fontSize={22} fontWeight='500'>
							{showSpinner && (
								<Spinner
									size='lg'
									color='#7700FF'
									borderWidth='3px'
									animationDuration='0.7s'
								/>
							)}
							<Text color='#7700FF'>
								{showSpinner
									? 'Загрузка уведомлений...'
									: 'Не удалось получить уведомления'}
							</Text>
						</VStack>
						) : (
						<>
							{alerts.map(alert => {
								const { time, day } = formatDateTime(alert.created_at)
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
												{alert.message}
											</Text>
											<Text fontWeight='400' color='#5A606D'>
												{alert.message_discript}
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
						</>
					)}
				</VStack>
			</Box>
		</VStack>
	)
}
export default Notifications
