import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PublisherTableUsersList from './ChannelTableUsersList.jsx'
import style from './ChannelTableUsers.module.scss'
import {
  fetchChannelUsers,
  selectUsers,
} from '../../../../redux/channelUsers/channelUsersSlice.js'
import {
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  Table,
} from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
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
  const { channelUsers, status } = useSelector((state) => state.channelUsers)
  const { textColor } = React.useContext(ThemeContext)

  React.useEffect(() => {
    dispatch(fetchChannelUsers())
  }, [selectUsers])

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
          {channelUsers.length ? (
            <Table
              className={`${style.responsive_table} border_design rounded-lg h-full`}
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
      )}
    </>
  )
}

export default ChannelTableUsers
