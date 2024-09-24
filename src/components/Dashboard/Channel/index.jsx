import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChannelTable from '@/components/Dashboard/Channel/ChannelUtilizer/ChannelTable.jsx'
import ChannelTableUsers from '@/components/Dashboard/Channel/ChannelUsers/ChannelTableUsers.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import ChannelModal from '@/components/Dashboard/Channel/ChannelUtilizer/ChannelModal.jsx'
import React from 'react'
import Cookies from 'js-cookie'
import ChannelModalUsers from '@/components/Dashboard/Channel/ChannelUsers/ChannelModalUsers.jsx'

const ChannelAndUsers = () => {
  const user = Cookies.get('role')

  // Модальное окно ChannelModal
  const [channelModal, setChannelModal] = React.useState(false)
  const handleCloseChannelModal = () => {
    setChannelModal(false)
  }
  // Модальное окно ChannelModal

  // Модальное окно OrderModal
  const [channelModalUser, setChannelModalUser] = React.useState(false)
  const handleCloseModalUser = () => {
    setChannelModalUser(false)
  }
  // Модальное окно OrderModal

  const [selectedTab, setSelectedTab] = React.useState('channel')

  return (
    <div className="mb-4 mt-2">
      <Tabs defaultValue="channel">
        <div className="flex justify-between items-center flex-wrap gap-2">
          {user === 'admin' && (
            <TabsList
              className="grid grid-cols-2 w-[300px] h-auto rounded-[14px] mt-2 border_container"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
              }}
            >
              <TabsTrigger
                onClick={() => setSelectedTab('channel')}
                value="channel"
                className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
              >
                Каналы
              </TabsTrigger>

              <TabsTrigger
                onClick={() => setSelectedTab('channel-users')}
                value="channel-users"
                className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
              >
                Пользователи
              </TabsTrigger>
            </TabsList>
          )}

          {selectedTab === 'channel' && (
            <div className="flex justify-end ">
              {user === 'channel' || user === 'publisher' ? (
                ''
              ) : (
                <Dialog open={channelModal} onOpenChange={setChannelModal}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="  bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                    >
                      <Plus className="w-5 h-5 mr-2" /> Создать канал
                    </Button>
                  </DialogTrigger>
                  {channelModal && (
                    <ChannelModal onClose={handleCloseChannelModal} />
                  )}
                </Dialog>
              )}
            </div>
          )}
          {selectedTab === 'channel-users' && (
            <div className="flex justify-end ">
              <Dialog
                open={channelModalUser}
                onOpenChange={setChannelModalUser}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                  >
                    <Plus className="w-5 h-5 mr-2" /> Создать пользователя
                  </Button>
                </DialogTrigger>
                {channelModalUser && (
                  <ChannelModalUsers onClose={handleCloseModalUser} />
                )}
              </Dialog>
            </div>
          )}
        </div>
        <TabsContent value="channel">
          <ChannelTable />
        </TabsContent>
        <TabsContent value="channel-users">
          <ChannelTableUsers />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ChannelAndUsers
