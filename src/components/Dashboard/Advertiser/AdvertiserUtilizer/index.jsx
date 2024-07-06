import React from 'react'
import style from './AdvertiserTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Plus } from 'lucide-react'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import { Table, TableHeader, TableBody, } from '@/components/ui/table.jsx'
import AdvertiserTableRows from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTableRows.jsx";
import AdvertiserTableData from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTableData.jsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import AdvertiserModal from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserModal.jsx";



const  AdvertiserTable = () => {
  const {advertisers, status} = useSelector((state) => state.advertiser)
  const dispatch = useDispatch()

  // Модальное окно AdvertiserModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно AdvertiserModal


  React.useEffect(() => {
    dispatch(fetchAdvertiser())
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div className='text-white'>
            Загрузка рекламодателей &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="flex justify-end -mt-14">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="mb-4 bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[48px]"
                >
                  <Plus className="w-5 h-5 mr-2"/> Создать рекламодателя
                </Button>
              </DialogTrigger>
              {open && <AdvertiserModal onClose={handleClose}
              />}
            </Dialog>
          </div>
            <div className={`border_container rounded-xl p-[3px]  glass-background`}>
              {advertisers.length ? (
                <Table
                  className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
                >

                  {/*Столбцы таблицы*/}
                  <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                    <AdvertiserTableRows/>
                  </TableHeader>
                  {/*Столбцы таблицы*/}

                  <TableBody>
                    <AdvertiserTableData advertisers={advertisers}/>
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

export default AdvertiserTable
