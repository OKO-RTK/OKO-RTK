import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Tabs
        defaultValue='user'
        className='w-full h-full'
      >
        {/* Пользователь */}
        <TabsContent value='user' className='w-full h-full'>
          <Card className='w-full h-full flex flex-col rounded-2xl p-10 space-y-6'>
            <CardHeader className="space-y-4">
              <CardTitle className="text-[34px] text-center" style={{ fontFamily: 'RostelecomBasis', fontWeight: 700 }}>Авторизация по паролю</CardTitle>
            </CardHeader>

            <CardContent className='space-y-7 mb-12' style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}> {/* Увеличено расстояние и добавлен отступ */}
              {/* Переключатель ВНУТРИ формы */}
              <TabsList className='grid w-full !bg-transparent grid-cols-2 gap-x-6'>
              <TabsTrigger
                value='user'
                className='data-[state=active]:!bg-[#7700FF] data-[state=active]:text-white !bg-[#F7F0FF] text-[#7700FF]'
                
              >
                <div className="text-[18px]">Пользователь</div>
              </TabsTrigger>
              <TabsTrigger
                value='admin'
                className='data-[state=active]:!bg-[#7700FF] data-[state=active]:text-white !bg-[#F7F0FF] text-[#7700FF]'
              >
                <div className="text-[18px]">Админ</div>
              </TabsTrigger>
              </TabsList>

              <Input
              id='user-login'
              placeholder='Телефон или почта'
              className='placeholder:opacity-60 !bg-[#F2F3F4] h-[33%] text-[18px]'
              />
              <Input
              id='user-password'
              placeholder='Пароль'
              type='password'
              className='placeholder:opacity-60 !bg-[#F2F3F4] h-[33%] text-[18px]'
              />
            </CardContent>

            <CardFooter className='flex flex-col space-y-9'> {/* Увеличено расстояние */}
              <Button className='w-full !bg-[#7700FF]  h-[68px] ' 
                      style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
              >
                <div className="text-[20px]">Войти</div>
              </Button>
              <TabsList className='w-full !bg-transparent'>
                <TabsTrigger
                  value='inter-password'
                  className='!bg-[#F7F0FF] text-[#7700FF]  w-full h-[68px] data-[state=active]:!bg-[#7700FF] data-[state=active]:text-white'
                  style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
                >
                  <div className="text-[20px]">Войти с помощью кода</div>
                </TabsTrigger>
              </TabsList>
            </CardFooter>
          </Card>
        </TabsContent>

				{/* Вход по коду */}
				<TabsContent value='inter-password' className='w-full h-full'>
					<Card className='w-full h-full flex justify-center items-center'>
						<div className='w-[405px] h-[541px] space-y-7 mb-12'>
							<CardHeader className=''>
								<CardTitle
									className='text-[#000000] text-[34px]'
									style={{ fontFamily: 'RostelecomBasis', fontWeight: 700 }}
								>
									Авторизация по коду
								</CardTitle>
								<CardDescription
									className='text-[#000000] text-[24px]'
									style={{ fontFamily: 'RostelecomBasis', fontWeight: 400 }}
								>
									Укажите номер телефона, email или логин, и мы вышлем вам код
									подтверждения
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<Input
									id='code-login'
									placeholder='Телефон или почта'
									className='w-[405px] h-[68px] text-[#000000] placeholder:opacity-60'
									style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
								/>
							</CardContent>
							<CardFooter className='flex flex-col space-y-2 '>
								<Button
									className='w-[405px] h-[68px] text-[22px] !bg-[#7700FF]'
									style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
								>
									Получить код
								</Button>
								<TabsList className='grid w-full !bg-transparent'>
									<TabsTrigger
										value='user'
										className='w-[405px] h-[68px] !bg-[#F7F0FF] text-[22px] text-[#7700FF] data-[state=active]:bg-[#7700FF] data-[state=active]:text-white'
										style={{ fontFamily: 'RostelecomBasis', fontWeight: 500 }}
									>
										Войти по паролю
									</TabsTrigger>
								</TabsList>
							</CardFooter>
						</div>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default TabsDemo;
