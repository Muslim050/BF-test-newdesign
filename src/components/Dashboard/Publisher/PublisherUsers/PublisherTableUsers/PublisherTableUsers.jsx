import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PublisherTableUsersList from './PublisherTableUsersList'
import {
  fetchPublisherUsers,
  selectUsers,
} from '../../../../../redux/publisherUsers/publisherUsersSlice'
import style from './PublisherTableUsers.module.scss'
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";

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
  const { publisherUsers, status } = useSelector((state) => state.publisherUser)
  const { textColor } = React.useContext(ThemeContext)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchPublisherUsers()).then(() => setLoading(false))
  }, [selectUsers])

  return (
    <>
      {status === 'loading' ? (
       
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка пользователей'} />

        ) : (
        <div className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
          {publisherUsers.length && publisherUsers ? (
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
                <PublisherTableUsersList publisherUsers={publisherUsers} />
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

export default PublisherTableUsers
