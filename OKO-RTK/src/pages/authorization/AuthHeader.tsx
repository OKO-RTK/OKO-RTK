function Header() {
	return (
		<header className='font-[Inter] int text-[22px] overflow-hidden flex-col justify-center items-start px-14 py-5 w-full text-2xl font-bold leading-7 text-gray-900 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.1)] max-md:px-5 max-md:max-w-full'>
			<div className='flex gap-2.5 items-center'>
				<img
					src='https://cdn.builder.io/api/v1/image/assets/TEMP/08ed317819c35661963ce24058ecb33e23bfad6b?placeholderIfAbsent=true&apiKey=f7374e46ea904925bc6fe48a550f93bc'
					alt='ОКО Ростелеком logo'
					className='object-contain shrink-0 self-stretch my-auto aspect-[0.61] w-[34px]'
				/>
				<p className='font-[Inter] text-[22px]'>ОКО<br/>Ростелеком</p>
			</div>
		</header>
	)
}
export default Header
