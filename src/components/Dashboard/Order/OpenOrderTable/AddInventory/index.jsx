import style from '../BindingOrderModal.module.scss'
import AddInventoryData from './AddInventoryData'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table.jsx'

import { deactivateInventories } from '@/redux/orderStatus/orderStatusSlice.js'
import { fetchOrder } from '@/redux/order/orderSlice.js'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

export default function AddInventory({
  getOrder,
  setSelectedRows,
  selectedRows,
  expandedRows,
  fetchGetOrder,
}) {
  const dispatch = useDispatch()
  const { textColor } = React.useContext(ThemeContext)

  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm(
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch(deactivateInventories({ inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно завершен')
          fetchGetOrder() // Вызов функции после успешного запроса
        })
        .catch((error) => {
          toast.error(error.message)
          fetchGetOrder() // Вызов функции после успешного запроса
        })
    } else {
      toast.info('Операция отменена')
      dispatch(fetchOrder())
    }
  }

  return (
    <div className={` rounded-lg p-[3px]  glass-background`}>
      {getOrder.length && getOrder ? (
        <Table
          className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
        >
          <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
            <TableRow>
              <TableHead className={`text-${textColor}`}>№</TableHead>
              <TableHead className={`text-${textColor}`}>Канал</TableHead>
              <TableHead className={`text-${textColor}`}>
                Название Видео
              </TableHead>
              <TableHead className={`text-${textColor}`}>Категория</TableHead>
              <TableHead className={`text-${textColor}`}>Формат</TableHead>
              <TableHead className={`text-${textColor}`}>
                Прогноз показов
              </TableHead>

              <TableHead className={`text-${textColor}`}>Ссылка</TableHead>
              <TableHead className={`text-${textColor}`}>
                Время публикаций
              </TableHead>
              <TableHead className={`text-${textColor}`}>Показы</TableHead>
              <TableHead className={`text-${textColor}`}>
                Действия/Статус
              </TableHead>
            </TableRow>
          </TableHeader>

          <AddInventoryData
            inventor={getOrder}
            expandedRows={expandedRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleDeactivateInventory={handleDeactivateInventory}
          />
        </Table>
      ) : (
        <div className="empty_list" style={{ padding: '10px 0' }}>
          Список пустой, добавьте размещение
        </div>
      )}
    </div>
  )
}
