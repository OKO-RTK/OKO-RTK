function Header() {
	return (
		<header className='w-screen bg-white shadow px-14 py-5 flex items-center gap-4 max-h-[98px] font-[22px] font-[Inter] font-bold'> 
			<div className='flex gap-2.5 items-center'>
				<img
					src='https://cdn.builder.io/api/v1/image/assets/TEMP/08ed317819c35661963ce24058ecb33e23bfad6b?placeholderIfAbsent=true&apiKey=f7374e46ea904925bc6fe48a550f93bc'
					alt='ОКО Ростелеком logo'
					className='object-contain shrink-0 self-stretch my-auto aspect-[0.61] w-[34px]'
				/>
				<p className='font-[Inter] text-[22px]'>
					ОКО
					<br/>
					Ростелеком
				</p>
			</div>
		</header>
	)
}
export default Header
