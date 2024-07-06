import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiserAgency } from '../../../../redux/AgencySlice/advertiserAgency/advertiserAgencySlice.js'
import { Plus } from 'lucide-react'
import { Table, TableHeader,TableHead, TableRow, TableCell , TableBody} from '@/components/ui/table.jsx'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import EditAdvertiserAgencyModal from './EditAdvertiserAgencyModal.jsx'
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import AdvertiserAgencyModal
  from "@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUtilizer/AdvertiserAgencyModal.jsx";
import {EditSvg} from "@/assets/icons-ui.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import style
  from "@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/AdvertiserAgencyTableUsers.module.scss";

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Наименование Компании ' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Номер телефона' },
  { key: 'commission_rate', label: 'Комиссия %' },
  { key: 'commission_rate', label: '' },

]

function AdvertiserAgencyTable() {
  const dispatch = useDispatch()
  const {advertiserAgency, status} = useSelector((state) => state.advertiserAgency)
  const [currentAdv, setCurrentAdv] = React.useState(null)
  const role = localStorage.getItem('role')
  const { textColor } = React.useContext(ThemeContext);

  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal

  // Модальное окно EditModal
  const [editOpen, setEditOpen] = React.useState(false)
  const handleCloseEdit = () => {
    setEditOpen(false)
  }
  // Модальное окно EditModal



  React.useEffect(() => {
    dispatch(fetchAdvertiserAgency())
  }, [dispatch])

  return (
    <>

      {/*Редактирование*/}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        {editOpen && <EditAdvertiserAgencyModal onClose={handleCloseEdit} currentOrder={currentAdv}/>}
      </Dialog>
      {/*Редактирование*/}

      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div style={{ color: 'var(--text-color, )' }}>
            {' '}
            Загрузка рекламных агентств &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="flex justify-end -mt-14">

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
                >
                  <Plus className="w-5 h-5 mr-2" />  Создать рекламное агентство

                </Button>
              </DialogTrigger>
              {open && <AdvertiserAgencyModal onClose={handleClose}
              />}
            </Dialog>
          </div>
          <div className={`border_container rounded-xl p-[3px]  glass-background`}>

            {advertiserAgency.length ? (
              <Table className={`${style.responsive_table} border_design rounded-lg overflow-auto`}>
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
                {advertiserAgency.map((advert, i) => {
                  return (
                    <>
                      <TableRow key={advert.id}>
                        <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{i + 1}</TableCell>
                        <TableCell data-label="Наименование Компании" className={`font-normal text-${textColor} text-sm `}>{advert.name}</TableCell>
                        <TableCell data-label="Email" className={`font-normal text-${textColor} text-sm `}>{advert.email}</TableCell>
                        <TableCell data-label="Номер телефона	" className={`font-normal text-${textColor} text-sm `}>
                          <FormatterPhone phoneNumber={advert.phone_number} />
                        </TableCell>
                        <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
                          {advert.commission_rate === 0 ? (
                            'Нет комиссии'
                          ) : (
                            <>{advert.commission_rate} %</>
                          )}
                        </TableCell>
                        <TableCell data-label="Комиссия %	" className={`font-normal text-${textColor} text-sm `}>
                          {role === 'admin' ? (
                              <Button
                                variant="link"
                                onClick={() => {
                                  setCurrentAdv(advert)
                                  setEditOpen(!editOpen)
                                }}
                                className={`text-${textColor} hover:text-brandPrimary-50 p-1`}
                              >
                                <EditSvg className="w-5 h-5 " />
                              </Button>

                          ) : null}
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="empty_list">
              Список пустой. Добавьте рекламное агентство!
            </div>
          )}
          </div>

        </div>
      )}

    </>
  )
}

export default AdvertiserAgencyTable
