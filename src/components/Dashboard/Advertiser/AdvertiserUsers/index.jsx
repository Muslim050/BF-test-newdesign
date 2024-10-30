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
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";

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
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchAdvertiserUsers()).then(() => setLoading(false))
  }, [dispatch])

  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {status === 'loading' ? (
        // <div className="loaderWrapper">
        //   <div className="spinner"></div>
        // </div>
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка пользователей'} />

        ) : (
        <div className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
          {advertiserUsers.length ? (
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
              <AdvertiserTableUsersData advertiserUsers={advertiserUsers} />
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

export default AdvertiserTableUsers
