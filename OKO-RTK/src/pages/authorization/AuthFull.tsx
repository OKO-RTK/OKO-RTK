import AuthForm from '../../features/auth/auth'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

function AuthBody() {
	return (
		<div className='bg-[#F4F4F5]'>
			<AuthHeader />
			<div className='flex'>
				<div className='flex justify-center items-center border-2 border-green-500 w-1/2'>
					<div className='flex justify-center items-center border-2 border-red-500 w-[614px] h-[703px]'>
						<AuthForm />
					</div>
				</div>

				<div className='flex justify-center items-center border-2 border-green-500 w-1/2 l-0'>
					<div className='border-2 border-red-500 h-full'>
						<img src='/public/auth_art.png'></img>
					</div>
				</div>
			</div>
			<AuthFooter />
		</div>
	)
}

export default AuthBody
