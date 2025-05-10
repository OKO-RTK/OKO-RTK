import {
	Box,
	Button,
	Text,
	VStack,
	Image,
	Separator,
	IconButton,
} from '@chakra-ui/react'
import { FiHome, FiList, FiMap, FiLogOut } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import '../../index.css'

function Sidebar(){
  return (
		<Box
			w='4.4vw'
			h='100vh'
			bg='#272F3D'
			className='shadow-[0_4px_4px_rgba(0,0,0,0.1)]'
			/* 			px={{ base: 5, md: 14 }}
			py={5} */
		>
			<VStack>
				<Image src='/rtk_logo.png' width='46.875%' mt={'1.8vh'} />
				<Box w='100%' h='1px' bg='#5A606D' my='4' />
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<IconButton aria-label='Home' p={0} size='lg'>
						<FiHome className='!w-[70%] !h-[70%]' />
					</IconButton>
				</NavLink>

				<NavLink
					to='/devices_map'
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<IconButton aria-label='List' p={0} size='lg'>
						<FiMap className='!w-[60%] !h-[60%]' />
					</IconButton>
				</NavLink>

				<NavLink
					to='/devices'
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<IconButton aria-label='List' p={0} size='lg'>
						<FiList className='!w-[70%] !h-[70%]' />
					</IconButton>
				</NavLink>

				<NavLink
					to='/auth'
					className={({ isActive }) =>
						isActive ? 'icon-button active' : 'icon-button'
					}
				>
					<IconButton aria-label='List' p={0} size='lg'>
						<FiLogOut className='!w-[70%] !h-[70%]' />
					</IconButton>
				</NavLink>

			</VStack>
		</Box>
	)
}
export default Sidebar