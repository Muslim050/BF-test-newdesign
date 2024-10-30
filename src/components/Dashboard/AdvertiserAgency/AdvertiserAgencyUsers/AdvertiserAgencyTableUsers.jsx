import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiserAgencyUsers } from '../../../../redux/AgencySlice/advertiserAgencyUsers/advertiserAgencyUsersSlice.js'
import style from './AdvertiserAgencyTableUsers.module.scss'
import AdvertiserTableUsersList from './AdvertiserAgencyTableUsersList.jsx'
import {
  TableRow,
  TableHead,
  TableHeader,
  Table,
} from '@/components/ui/table.jsx'

import { ThemeContext } from '@/utils/ThemeContext.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";

const headers = [
  { key: 'id', label: '№' },
  { key: 'username', label: 'Username' },
  { key: 'name', label: 'Рекламное агентство' },
  { key: 'first_name', label: 'Имя' },
  { key: 'last_name', label: 'Фамилия' },
  { key: 'email', label: 'Email' },
  { key: 'side', label: 'Роль' },
  { key: 'phone_number', label: 'Номер' },
]

function AdvertiserAgencyTableUsers() {
  const dispatch = useDispatch()
  const { textColor } = React.useContext(ThemeContext)
  const { advertiserAgencyUsers, status } = useSelector(
    (state) => state.advertiserAgencyUsers,
  )
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchAdvertiserAgencyUsers()).then(() => setLoading(false))
  }, [dispatch])
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal
  return (
    <>
      {status === 'loading' ? (
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка пользователей'} />

      ) : (
        <div className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
          {advertiserAgencyUsers.length ? (
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

              <AdvertiserTableUsersList
                advertiserAgencyUsers={advertiserAgencyUsers}
              />
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

export default AdvertiserAgencyTableUsers
