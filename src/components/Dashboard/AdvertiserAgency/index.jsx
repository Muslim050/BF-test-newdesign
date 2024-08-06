import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdvertiserAgencyTable from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUtilizer/AdvertiserAgencyTable.jsx'
import AdvertiserAgencyTableUsers from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/AdvertiserAgencyTableUsers.jsx'

const AdvertiserAgencyAndUsers = () => {
  return (
    <div className="my-4">
      <Tabs defaultValue="advertiser">
        <TabsList
          className="grid grid-cols-2 w-[400px] h-[48px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
            borderRadius: '8px',
          }}
        >
          <TabsTrigger value="advertiser" className="bg-[#225AB3">
            Рекламное агентство
          </TabsTrigger>
          <TabsTrigger value="advertiser-users">Пользователи</TabsTrigger>
        </TabsList>
        <TabsContent value="advertiser">
          <AdvertiserAgencyTable />
        </TabsContent>
        <TabsContent value="advertiser-users">
          <AdvertiserAgencyTableUsers />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdvertiserAgencyAndUsers
