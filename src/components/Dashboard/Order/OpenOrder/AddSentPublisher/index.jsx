import style from '@/components/Dashboard/Order/OpenOrder/BindingOrderModal.module.scss'
import React from 'react'
import AddSentPublisherRows from './components/AddSentPublisherRows.jsx'
import AddSentPublisherData from './components/AddSentPublisherData.jsx'
import { useDispatch, useSelector } from 'react-redux'
import AddSendPublisherModal from './modal/AddSendPublisherModal'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import { X } from 'lucide-react'
import InfoCartSentPublisher from './components/InfoCartSentPublisher.jsx'

export default function AddSentPublisher({ expandedRows, onceOrder }) {
  const { textColor } = React.useContext(ThemeContext)
  const dispatch = useDispatch()
  const { listsentPublisher } = useSelector((state) => state.sentToPublisher)
  const [viewNote, setViewNote] = React.useState(false)
  React.useEffect(() => {
    dispatch(fetchOnceListSentToPublisher({ expandedRows }))
  }, [])
  const [totalOnlineView, setTotalOnlineView] = React.useState(0)

  React.useEffect(() => {
    const total = listsentPublisher.reduce(
      (acc, advert) => acc + (advert?.online_views || 0),
      0,
    )
    setTotalOnlineView(total)
  }, [listsentPublisher])

  return (
    <div className={` rounded-[22px] p-2  `}>
      {/*Добавление новой записи*/}

      {/* кнопка крестик чтобы закрыть создание записи */}
      {viewNote ? (
        <div className="flex justify-end absolute top-3 right-3">
          <Button
            variant="outline"
            onClick={() => setViewNote(false)}
            className=" px-1 h-[30px] group rounded-lg  gap-2 hover:bg-red-300"
          >
            <X className="hover:text-red-600  transform group-hover:scale-125 transition-transform" />
          </Button>
        </div>
      ) : null}
      {/* кнопка крестик чтобы закрыть создание записи */}

      <div>
        <Table
          className={`${style.responsive_table} border_design rounded-[22px] overflow-auto`}
        >
          {viewNote && (
            <div className="grid grid-cols-5 gap-4">
              <TableHeader className="col-span-5 grid grid-cols-5 bg-[#FFFFFF2B] rounded-t-lg"></TableHeader>
            </div>
          )}
          <TableBody>
            {viewNote && (
              <TableRow
                initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
              >
                <AddSendPublisherModal
                  expandedRows={expandedRows}
                  setViewNote={setViewNote}
                  onceOrder={onceOrder}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>

        {viewNote ? null : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Button
              variant="outline"
              onClick={() => setViewNote(!viewNote)}
              className="group h-[35px] px-2 gap-2 rounded-[14px] border border-brandPrimary-1 transition-all hover:bg-brandPrimary-1 hover:text-white"
            >
              <div className="flex items-center justify-center gap-2 ">
                <Plus className="transform group-hover:scale-125 transition-transform" />
                Добавить запись
              </div>
            </Button>
          </div>
        )}
      </div>
      {/*Добавление новой записи*/}

      {/*Данные */}
      {listsentPublisher.length > 0 ? (
        <div className={` rounded-[22px] p-[3px]  glass-background`}>
          <Table
            className={`${style.responsive_table}  rounded-lg overflow-auto`}
          >
            <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
              <AddSentPublisherRows />
            </TableHeader>
            <TableBody>
              <AddSentPublisherData
                listsentPublisher={listsentPublisher}
                expandedRows={expandedRows}
                onceOrder={onceOrder}
              />
            </TableBody>
          </Table>

          {listsentPublisher.length > 0 ? (
            <InfoCartSentPublisher
              totalOnlineView={totalOnlineView}
              onceOrder={onceOrder}
            />
          ) : null}
        </div>
      ) : (
        <div
          style={{ fontSize: '15px', color: 'gray' }}
          className={style['no-records']}
        >
          Нет записей, Добавьте размещение
        </div>
      )}
      {/*Данные */}
    </div>
  )
}
