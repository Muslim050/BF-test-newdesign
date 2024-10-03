import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdvertiserTableUsersData from './AdvertiserTableUsersData.jsx'
import { fetchAdvertiserUsers } from '@/redux/advertiserUsers/advertiserUsersSlice.js'
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table.jsx'
import style from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTable.module.scss'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

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
  const { advertiserUsers, status } = useSelector(
    (state) => state.advertiserUsers,
  )

  React.useEffect(() => {
    dispatch(fetchAdvertiserUsers())
  }, [dispatch])

  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div
            className={`border_container rounded-[22px] p-[3px] glass-background h-screen`} // Здесь используется h-screen для высоты на весь экран
          >
            {advertiserUsers.length ? (
              <div className="h-full overflow-y-auto">
                <Table
                  className={`${style.responsive_table} border_design rounded-lg h-full`}
                >
                  <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                    <TableRow>
                      {headers.map((row) => {
                        return (
                          <TableHead
                            key={row.key}
                            className={`text-${textColor}`}
                          >
                            {row.label}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  </TableHeader>
                  <AdvertiserTableUsersData advertiserUsers={advertiserUsers} />
                </Table>
              </div>
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
