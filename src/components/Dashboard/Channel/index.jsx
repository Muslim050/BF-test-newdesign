import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import ChannelTable from "@/components/Dashboard/Channel/ChannelUtilizer/ChannelTable.jsx";
import ChannelTableUsers from "@/components/Dashboard/Channel/ChannelUsers/ChannelTableUsers.jsx";

const ChannelAndUsers = () => {
  return (
    <div className='my-4'>
      <Tabs defaultValue="channel" >
      <TabsList className="grid grid-cols-2 w-[300px] h-[48px]">
        <TabsTrigger value="channel" className='bg-[#225AB3'>Каналы
        </TabsTrigger>
        <TabsTrigger value="channel-users">Пользователи</TabsTrigger>
      </TabsList>
      <TabsContent value="channel" >
        <ChannelTable/>

      </TabsContent>
      <TabsContent value="channel-users">
        <ChannelTableUsers/>

      </TabsContent>
    </Tabs>
    </div>
  )
}

export default ChannelAndUsers