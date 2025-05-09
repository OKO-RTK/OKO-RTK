function Footer() {
	return (
		<footer className='w-screen bg-[#E8E8EE] px-14 py-6 max-h-[135px]'>
			<div className='flex flex-col w-full max-md:max-w-full'>
				<div className='flex gap-2 justify-center items-center self-start'>
					<span
						className='font text-[16px] font-medium text-[#9699A3]'
						style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
					>
						Поддержка
					</span>
					<p
						className='text-[18px] font-[Inter] font-bold text-[#7700FF]'
						style={{ fontFamily: 'RostelecomBasis', fontWeight: 700 }}
					>
						8 800 100 0 800
					</p>
				</div>

				<div className='flex flex-wrap gap-10 justify-between items-center mt-6 w-full text-[16px] text-[#9699A3] max-md:max-w-full'>
					<p className='self-stretch my-auto font-medium w-[652px] max-md:max-w-full'
					style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}>
						Продолжая пользование сайтом, вы соглашаетесь на обработку файлов Cookies
						<br />и других пользовательских данных в соответствии с политикой
						конфиденциальности{' '}
					</p>
					<p
						className='self-stretch my-auto font-medium w-[183px]'
						style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
					>
						2025 ПАО "Ростелеком"
					</p>
				</div>
			</div>
		</footer>
	)
}
export default Footer