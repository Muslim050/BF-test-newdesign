import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PublisherTableUsersList from './PublisherTableUsersList'
import {
  fetchPublisherUsers,
  selectUsers,
} from '../../../../../redux/publisherUsers/publisherUsersSlice'
import { Plus } from 'lucide-react'
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import style from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTable.module.scss";
import {TableBody, TableHead, TableHeader, TableRow, Table} from "@/components/ui/table.jsx";
import PublisherModalUsers
  from "@/components/Dashboard/Publisher/PublisherUsers/PublisherModalUsers/PublisherModalUsers.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

const headers = [
  { key: 'id', label: '№' },
  { key: 'user_name', label: 'Логин' },
  { key: 'publisher.name', label: 'Паблишер' },
  { key: 'first_name', label: 'Имя' },
  { key: 'last_name', label: 'Фамилия' },
  { key: 'email', label: 'Email' },
  { key: 'side', label: 'Роль' },
  { key: 'phone_number', label: 'Номер' },
]
function PublisherTableUsers() {
  const dispatch = useDispatch()
  const {publisherUsers, status} = useSelector((state) => state.publisherUser)
  const { textColor } = React.useContext(ThemeContext);

  React.useEffect(() => {
    dispatch(fetchPublisherUsers())
  }, [selectUsers])


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
        <div className="tableWrapper">
          <div className="flex justify-end -mt-14">

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  // onClick={handleButtonClick}
                  className="mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
                >
                  <Plus className="w-5 h-5 mr-2" />               Создать пользователя
                </Button>
              </DialogTrigger>
              {open && <PublisherModalUsers onClose={handleClose}
              />}
            </Dialog>
          </div>
          <div className={`border_container rounded-xl p-[3px]  glass-background`}>

            {publisherUsers.length && publisherUsers ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
            >
              <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                <TableRow>
                  {headers.map((row) => {
                    return (
                      <TableHead key={row.key} className={`text-${textColor}`}>
                        {row.label}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>

              <TableBody>
                <PublisherTableUsersList publisherUsers={publisherUsers} />
              </TableBody>
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

export default PublisherTableUsers
