import { Box, Flex, Image, Text } from '@chakra-ui/react'

function Header() {
	return (
		<Box
			as='header'
			w='100vw'
			bg='white'
			className='shadow-[0_4px_4px_rgba(0,0,0,0.1)]'
			px={{ base: 5, md: 14 }}
			py={5}
			h='98px'
		>
			<Flex align='center' gap={4} h='full'>
				<Flex align='center' gap={2.5}>
					<Image
						src='/rtk_logo.png'
						alt='ОКО Ростелеком logo'
						boxSize='56px'
						objectFit='contain'
					/>
					<Text
						fontSize='24px'
						fontWeight='700'
						lineHeight='1.2'
						color='black'
						fontFamily='RostelecomBasis'
					>
						ОКО
						<br />
						Ростелеком
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

export default Header
