import {
	Box,
	Button,
	Text,
	VStack,
	Image,
	Separator,
	IconButton,
} from '@chakra-ui/react'
import { FiHome, FiList, FiMap, FiLogOut, FiSettings } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import '../../index.css'

function Sidebar(){
  return (
		<Box
			w='4.4vw'
			h='100vh'
			bg='#272F3D'
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
		>
			<VStack gap={0}>
				<Image src='/rtk_logo.png' width='46.875%' mt='15%' mb='15%' />
				<Box w='100%' h='1px' bg='#5A606D' />

				<NavLink
					to='/'
					style={{ display: 'block', width: '100%' }}
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						w='100%'
						aspectRatio={1}
						_hover={{ bg: 'rgba(90, 96, 109, 0.2)' }}
					>
						<FiHome className='w-[50%] h-[50%] stroke-[1.5]' />
					</Box>
				</NavLink>

				<NavLink
					to='/devices_map'
					style={{ display: 'block', width: '100%' }}
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						w='100%'
						aspectRatio={1}
						_hover={{ bg: 'rgba(90, 96, 109, 0.2)' }}
					>
						<FiMap className='w-[40%] h-[40%] stroke-[1.5]' />
					</Box>
				</NavLink>

				<NavLink
					to='/devices'
					style={{ display: 'block', width: '100%' }}
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						w='100%'
						aspectRatio={1}
						_hover={{ bg: 'rgba(90, 96, 109, 0.2)' }}
					>
						<FiList className='w-[50%] h-[50%] stroke-[1.5]' />
					</Box>
				</NavLink>
			</VStack>

			<VStack gap={0}>
				<NavLink
					to='/settings'
					style={{ display: 'block', width: '100%' }}
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						w='100%'
						aspectRatio={1}
						_hover={{ bg: 'rgba(90, 96, 109, 0.2)' }}
					>
						<FiSettings className='w-[50%] h-[50%] stroke-[1.5]' />
					</Box>
				</NavLink>
				<NavLink
					to='/auth'
					style={{ display: 'block', width: '100%' }}
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						w='100%'
						aspectRatio={1}
						_hover={{ bg: 'rgba(90, 96, 109, 0.2)' }}
					>
						<FiLogOut className='w-[50%] h-[50%] stroke-[1.5]' />
					</Box>
				</NavLink>
			</VStack>
		</Box>
	)
}
export default Sidebar