import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PublisherTableUsersList from './ChannelTableUsersList.jsx'
import style from './ChannelTableUsers.module.scss'
import {
  fetchChannelUsers,
  selectUsers,
} from '../../../../redux/channelUsers/channelUsersSlice.js'
import { Plus } from 'lucide-react'
import {TableBody, TableHead, TableRow, TableHeader, Table} from "@/components/ui/table.jsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import ChannelModalUsers from "@/components/Dashboard/Channel/ChannelUsers/ChannelModalUsers.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Логин' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'publisher.name', label: 'Имя' },
  { key: 'email', label: 'Фамилия' },
  { key: 'phone_number', label: 'Email' },
  { key: 'channel_id', label: 'Роль' },
  { key: 'is_connected', label: 'Номер' },
]
function ChannelTableUsers() {
  const dispatch = useDispatch()
  const {channelUsers, status} = useSelector((state) => state.channelUsers)
  const { textColor } = React.useContext(ThemeContext);

  React.useEffect(() => {
    dispatch(fetchChannelUsers())
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
          <div className="flex justify-end ">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="-mt-14 mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
                >
                  <Plus className="w-5 h-5 mr-2" />  Создать пользователя
                </Button>
              </DialogTrigger>
              {open && <ChannelModalUsers onClose={handleClose}
              />}
            </Dialog>
          </div>
          <div className={`border_container rounded-xl p-[3px]  glass-background`}>

            {channelUsers.length ? (
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
                <PublisherTableUsersList channelUsers={channelUsers} />
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

export default ChannelTableUsers
