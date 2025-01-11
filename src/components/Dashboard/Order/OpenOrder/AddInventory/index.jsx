import style from '@/components/Dashboard/Order/OpenOrder/BindingOrderModal.module.scss'
import AddInventoryData from './components/AddInventoryData.jsx'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table.jsx'
import Cookies from 'js-cookie'
import { deactivateInventories } from '@/redux/orderStatus/orderStatusSlice.js'
import { fetchOrder } from '@/redux/order/orderSlice.js'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import InfoCartButton from './components/InfoCartButton.jsx'
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import Verify from "@/components/Dashboard/Order/OpenOrder/AddInventory/modal/Verify/Verify.jsx";

export default function AddInventory({
  getOrder,
  setSelectedRows,
  selectedRows,
  expandedRows,
  fetchGetOrder,
  onceOrder,
                                       table,
                                       flexRender,
                                       pagination,
                                       open,
                                       setOpen,
                                       handleClose,
                                       selectedInventoryId

}) {
  const dispatch = useDispatch()
  const { textColor } = React.useContext(ThemeContext)
  const role = Cookies.get('role')


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

  const [totalOnlineView, setTotalOnlineView] = React.useState(0)
  React.useEffect(() => {
    const total = getOrder.reduce(
      (acc, advert) => acc + (advert?.online_views || 0),
      0,
    )
    setTotalOnlineView(total)
  }, [getOrder])

  const filteredVideoLink = onceOrder?.inventories?.find(
    (item) => item.id === selectedInventoryId,
  )
  return (

    <>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          {' '}
          {open && (
            <Verify
              onInventoryVerify
              expandedRows={expandedRows}
              selectedInventoryId={selectedInventoryId}
              videoLink={filteredVideoLink}
              onClose={handleClose}
              onceOrder={onceOrder}
              fetchGetOrder={fetchGetOrder}
            />
          )}
        </Dialog>
      )}
      <div
        className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
        <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
          <TablePagination table={table} flexRender={flexRender}/>
        </div>
        {
          table.getPageCount() > 1 &&
          <Pagination table={table} pagination={pagination}/>}
      </div>
            <InfoCartButton
              totalOnlineView={totalOnlineView}
              onceOrder={onceOrder}
            />
    </>
    // <div className={` rounded-[22px] p-[3px]   glass-background`}>
    //   {getOrder.length && getOrder ? (
    //     <Table
    //       className={`${style.responsive_table} border_design rounded-lg  overflow-auto`}
    //     >
    //       <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
    //         <TableRow>
    //           <TableHead className={`text-${textColor}`}>№</TableHead>
    //           <TableHead className={`text-${textColor} relative`}>
    //             Канал
    //             <button
    //               onClick={() => handleSort('channel_name')}
    //               style={{
    //                 background: 'transparent',
    //                 position: 'absolute',
    //                 top: '30%',
    //               }}
    //             >
    //               <svg
    //                 width="18px"
    //                 height="18px"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 style={getRotateStyle('channel_name')}
    //               >
    //                 <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    //
    //                 <g
    //                   id="SVGRepo_tracerCarrier"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //
    //                 <g id="SVGRepo_iconCarrier">
    //                   {' '}
    //                   <path
    //                     d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
    //                     stroke="white"
    //                     strokeWidth="2"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                   />{' '}
    //                 </g>
    //               </svg>
    //             </button>
    //           </TableHead>
    //           <TableHead className={`text-${textColor}`}>
    //             Название Видео
    //           </TableHead>
    //           <TableHead className={`text-${textColor}`}>Категория</TableHead>
    //           <TableHead className={`text-${textColor}`}>Формат</TableHead>
    //           <TableHead className={`text-${textColor}`}>
    //             Прогноз показов
    //           </TableHead>
    //
    //           <TableHead className={`text-${textColor}`}>Ссылка</TableHead>
    //           <TableHead className={`text-${textColor} relative`}>
    //             Время публикаций
    //             <button
    //               onClick={() => handleSort('publication_time')}
    //               style={{
    //                 background: 'transparent',
    //                 position: 'absolute',
    //                 top: '30%',
    //               }}
    //             >
    //               <svg
    //                 width="18px"
    //                 height="18px"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 style={getRotateStyle('publication_time')}
    //               >
    //                 <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    //
    //                 <g
    //                   id="SVGRepo_tracerCarrier"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //
    //                 <g id="SVGRepo_iconCarrier">
    //                   {' '}
    //                   <path
    //                     d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
    //                     stroke="white"
    //                     strokeWidth="2"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                   />{' '}
    //                 </g>
    //               </svg>
    //             </button>
    //           </TableHead>
    //           <TableHead className={`text-${textColor} relative`}>
    //             Показы{' '}
    //             <button
    //               onClick={() => handleSort('online_views')}
    //               style={{
    //                 background: 'transparent',
    //                 position: 'absolute',
    //                 top: '30%',
    //               }}
    //             >
    //               <svg
    //                 width="18px"
    //                 height="18px"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 style={getRotateStyle('online_views')}
    //               >
    //                 <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    //
    //                 <g
    //                   id="SVGRepo_tracerCarrier"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 />
    //
    //                 <g id="SVGRepo_iconCarrier">
    //                   {' '}
    //                   <path
    //                     d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
    //                     stroke="white"
    //                     strokeWidth="2"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                   />{' '}
    //                 </g>
    //               </svg>
    //             </button>
    //           </TableHead>
    //           <TableHead className={`text-${textColor}`}>
    //
    //             {onceOrder?.status ==="finished" ?  'Статус' : 'Статус / Действия'
    //             }
    //
    //
    //           </TableHead>
    //         </TableRow>
    //       </TableHeader>
    //
    //       <AddInventoryData
    //         inventor={sortedOrder}
    //         expandedRows={expandedRows}
    //         selectedRows={selectedRows}
    //         setSelectedRows={setSelectedRows}
    //         handleDeactivateInventory={handleDeactivateInventory}
    //         onceOrder={onceOrder}
    //         fetchGetOrder={fetchGetOrder}
    //       />
    //     </Table>
    //   ) : (
    //     <div className="flex justify-center" style={{ padding: '10px 0' }}>
    //       Список пустой, добавьте размещение
    //     </div>
    //   )}
    //   {sortedOrder.length > 0 ? (
    //     <InfoCartButton
    //       totalOnlineView={totalOnlineView}
    //       onceOrder={onceOrder}
    //     />
    //   ) : null}
    // </div>
  )
}
