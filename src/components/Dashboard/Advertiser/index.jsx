import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdvertiserTable from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/index.jsx'
import AdvertiserTableUsers from '@/components/Dashboard/Advertiser/AdvertiserUsers/index.jsx'
import React from 'react'
import { hasRole } from '../../../utils/roleUtils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import AdvertiserModal from './AdvertiserUtilizer/AdvertiserModal'
import AdvertiserModalUsers from './AdvertiserUsers/AdvertiserModalUsers'
import Cookies from 'js-cookie'

const AdvertiserAndUsers = () => {
  const [selectedTab, setSelectedTab] = React.useState('advertiser')
  const user = Cookies.get('role')

  // Модальное окно AdvertiserModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно AdvertiserModal

  // Модальное окно AdvertiserModal
  const [openUsers, setOpenUsers] = React.useState(false)
  const handleCloseUsers = () => {
    setOpenUsers(false)
  }
  // Модальное окно AdvertiserModal
  return (
    <div className="mb-4 mt-2">
      <Tabs defaultValue="advertiser">
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
                onClick={() => setSelectedTab('advertiser')}
                value="advertiser"
                className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
              >
                Рекламодатели
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab('advertiser-users')}
                value="advertiser-users"
                className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
              >
                Пользователи
              </TabsTrigger>
            </TabsList>
          )}
          {selectedTab === 'advertiser' && (
            <div>
              {hasRole('admin') && (
                <div className="flex justify-end ">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                      >
                        <Plus className="w-5 h-5 mr-2" /> Создать рекламодателя
                      </Button>
                    </DialogTrigger>
                    {open && <AdvertiserModal onClose={handleClose} />}
                  </Dialog>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'advertiser-users' && (
            <div>
              {hasRole('admin') && (
                <div className="flex justify-end ">
                  <Dialog open={openUsers} onOpenChange={setOpenUsers}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                      >
                        <Plus className="w-5 h-5 mr-2" /> Создать пользователя
                      </Button>
                    </DialogTrigger>
                    {openUsers && (
                      <AdvertiserModalUsers onClose={handleCloseUsers} />
                    )}
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </div>

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
