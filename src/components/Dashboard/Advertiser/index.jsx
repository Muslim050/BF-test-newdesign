import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdvertiserTable from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/index.jsx'
import AdvertiserTableUsers from '@/components/Dashboard/Advertiser/AdvertiserUsers/index.jsx'

const AdvertiserAndUsers = () => {
  return (
    <div className="my-4">
      <Tabs defaultValue="advertiser">
        <TabsList
          className="grid grid-cols-2 w-[300px] h-[48px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
            borderRadius: '8px',
          }}
        >
          <TabsTrigger value="advertiser" className="bg-[#225AB3">
            Рекламодатели
          </TabsTrigger>
          <TabsTrigger value="advertiser-users">Пользователи</TabsTrigger>
        </TabsList>
        <TabsContent value="advertiser">
          <AdvertiserTable />
        </TabsContent>
        <TabsContent value="advertiser-users">
          <AdvertiserTableUsers />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdvertiserAndUsers
