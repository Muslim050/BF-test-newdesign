import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PublisherTable from '@/components/Dashboard/Publisher/PublihserUtilizer/PublisherTable.jsx'
import PublisherTableUsers from '@/components/Dashboard/Publisher/PublisherUsers/PublisherTableUsers/PublisherTableUsers.jsx'

const PublisherAndUsers = () => {
  return (
    <div className="my-4">
      <Tabs defaultValue="pablisher">
        <TabsList
          className="grid grid-cols-2 w-[300px] h-[48px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
            borderRadius: '8px',
          }}
        >
          <TabsTrigger value="pablisher" className="bg-[#225AB3">
            Паблишеры
          </TabsTrigger>
          <TabsTrigger value="pablisher-users">Пользователи</TabsTrigger>
        </TabsList>
        <TabsContent value="pablisher">
          <PublisherTable />
        </TabsContent>
        <TabsContent value="pablisher-users">
          <PublisherTableUsers />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PublisherAndUsers
