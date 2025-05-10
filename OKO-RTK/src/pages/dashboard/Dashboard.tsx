import Sidebar from '../../components/sidebar/Sidebar'
import { HStack } from '@chakra-ui/react'
function Dashboard(){
  return (
    <HStack>
      <Sidebar />
      <p>Текст Дашборд</p>
    </HStack>
  )
}
export default Dashboard