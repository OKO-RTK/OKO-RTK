function Footer() {
	return (
		<footer className='overflow-hidden px-14 pt-6 pb-4 mt-20 w-full bg-gray-200 max-md:px-5 max-md:mt-10 max-md:max-w-full'>
			<div className='flex flex-col w-full max-md:max-w-full'>
				<div className='flex gap-2 justify-center items-end self-start'>
					<span className='font text-base font-medium text-neutral-400'>
						Поддержка
					</span>
					<a
						href='tel:88001000800'
						className='text-lg font-[Inter] font-bold italic text-violet-700 hover:underline'
					>
						8 800 100 0 800
					</a>
				</div>

				<div className='flex flex-wrap gap-10 justify-between items-center mt-6 w-full text-base text-zinc-400 max-md:max-w-full'>
					<p className='self-stretch my-auto font-medium w-[652px] max-md:max-w-full'>
						Продолжая пользование сайтом, вы соглашаетесь на обработку файлов{' '}
						<a
							href='#'
							className='underline text-[rgb(150,153,163)] hover:text-zinc-600'
						>
							Cookies
						</a>{' '}
						<br />и других пользовательских данных в соответствии с политикой
						конфиденциальности{' '}
					</p>
					<p className='self-stretch my-auto font-medium w-[183px]'>
						2025 ПАО "Ростелеком"
					</p>
				</div>
			</div>
		</footer>
	)
}
export default Footer