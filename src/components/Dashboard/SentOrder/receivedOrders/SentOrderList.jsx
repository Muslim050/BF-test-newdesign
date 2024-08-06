import React from 'react'
import { TableCell, TableRow } from 'src/components/ui/table'

import ModalSentOrder from './ModalSentOrder'
import OpenTableSentOrder from '../OpenTableSentOrder/OpenTableSentOrder'
import { formatDate } from '../../../../utils/formatterDate'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { CommentSvg, OpenSvg } from '@/assets/icons-ui.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { PackagePlus } from 'lucide-react'

function SentOrderList({ listsentPublisher }) {
  const { textColor } = React.useContext(ThemeContext)

  const [openPopoverIndex, setOpenPopoverIndex] = React.useState(null)
  const [expandedRows, setExpandedRows] = React.useState('')
  const [showKomment, setShowKomment] = React.useState(false)
  const [currentOrder, setCurrentOrder] = React.useState(null)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentOrder.notes)
      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', {
          duration: 3000,
        })
      })
      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', {
          duration: 3000,
        })
      })
  }

  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)
  }

  // Модальное окно AdvertiserModal
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const closePopover = () => {
    console.log('Closing Popover') // Отладка

    setIsPopoverOpen(false)
  }

  // Модальное окно AdvertiserModal

  return (
    <>
      {/*<AnimatePresence>*/}
      {/*  {showKomment && (*/}
      {/*    <ModalUI>*/}
      {/*      <CommentSentOrderModal*/}
      {/*        setShowKomment={setShowKomment}*/}
      {/*        currentOrder={currentOrder}*/}
      {/*      />*/}
      {/*    </ModalUI>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
      {listsentPublisher.map((item, i) => (
        <>
          <TableRow>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Кампания"
              className={`font-normal text-${textColor} text-sm `}
            >
              {item.order_name}
            </TableCell>
            <TableCell
              data-label="Формат"
              className={`font-normal text-${textColor} text-sm `}
            >
              {(item.format === 'preroll' && 'Pre-roll') ||
                ('midroll1' && 'Mid-roll 1') ||
                ('midroll2' && 'Mid-roll 2') ||
                ('midroll3' && 'Mid-roll 3') ||
                ('midroll4' && 'Mid-roll 4')}
            </TableCell>
            <TableCell
              data-label="Начало"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate(item.start_date)}
            </TableCell>
            <TableCell
              data-label="Конец"
              className={`font-normal text-${textColor} text-sm `}
            >
              {formatDate(item.end_date)}
            </TableCell>
            <TableCell
              data-label="Ролик"
              className={`font-normal text-${textColor} text-sm `}
            >
              <a
                href={item.promo_file}
                target="_blank"
                className='text-[#A7CCFF] underline hover:text-[#3e8bf4]"'
                rel="noreferrer"
              >
                Видео
              </a>
            </TableCell>
            <TableCell
              data-label="План показов"
              className={`font-normal text-${textColor} text-sm `}
            >
              <FormatterView data={item.ordered_number_of_views} />
            </TableCell>
            <TableCell
              data-label="Статус"
              className={`font-normal text-${textColor} text-sm `}
            >
              <AdvertStatus status={item.order_status} />
            </TableCell>
            <TableCell
              data-label="Действия"
              style={{ position: 'relative', display: 'flex', gap: '10px' }}
            >
              <button
                onClick={() => handleRowClick(item.id)}
                className="relative "
              >
                <OpenSvg className="text-white hover:text-brandPrimary-1" />
              </button>
              {item.order_status === 'finished' ? null : (
                <TableCell style={{ display: 'contents' }}>
                  {item?.notes_text ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          onClick={() => {
                            setCurrentOrder(item)
                          }}
                        >
                          <CommentSvg className="w-[24px] h-[24px] text-white hover:text-brandPrimary-1" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-80"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(255, 255, 255, 0.364) 0%, rgba(255, 255, 255, 0.119) 99.67%)',
                          backdropFilter: 'blur(5px)',
                        }}
                      >
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none text-white">
                              Комментарий
                            </h4>
                            <p className="text-sm text-white">{item.notes}</p>
                            <div className="flex ">
                              <Button
                                variant="link"
                                className="text-black hover:text-[#2A85FF] "
                                onClick={copyToClipboard}
                              >
                                <Copy />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                </TableCell>
              )}

              {item.order_status === 'in_progress' ||
              item.order_status === 'finished' ? null : (
                <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button onClick={() => setIsPopoverOpen(true)}>
                      <PackagePlus className="hover:text-brandPrimary-1" />
                    </button>
                  </PopoverTrigger>
                  {isPopoverOpen && (
                    <PopoverContent className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                      <ModalSentOrder
                        setIsPopoverOpen={setIsPopoverOpen}
                        item={item}
                      />
                    </PopoverContent>
                  )}
                </Popover>
              )}
            </TableCell>
          </TableRow>

          {expandedRows === item.id && (
            <TableRow>
              <TableCell
                colSpan="10"
                className="p-3 rounded-xl	border_container bg-white bg-opacity-30 backdrop-blur-md"
              >
                <OpenTableSentOrder item={item} />
              </TableCell>
            </TableRow>
          )}
        </>
      ))}
    </>
  )
}

export default SentOrderList
