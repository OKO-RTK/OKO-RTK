import { Box, Flex, Text, Stack } from '@chakra-ui/react'
function Footer() {
	return (
		<Box
			as='footer'
			w='100vw'
			bg='#E8E8EE'
			px={{ base: 5, md: 14 }}
			py={6}
			maxH='135px'
		>
			<Stack w='full'>
				<Flex gap={2} align='center' justify='flex-start'>
					<Text
						fontSize='16px'
						fontWeight={500}
						color='#9699A3'
						fontFamily='RostelecomBasis'
					>
						Поддержка
					</Text>
					<Text
						fontSize='18px'
						fontWeight='bold'
						color='#7700FF'
						fontFamily='RostelecomBasis'
					>
						8 800 100 0 800
					</Text>
				</Flex>

				<Flex
					flexWrap='wrap'
					justify='space-between'
					align='center'
					w='full'
					color='#9699A3'
					fontSize='16px'
				>
					<Text
						w={{ base: '100%', md: '652px' }}
						fontWeight={500}
						fontFamily='RostelecomBasis'
					>
						Продолжая пользование сайтом, вы соглашаетесь на обработку файлов
						Cookies
						<br />и других пользовательских данных в соответствии с политикой
						конфиденциальности
					</Text>
					<Text
						w={{ base: '100%', md: '183px' }}
						fontWeight={500}
						fontFamily='RostelecomBasis'
						textAlign={{ base: 'left', md: 'right' }}
					>
						2025 "ОКО РТК"
					</Text>
				</Flex>
			</Stack>
		</Box>
	)
}
export default Footer
