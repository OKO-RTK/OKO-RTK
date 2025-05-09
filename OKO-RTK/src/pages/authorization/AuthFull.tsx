import AuthForm from '../../features/auth/auth'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

function AuthBody() {
	return (
		<div className='bg-[#F4F4F5] min-h-screen'>
			<AuthHeader/>

			<div className='flex flex-col md:flex-row'>
				{/* Левая часть — форма */}
				<div className='w-full md:w-1/2 flex justify-center items-center p-4'>
					<div className='w-full max-w-[614px] h-[703px] flex justify-center items-center border-2 border-red-500'>
						<AuthForm />
					</div>
				</div>

				{/* Правая часть — изображение */}
				<div className='w-full md:w-1/2 flex justify-center items-center p-4'>
					<img
						src='/auth_art.png'
						alt='Арт'
						className='w-full h-auto max-h-[703px] object-contain'
					/>
				</div>
			</div>

			<AuthFooter />
		</div>
	)
}

export default AuthBody
