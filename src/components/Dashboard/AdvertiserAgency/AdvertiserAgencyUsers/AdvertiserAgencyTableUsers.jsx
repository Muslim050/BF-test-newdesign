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
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import AdvertiserAgencyModalUsers from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/AdvertiserAgencyModalUsers.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

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

  React.useEffect(() => {
    dispatch(fetchAdvertiserAgencyUsers())
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
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div
            className={`border_container rounded-[22px] p-[3px]  glass-background`}
          >
            {advertiserAgencyUsers.length ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
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
        </div>
      )}
    </>
  )
}

export default AdvertiserAgencyTableUsers
