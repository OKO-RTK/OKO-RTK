import Sidebar from '../../components/sidebar/Sidebar'
import { Flex, Box, Text } from '@chakra-ui/react'

function DevicesMap() {
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
							Карта устройств
						</Text>
					</Box>
				</Box>
				{/* Основной контент */}
				<Box
					as='main'
					flex='1'
					bg='#F4F4F5'
					px={{ base: 5, md: 14 }}
					py={6}
					overflowY='auto'
				>
					<Box bg='white' p={6} borderRadius='xl' minH='300px'>
						<Text fontSize='xl' fontWeight='bold'>
							Основной контент
						</Text>
					</Box>
				</Box>
			</Flex>
		</Flex>
	)
}

export default DevicesMap
