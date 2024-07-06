import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublisher } from '../../../../redux/publisher/publisherSlice.js'
import style from './PublisherTable.module.scss'
import { Plus } from 'lucide-react'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import { TableCell, TableRow, Table, TableHead, TableBody,
  TableHeader } from '@/components/ui/table.jsx'
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import PublisherModal from "@/components/Dashboard/Publisher/PublihserUtilizer/PublisherModal.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Имя' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Номер телефона' },
]

function PublisherTable() {
  const dispatch = useDispatch()
  const { textColor } = React.useContext(ThemeContext);
  const {publisher, status} = useSelector((state) => state.publisher)
  const user = localStorage.getItem('role')
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
        <div className="tableWrapper">
          <div className="flex justify-end ">

            {user === 'publisher' ? (
              ''
            ) : (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="-mt-14 mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
                  >
                    <Plus className="w-5 h-5 mr-2"/> Создать паблишера
                  </Button>
                </DialogTrigger>
                {open && <PublisherModal onClose={handleClose}
                />}
              </Dialog>
            )}
          </div>

          <div className={`border_container rounded-xl p-[3px]  glass-background`}>

            {publisher && publisher ? (
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
                {publisher.map((pablisher, i) => {
                  return (
                    <TableRow key={pablisher.id}>
                      <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>{i + 1}</TableCell>
                      <TableCell data-label="Имя" className={`font-normal text-${textColor} text-sm `}>{pablisher.name}</TableCell>
                      <TableCell data-label="Email" className={`font-normal text-${textColor} text-sm `}>{pablisher.email}</TableCell>
                      <TableCell data-label="Номер телефона" className={`font-normal text-${textColor} text-sm `}>
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

        </div>
      )}
    </>
  )
}

export default PublisherTable
