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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Tabs defaultValue="user" className="w-[400px]">
        {/* Общий список вкладок */}
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger
            value="user"
            className="data-[state=active]:!bg-[#7700FF] data-[state=active]:text-white !bg-[#F7F0FF] text-[#7700FF]"
          >
            Пользователь
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="data-[state=active]:!bg-[#7700FF] data-[state=active]:text-white !bg-[#F7F0FF] text-[#7700FF]"
          >
            Админ
          </TabsTrigger>
        </TabsList>

        {/* Пользователь */}
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>Авторизация по паролю</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                id="user-login"
                placeholder="Телефон или почта"
                className="placeholder:opacity-60"
              />
              <Input
                id="user-password"
                placeholder="Пароль"
                type="password"
                className="placeholder:opacity-60"
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full !bg-[#7700FF]">Войти</Button>
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger
                  value="inter-password"
                  className="!bg-[#F7F0FF] text-[#7700FF] data-[state=active]:!bg-[#7700FF] data-[state=active]:text-white"
                >
                  Войти с помощью кода
                </TabsTrigger>
              </TabsList>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Админ */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Смена пароля</CardTitle>
              <CardDescription>
                Укажите текущий и новый пароль. После сохранения произойдёт выход.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Текущий пароль</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Новый пароль</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Сохранить</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Вход по коду */}
        <TabsContent value="inter-password">
          <Card>
            <CardHeader>
              <CardTitle>Авторизация по коду</CardTitle>
              <CardDescription>
                Укажите номер телефона, email или логин, и мы вышлем вам код подтверждения
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                id="code-login"
                placeholder="Телефон или почта"
                className="placeholder:opacity-60"
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full !bg-[#7700FF]">Получить код</Button>
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger
                  value="user"
                  className="!bg-[#F7F0FF] text-[#7700FF] data-[state=active]:bg-[#7700FF] data-[state=active]:text-white"
                >
                  Войти с помощью пароля
                </TabsTrigger>
              </TabsList>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsDemo;
