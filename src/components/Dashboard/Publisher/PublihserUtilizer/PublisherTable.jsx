import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublisher } from '../../../../redux/publisher/publisherSlice.js'
import style from './PublisherTable.module.scss'
import { Plus } from 'lucide-react'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import {
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableHeader,
} from '@/components/ui/table.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Имя' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Номер телефона' },
]

function PublisherTable() {
  const dispatch = useDispatch()
  const { textColor } = React.useContext(ThemeContext)
  const { publisher, status } = useSelector((state) => state.publisher)
  React.useEffect(() => {
    dispatch(fetchPublisher())
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
          <div style={{ color: 'var(--text-color, )' }}>
            {' '}
            Загрузка паблишеров &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
          {publisher && publisher ? (
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
                {publisher.map((pablisher, i) => {
                  return (
                    <TableRow key={pablisher.id}>
                      <TableCell
                        data-label="№"
                        className={`font-normal text-${textColor} text-sm `}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell
                        data-label="Имя"
                        className={`font-normal text-${textColor} text-sm `}
                      >
                        {pablisher.name}
                      </TableCell>
                      <TableCell
                        data-label="Email"
                        className={`font-normal text-${textColor} text-sm `}
                      >
                        {pablisher.email}
                      </TableCell>
                      <TableCell
                        data-label="Номер телефона"
                        className={`font-normal text-${textColor} text-sm `}
                      >
                        <FormatterPhone phoneNumber={pablisher.phone_number} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="empty_list">
              Список пустой. Добавьте Рекламодателя!
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default PublisherTable
