import AuthForm from '../../features/auth/auth'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'
function AuthBody() {
  return (
		<div className='flex flex-col min-h-screen bg-[#F4F4F5] overflow-hidden'>
			<AuthHeader />

			<main className='flex flex-1 flex-col md:flex-row'>
				<div className='w-full md:w-1/2 flex justify-center items-center p-4'>
					<div className='w-[75%] h-[600px] flex justify-center items-center border border-red-500'>
						<AuthForm />
					</div>
				</div>

				<div className='w-full md:w-1/2 flex justify-center items-center p-4'>
					<div className='border-red-400'>
						<img
							src='images/auth_art.png'
							alt='Арт'
							className='w-full h-auto max-h-[703px] object-contain'
						/>
					</div>
				</div>
			</main>

			<AuthFooter />
		</div>
	)
}

export default AuthBody
