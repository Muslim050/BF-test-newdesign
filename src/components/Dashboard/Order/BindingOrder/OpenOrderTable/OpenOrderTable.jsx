import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import OpenOrderTableRows from './OpenOrderTableRows.jsx'
import axios from 'axios'
import OpenOrderTableData from './OpenOrderTableData.jsx'
import AddInventoryInOrder from '../AddInventoryInOrder/AddInventoryInOrder.jsx'
// import { ReactComponent as ArrowR } from 'src/assets/arrow-right.svg'
// import { ReactComponent as ArrowInv } from 'src/assets/Table/arrowInv.svg'
import {
  inventoryPrebook,
  inventoryVerify,
} from '../../../../../redux/inventoryStatus/inventoryStatusSlice'
import { fetchOrder } from '../../../../../redux/order/orderSlice'
import {
  assignInventories,
  confirmOrder,
  deactivateInventories,
  removeInventories,
} from '../../../../../redux/orderStatus/orderStatusSlice'
import { toastConfig } from '../../../../../utils/toastConfig'
import { sortData } from 'src/utils/SortData'
import ButtonTable from 'src/components/Labrery/ButtonTable/ButtonTable'
import { hideModalSInventory, showModalSInventory } from 'src/redux/modalSlice'
import ModalUI from 'src/components/Labrery/ModalComponents/ModalUI/ModalUI'
import backendURL from 'src/utils/url'
import CircularBadge from 'src/components/Labrery/Circular/CircularBadge'
import FormatterView from 'src/components/Labrery/formatter/FormatterView'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus'
import style from '../../OrderTable/OrderTable.module.scss'
import { Table, TableBody, TableHeader } from 'src/components/ui/table'
import { Button } from '../../../../ui/button.jsx'
import { Plus } from 'lucide-react'

function OpenOrderTable({ expandedRows, statusOr, advert }) {
  console.log(statusOr)
  const dispatch = useDispatch()
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('ascn')
  const [getOrder, setGetOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { showSelectedInventory } = useSelector((state) => state.modal)
  const CounterBadge = getOrder.map((i) => i.status)[0]
  const role = localStorage.getItem('role')

  const fetchGetOrder = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${backendURL}/order/${expandedRows}/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setGetOrder(response.data.data.inventories)
    setIsLoading(false)
  }
  function handleRowsSelected(selectedRows) {
    dispatch(assignInventories({ selectedRows, expandedRows })).then(() => {
      toast.success('Инвентарь успешно привязан к заказу!', toastConfig)
      dispatch(hideModalSInventory())

      dispatch(fetchGetOrder())
    })
  }
  function handleConfirmOrder() {
    dispatch(confirmOrder({ expandedRows })).then(() => {
      dispatch(hideModalSInventory())
      dispatch(fetchOrder())
    })
  }
  const handleRemoveInventory = (expandedRows, inventory_id) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить?')
    if (confirmDelete) {
      dispatch(removeInventories({ expandedRows, inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно удален', toastConfig)
          fetchGetOrder()
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          fetchGetOrder()
        })
    } else {
      toast.info('Операция отменена', toastConfig)
      fetchGetOrder()
    }
  }
  const handleButtonClick = () => {
    dispatch(showModalSInventory())
  }
  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm(
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch(deactivateInventories({ inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно завершен', toastConfig)
          fetchGetOrder()
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          fetchGetOrder()
        })
    } else {
      toast.error('Попробуйте еще раз', toastConfig)
      fetchGetOrder()
    }
  }
  const handleInventoryInPrebook = (expandedRows, inventory_id) => {
    const confirmPrebook = window.confirm(
      'Данный инвентарь отправляется каналу?',
    )
    if (confirmPrebook) {
      dispatch(inventoryPrebook({ expandedRows, inventory_id }))
        .then(() => {
          toast.success('Инвентарь отправлен паблишеру', toastConfig)
          fetchGetOrder()
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          fetchGetOrder()
        })
    } else {
      toast.info('Операция отменена', toastConfig)
      fetchGetOrder()
    }
  }
  const handleInventoryVerify = (expandedRows, inventory_id) => {
    const confirmVerify = window.confirm(
      'Данный инвентарь отправляется каналу?',
    )
    if (confirmVerify) {
      dispatch(inventoryVerify({ expandedRows, inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно отправлен', toastConfig)
          fetchGetOrder()
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          fetchGetOrder()
        })
    } else {
      toast.error('Попробуйте еще раз', toastConfig)
      fetchGetOrder()
    }
  }
  React.useEffect(() => {
    dispatch(fetchOrder())
    fetchGetOrder()
  }, [dispatch])
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: getOrder,
        sortKey,
        reverse: sort === 'desc',
      }),
    [getOrder, sortKey, sort],
  )
  function changeSort(key) {
    setSort(sort === 'ascn' ? 'desc' : 'ascn')
    setSortKey(key)
  }

  //Итого онлайн просмотров
  let totalOnlineView = 0

  totalOnlineView += advert?.online_views

  //Итого онлайн просмотров
  console.log(getOrder)
  return (
    <>
      <AnimatePresence>
        {showSelectedInventory && (
          <ModalUI>
            <div>
              <AddInventoryInOrder
                onRowsSelected={handleRowsSelected}
                expandedRows={expandedRows}
              />
            </div>
          </ModalUI>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="loaderWrapper" style={{ height: '10vh' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="p-3 rounded-xl	 bg-white bg-opacity-30 backdrop-blur-md">
            {getOrder.length > 0 ? (
              <Table
                className={`${style.responsive_table} rounded-lg overflow-auto bg-[#090e35e0]`}
              >
                <TableHeader className="bg-[#FFFFFF2B] rounded-lg	">
                  <OpenOrderTableRows
                    sortKey={sortKey}
                    sort={sort}
                    changeSort={changeSort}
                    getOrder={getOrder}
                  />
                </TableHeader>
                <TableBody>
                  <OpenOrderTableData
                    statusOr={statusOr}
                    expandedRows={expandedRows}
                    getOrder={getOrder}
                    onRemoveInventory={handleRemoveInventory}
                    onInventoryPrebook={handleInventoryInPrebook}
                    onRemoveDeactivate={handleDeactivateInventory}
                    onInventoryVerify={handleInventoryVerify}
                    sortedData={sortedData}
                  />
                </TableBody>
              </Table>
            ) : (
              <div className="p-3 rounded-xl	 bg-white bg-opacity-30 backdrop-blur-md">
                <div className="text-white text-lg	font-semibold	 flex justify-center">
                  Список пустой. Добавьте инвентарь!
                </div>
              </div>
            )}

            <div className="flex  justify-center h-[80px]">
              <div className="bg-[#090e35e0] rounded-lg mt-4 w-max flex p-[4px]">
                <div className="flex gap-2">
                  {/*Статус*/}
                  {statusOr === 'finished' ? (
                    ''
                  ) : (
                    <div className="flex items-center">
                      <div
                        className="text-white"
                        style={{ marginRight: '5px' }}
                      >
                        Статус:
                      </div>
                      <AdvertStatus status={advert.status}></AdvertStatus>
                    </div>
                  )}
                  {/*Статус*/}

                  {/*Остаток*/}
                  {statusOr === 'finished' ? (
                    ''
                  ) : (
                    <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-lg	flex flex-col justify-center text-center">
                      <div className="text-xl">
                        <FormatterView
                          data={
                            advert.expected_number_of_views -
                            advert.online_views
                          }
                        />
                      </div>
                      <div className="text-base	font-medium"> Остаток</div>
                    </div>
                  )}
                  {/*Остаток*/}

                  {/*Итого показы*/}
                  {statusOr === 'finished' ? (
                    ''
                  ) : (
                    <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-lg	flex flex-col justify-center text-center">
                      <div className="text-xl">
                        <FormatterView data={totalOnlineView} />
                      </div>
                      <div className="text-base	font-medium">Итого показы</div>
                    </div>
                  )}
                  {/*Итого показы*/}

                  {statusOr === 'finished' && getOrder.length > 0 ? (
                    <Button
                      variant="ghost"
                      className="h-auto bg-[#4F5682] hover:bg-[#737db8] text-white no-underline hover:text-white "
                      onClick={handleButtonClick}
                    >
                      Panel
                    </Button>
                  ) : (
                    ''
                  )}

                  {/*Кнопка Добавить инвентарь*/}
                  {statusOr === 'finished' ? (
                    ''
                  ) : (
                    <Button
                      variant="ghost"
                      className="h-auto bg-brandPrimary-1 hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                      onClick={handleButtonClick}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Добавить инвентарь
                    </Button>
                  )}
                  {/*Кнопка Добавить инвентарь*/}
                </div>

                {statusOr === 'in_progress' ||
                statusOr === 'accepted' ||
                statusOr === 'open' ||
                statusOr === 'finished' ||
                statusOr === 'confirmed' ||
                getOrder.length === 0 ? (
                  ''
                ) : (
                  <div style={{ marginLeft: '10px', position: 'relative' }}>
                    <ButtonTable onClick={handleConfirmOrder} color="green">
                      Подтвердить
                      {/*<ArrowR style={{ width: '18px', height: '15px' }} />*/}
                    </ButtonTable>
                    {CounterBadge === 'booked' ? (
                      <CircularBadge
                        style={{
                          backgroundColor: '#ff7d00',
                          color: '#4833d0',
                          width: '15px',
                          height: '15px',
                          top: '-5px',
                          right: '-5px',
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OpenOrderTable
