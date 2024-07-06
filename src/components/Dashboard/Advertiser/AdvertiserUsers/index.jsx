import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus } from 'lucide-react'
import AdvertiserTableUsersData from './AdvertiserTableUsersData.jsx'
import { fetchAdvertiserUsers } from '@/redux/advertiserUsers/advertiserUsersSlice.js'
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table.jsx'
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import AdvertiserModalUsers
  from "@/components/Dashboard/Advertiser/AdvertiserUsers/AdvertiserModalUsers.jsx";
import style from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTable.module.scss";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import {hasRole} from "@/utils/roleUtils.js";

const headers = [
  { key: 'id', label: '№' },
  { key: 'user_name', label: 'Username' },
  { key: 'advertiser.name', label: 'Рекламодатель' },
  { key: 'first_name', label: 'Имя' },
  { key: 'last_name', label: 'Фамилия' },
  { key: 'email', label: 'Email' },
  { key: 'side', label: 'Роль' },
  { key: 'phone_number', label: 'Номер' },
]

function AdvertiserTableUsers() {
  const dispatch = useDispatch()
  const {advertiserUsers, status} = useSelector((state) => state.advertiserUsers)

  React.useEffect(() => {
    dispatch(fetchAdvertiserUsers())
  }, [dispatch])

  const { textColor } = React.useContext(ThemeContext);

  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal
  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
            {hasRole('admin') && (
              <div className="flex justify-end -mt-14">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
                    >
                      <Plus className="w-5 h-5 mr-2"/> Создать пользователя
                    </Button>
                  </DialogTrigger>
                  {open && <AdvertiserModalUsers onClose={handleClose}
                  />}
                </Dialog>
              </div>
            )}
          <div className={`border_container rounded-xl p-[3px]  glass-background`}>
            {advertiserUsers.length ? (
              <Table className={`${style.responsive_table} border_design rounded-lg overflow-auto`}>
                <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                  <TableRow>
                    {headers.map ((row) => {
                      return (
                        <TableHead key={row.key} className={`text-${textColor}`}>
                          {row.label}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                </TableHeader>
                <AdvertiserTableUsersData advertiserUsers={advertiserUsers}/>
              </Table>
            ) : (
              <div className="empty_list">
                Список пустой. Добавьте Пользователя!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdvertiserTableUsers
