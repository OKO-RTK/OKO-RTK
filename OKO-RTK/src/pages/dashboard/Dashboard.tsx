import Sidebar from '../../components/sidebar/Sidebar'
import { Flex, Box, Text, HStack, SegmentGroup, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { FiUpload} from 'react-icons/fi'
import '../../index.css'
function Dashboard() {
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
						<Box bg='red' display='flex' alignItems='center' h='100%'>
							<Text
								color={'black'}
								fontWeight={700}
								fontSize='clamp(16px, 5vh, 40px)'
							>
								Дашборд
							</Text>
						</Box>

						<HStack h='100%'>
							<SegmentGroup.Root defaultValue='React'>
								<SegmentGroup.Indicator />
								<SegmentGroup.Items items={['Общий', 'Детальный']} />
							</SegmentGroup.Root>
							<Dialog.Root>
								<Dialog.Trigger asChild>
									<Box
										display='flex'
										alignItems='center'
										justifyContent='center'
										h='80%'
										boxShadow="0 4px 10px rgba(119, 0, 255, 0.5)"
										borderRadius={10}
										aspectRatio={1}
										_hover={{ bg: '#7700FF' }}
									>
										<FiUpload className='h-[50%] w-[50%] stroke-[1.5]' />
									</Box>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop />
									<Dialog.Positioner>
										<Dialog.Content>
											<Dialog.Header>
												<Dialog.Title>Dialog Title</Dialog.Title>
											</Dialog.Header>
											<Dialog.Body>
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit. Sed do eiusmod tempor incididunt ut labore et
													dolore magna aliqua.
												</p>
											</Dialog.Body>
											<Dialog.Footer>
												<Dialog.ActionTrigger asChild>
													<Button variant='outline'>Cancel</Button>
												</Dialog.ActionTrigger>
												<Button>Save</Button>
											</Dialog.Footer>
											<Dialog.CloseTrigger asChild>
												<CloseButton size='sm' />
											</Dialog.CloseTrigger>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>
						</HStack>
					</HStack>
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

export default Dashboard
