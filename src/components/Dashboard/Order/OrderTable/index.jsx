import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder } from '@/redux/order/orderSlice'
import OrderData from './components/OrderData'
import OrderRows from './components/OrderRows'
import { Plus } from 'lucide-react'
import { showModalOrder } from '@/redux/modalSlice'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import OrderModal from './modals/CreateOrder/CreateOrder'
import Cookies from 'js-cookie'
import style from './styles/OrderTable.module.scss'

function OrderTable() {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const { order } = useSelector((state) => state)
  const user = Cookies.get('role')
  const data = order?.order

  // Модальное окно AdvertiserModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно AdvertiserModal

  React.useEffect(() => {
    dispatch(fetchOrder()).then(() => setLoading(false))
  }, [dispatch])

  const handleButtonClick = () => {
    dispatch(showModalOrder())
  }

  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div style={{ marginRight: '10px' }}>Загрузка заказов</div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          {user === 'admin' ? null : (
            <div className="py-4 flex justify-end">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-[22px] h-auto bg-brandPrimary-1 hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                    onClick={handleButtonClick}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Создать заказ
                  </Button>
                </DialogTrigger>
                {open && <OrderModal onClose={handleClose} />}
              </Dialog>
            </div>
          )}
          <div className="border_container w-full sm:h-[calc(100vh-100px)] h-[calc(100vh-170px)]   rounded-[22px]  p-[3px] glass-background flex flex-col">
            {data.length && data ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg h-full`}
              >
                <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg ">
                  <OrderRows data={data} />
                </TableHeader>
                <TableBody>
                  <OrderData data={data} />
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center gap-2 justify-center h-full">
                Список пустой. Добавьте заказ!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default OrderTable
