import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
		<Tabs defaultValue='account' className='w-[400px]'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger className='text-[#FFFFFF] !bg-[#7700FF]' value='user'>
					Пользователь
				</TabsTrigger>
				<TabsTrigger value='admin'>Админ</TabsTrigger>
				<TabsTrigger value='inter-message'>Войти с помощью кода</TabsTrigger>
			</TabsList>
			<TabsContent value='user'>
				<Card>
					<CardHeader>
						<CardTitle>Авторизация по паролю</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Input
								id='name'
								placeholder='Телефон или почта'
								className='placeholder:opacity-60'
							/>
						</div>
						<div className='space-y-1'>
							<Input
								id='password'
								placeholder='Пароль'
								className='placeholder:opacity-60'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Войти</Button>
						<TabsList className='grid w-full grid-cols-1'>
							<TabsTrigger value='inter-password'>
								Войти с помощью кода
							</TabsTrigger>
						</TabsList>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value='admin'>
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='current'>Current password</Label>
							<Input id='current' type='password' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='new'>New password</Label>
							<Input id='new' type='password' />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>

			<TabsContent value='inter-password'>
				<Card>
					<CardHeader>
						<CardTitle>Авторизация по коду</CardTitle>
						<CardDescription>
							Укажите номер телефона, email или логин, и мы вышлем вам код
							подтверждения
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Input id='name' />
						</div>
					</CardContent>
					<CardFooter>
						<Button>Войти</Button>
						<TabsList className='grid w-full grid-cols-1'>
							<TabsTrigger value='user'>Войти с помощью пароля</TabsTrigger>
						</TabsList>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}
export default TabsDemo