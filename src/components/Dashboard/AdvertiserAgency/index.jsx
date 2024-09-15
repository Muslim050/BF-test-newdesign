import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdvertiserAgencyTable from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUtilizer/AdvertiserAgencyTable.jsx'
import AdvertiserAgencyTableUsers from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/AdvertiserAgencyTableUsers.jsx'
import React from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import { hasRole } from '../../../utils/roleUtils'
import AdvertiserAgencyModalUsers from './AdvertiserAgencyUsers/AdvertiserAgencyModalUsers'
import AdvertiserAgencyModal from './AdvertiserAgencyUtilizer/AdvertiserAgencyModal'

const AdvertiserAgencyAndUsers = () => {
  const [selectedTab, setSelectedTab] = React.useState('advertiser')
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal

  // Модальное окно OrderModal
  const [openUtilizer, setOpenUtilizer] = React.useState(false)
  const handleCloseUtilizer = () => {
    setOpenUtilizer(false)
  }
  // Модальное окно OrderModal
  return (
    <div className="mb-4 mt-2">
      <Tabs defaultValue="advertiser">
        <div className="flex justify-between items-center flex-wrap gap-2">
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
              Рекламное агентство
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setSelectedTab('advertiser-users')}
              value="advertiser-users"
              className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
            >
              Пользователи
            </TabsTrigger>
          </TabsList>
          {selectedTab === 'advertiser' && (
            <div>
              {hasRole('admin') && (
                <div className="flex justify-end ">
                  <Dialog open={openUtilizer} onOpenChange={setOpenUtilizer}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                      >
                        <Plus className="w-5 h-5 mr-2" /> Создать рекламное
                        агентство
                      </Button>
                    </DialogTrigger>
                    {openUtilizer && (
                      <AdvertiserAgencyModal onClose={handleCloseUtilizer} />
                    )}
                  </Dialog>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'advertiser-users' && (
            <div>
              {hasRole('admin') && (
                <div className="flex justify-end ">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                      >
                        <Plus className="w-5 h-5 mr-2" /> Создать пользователя
                      </Button>
                    </DialogTrigger>
                    {open && (
                      <AdvertiserAgencyModalUsers onClose={handleClose} />
                    )}
                  </Dialog>
                </div>
              )}
            </div>
          )}
        </div>

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
