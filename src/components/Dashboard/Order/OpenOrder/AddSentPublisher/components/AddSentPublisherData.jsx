import React from 'react'
import { Link } from 'react-router-dom'
import EditSendPublisherModal from '../modal/EditSendPublisherModal/index.jsx'
import { toast } from 'react-hot-toast'
import { TableCell, TableRow } from '@/components/ui/table.jsx'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import PopoverEditView from '../../PopoverEditView.jsx'
import { useDispatch } from 'react-redux'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet.jsx'
import { formatDate } from '@/utils/formatterDate.jsx'
import {
  fetchOnceListSentToPublisher,
  sentToPublisherButton,
} from '@/redux/order/SentToPublisher.js'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {BookmarkCheck, Monitor, MonitorPlay, MonitorUp} from 'lucide-react'
import { EditSvg, LinkSvg } from '@/assets/icons-ui.jsx'
import { Send } from 'lucide-react'
import { Plus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx'
function AddSentPublisherData({ listsentPublisher, expandedRows, onceOrder }) {
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const [iD, setID] = React.useState('')
  const dispatch = useDispatch()
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext)

  const clickSentPublisher = (itemID) => {
    dispatch(sentToPublisherButton({ id: itemID }))
      .unwrap()
      .then(() => {
        toast.success('Запись успешно отправлена')
        dispatch(fetchOnceListSentToPublisher({ expandedRows }))
      })
      .catch((error) => {
        toast.error(error.message)
        dispatch(fetchOnceListSentToPublisher({ expandedRows }))
      })
  }

  return (
    <>
      {listsentPublisher.map((item, i) => (
        <React.Fragment key={i}>
          {currentOrder === item ? (
            <>
              <EditSendPublisherModal
                item={item}
                expandedRows={expandedRows}
                onCancel={() => setCurrentOrder(null)}
                onSave={(updatedData) => {
                  setCurrentOrder(null)
                }}
                setCurrentOrder={setCurrentOrder}
              />
            </>
          ) : (
            <TableRow>
              <TableCell
                data-label="Паблишер"
                className={`font-normal text-${textColor} text-sm `}
              >
                {item.publisher?.name}
              </TableCell>
              <TableCell
                data-label="Канал"
                className={`font-normal text-${textColor} text-sm `}
              >
                {item.channel?.name}
              </TableCell>
              {/*<td>*/}
              {/*  <Link to={item.promo_file}>Видео</Link>*/}
              {/*</td>*/}
              <TableCell
                data-label="Формат"
                className={`text-blue-300 font-medium  text-sm `}
              >
                <div className='flex items-center gap-1'>
                  {
                    (item.format === 'preroll' && <Monitor/>) ||
                    (item.format === 'top_preroll' && <MonitorUp/>) ||
                    (item.format === 'tv_preroll' && <MonitorPlay/>)
                  }
                  {
                    (item.format === 'preroll' && 'Pre-roll') ||
                    (item.format === 'mixroll' && 'Mix-roll') ||
                    (item.format === 'top_preroll' && 'Top Pre-roll') ||
                    (item.format === 'tv_preroll' && 'TV Pre-roll')}


                </div>
                {/*{(item.format === 'preroll' && 'Pre-roll') ||*/}
                {/*  ('mixroll' && 'Mix-roll')}*/}
              </TableCell>
              <TableCell
                data-label="Начало"
                className={`font-normal text-${textColor} text-sm `}
              >
                {formatDate (item.start_date)}
              </TableCell>
              <TableCell
                data-label="Конец"
                className={`font-normal text-${textColor} text-sm `}
              >
                {formatDate (item.end_date)}
              </TableCell>

              <TableCell
                data-label="Показы"
                className={`font-normal text-${textColor} text-sm `}
              >
                <div className="flex gap-2 items-center justify-between">
                  <FormatterView data={item.ordered_number_of_views} />
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="bg-[#5670f1] rounded-full hover:scale-125 transition-all "
                        onClick={() => setOpenPopoverIndex(i)}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>
                    {openPopoverIndex === i && (
                      <PopoverContent className="w-80 bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                        <PopoverEditView
                          item={item}
                          expandedRows={expandedRows}
                          setOpenPopoverIndex={setOpenPopoverIndex}
                          onceOrder={onceOrder}
                        />
                      </PopoverContent>
                    )}
                  </Popover>
                </div>
              </TableCell>
              <TableCell
                data-label="Прогресс"
                className={`font-normal text-${textColor} text-sm `}
              >
                {item.online_views > 0 ? (
                  <FormatterView data={item.online_views} />
                ) : (
                  <div>----</div>
                )}
              </TableCell>
              <TableCell
                data-label="Бюджет"
                className={`font-normal text-${textColor} text-sm `}
              >
                <FormatterBudjet budget={item.budget} />
              </TableCell>
              <TableCell
                data-label="Возраст"
                className={`font-normal text-${textColor} text-sm `}
              >
                {item.age_range}
              </TableCell>

              <TableCell
                data-label="Ролик"
                className={`font-normal text-${textColor} text-sm `}
              >
                {item.content_language}
              </TableCell>
              <TableCell
                data-label="Ссылка"
                className={`font-normal text-${textColor} text-sm `}
              >
                <Link
                  to={item.notes_url}
                  target="_blank"
                  className="underline text-[#A7CCFF] flex gap-1 items-center hover:text-[#3e8bf4]"
                >
                  Ссылка
                  <LinkSvg />
                </Link>
              </TableCell>
              <TableCell
                data-label="Target"
                className={`font-normal text-${textColor} text-sm `}
              >
                {item.country}
              </TableCell>
              <TableCell className="flex gap-4" data-label='Действие'>
                {item.is_sent_to_publisher ? null : (
                  <button
                    onClick={() => setCurrentOrder(item)}
                    className="hover:scale-125 transition-all"
                  >
                    <EditSvg className="text-white w-6 h-6 hover:text-orange-500" />
                  </button>
                )}
                {item.is_sent_to_publisher ? (
                  <div className="inline-flex items-center ">
                    <BookmarkCheck className="w-6 h-6 text-[#8EB67B]" />
                  </div>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="hover:scale-125 transition-all">
                        <Send className="text-white w-6 h-6 hover:text-brandPrimary-1" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">
                          Данное размещение отправится паблишеру
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-red-500 font-bold">
                          Это действие не может быть отменено.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white">
                          Отмена
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-brandPrimary-50 hover:bg-brandPrimary-1 border-2 border-brandPrimary-1 "
                          onClick={() => clickSentPublisher(item.id)}
                        >
                          Отправить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default AddSentPublisherData
