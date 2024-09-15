import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder } from '../../../../redux/order/orderSlice'
import OrderData from './OrderData'
import OrderRows from './OrderRows'
import { Plus } from 'lucide-react'
import { showModalOrder } from 'src/redux/modalSlice'
import style from './OrderTable.module.scss'

import { Table, TableBody, TableHeader } from 'src/components/ui/table'
import { Button } from 'src/components/ui/button.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import OrderModal from '../OrderModal/OrderModal'
import Cookies from 'js-cookie'

function OrderTable() {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('desc')
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

  function changeSort(key) {
    setSort(sort === 'ascn' ? 'desc' : 'ascn')
    setSortKey(key)
  }
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
          <div className="py-4 flex justify-end">
            {user === 'admin' ? (
              ''
            ) : (
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
            )}
          </div>

          <div
            className={`border_container rounded-[22px] p-[3px]  glass-background`}
          >
            {data.length && data ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg overflow-auto `}
              >
                <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                  <OrderRows
                    data={data}
                    sortKey={sortKey}
                    sort={sort}
                    changeSort={changeSort}
                  />
                </TableHeader>
                <TableBody>
                  <OrderData data={data} />
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center gap-2 justify-center h-[200px] 	">
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
