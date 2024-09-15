import style from '../BindingOrderModal.module.scss'
import React from 'react'
import AddSentPublisherRows from './AddSentPublisherRows'
import AddSentPublisherData from './AddSentPublisherData'
import { useDispatch, useSelector } from 'react-redux'
import AddSendPublisherModal from './AddSendPublisherModal'
import { fetchOnceListSentToPublisher } from '@/redux/order/SentToPublisher.js'
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from 'src/components/ui/table'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { CommentSvg } from '@/assets/icons-ui.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import { X } from 'lucide-react'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus'
import { hasRole } from '../../../../../utils/roleUtils'

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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #ff991e',
                  borderRadius: '12px',
                  background: '#ffcc9163',
                  marginRight: '10px',
                  marginBottom: '10px',
                }}
              >
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}>Итого показы:</div>
                    <FormatterView data={totalOnlineView} />
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}> Остаток:</div>
                    <FormatterView
                      data={
                        onceOrder.expected_number_of_views -
                        onceOrder.online_views
                      }
                    />
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}>Статус:</div>
                    <AdvertStatus status={onceOrder.status}>
                      {hasRole === 'admin' ||
                      hasRole === 'advertising_agency' ? (
                        <>
                          {hasRole === 'admin' ||
                          hasRole === 'advertising_agency' ? (
                            <>
                              {onceOrder.status === 'in_progress' ? (
                                <div
                                  style={{
                                    display: (() => {
                                      const ratie = Math.floor(
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                          100,
                                      )
                                      if (ratie >= 1) {
                                        return 'initial'
                                      }
                                      return 'none'
                                    })(),
                                    padding: '1px 5px',
                                    borderRadius: '7px',
                                    fontWeight: '600',
                                    background: (() => {
                                      const ratie = Math.floor(
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                          100,
                                      )

                                      if (ratie >= 100) {
                                        return '#ec2020'
                                      } else if (ratie >= 80) {
                                        return '#fd8b00'
                                      } else if (ratie >= 50) {
                                        return 'rgba(50, 147, 111, 0.16)'
                                      } else if (ratie >= 1) {
                                        return 'rgb(86 112 241)'
                                      }
                                      return 'inherit'
                                    })(),

                                    color: (() => {
                                      const ratio =
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                        100

                                      if (ratio >= 100) {
                                        return '#f8f8f8'
                                      } else if (ratio >= 80) {
                                        return '#764306'
                                      } else if (ratio >= 50) {
                                        return '#047f27'
                                      } else if (ratio >= 1) {
                                        return 'rgb(228 232 253)'
                                      }
                                      return 'inherit'
                                    })(),
                                  }}
                                >
                                  {onceOrder.online_views > 0 &&
                                    Math.floor(
                                      (onceOrder.online_views /
                                        onceOrder.expected_number_of_views) *
                                        100,
                                    ) +
                                      ' ' +
                                      '%'}
                                </div>
                              ) : null}
                              {onceOrder.status === 'finished' ? (
                                <div
                                  style={{
                                    display: 'initial',
                                    padding: '1px 4px',
                                    borderRadius: '7px',
                                    background: 'rgb(156 81 81)',
                                    color: '#eedede',
                                    marginLeft: '10px',
                                  }}
                                >
                                  100%
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </AdvertStatus>
                  </div>
                )}
              </div>
            </div>
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
