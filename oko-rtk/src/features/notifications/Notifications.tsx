import {
	Box,
	Text,
	VStack,
  Flex,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import axios from 'axios'

function Notifications() {
	return (
		<VStack align='flex-start' mx='2.54%' mb='2.54%' spaceY={2}>
			<Box w='100%' mb='-3'>
				<Text fontSize='36px' fontWeight='700' color='black'>
					Уведомления
				</Text>
			</Box>
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
						Изменение статуса устройства “Сервер ХХХХ”
					</Text>
					<Text fontWeight='400' color='#5A606D'>
						Новый статус: критическое состояние
					</Text>
				</Box>
				<Box textAlign='right'>
					<Text fontWeight='400' color='#5A606D'>
						13:53
					</Text>
					<Text fontWeight='400' color='#5A606D'>
						06.05.2025
					</Text>
				</Box>
			</Flex>
		</VStack>
	)
}
export default Notifications
