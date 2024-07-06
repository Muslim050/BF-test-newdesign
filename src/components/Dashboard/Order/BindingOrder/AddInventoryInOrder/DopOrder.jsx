import React from 'react'
import FormatterBudjet from '../../../../Labrery/formatter/FormatterBudjet'
import style from './DopOrder.module.scss'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus'
import FormatterView from 'src/components/Labrery/formatter/FormatterView'

import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableHeader,
  TableCell,
} from 'src/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover'
import { toast } from 'sonner'

import { Button } from '../../../../ui/button.jsx'
import { CommentSvg } from '../../../../../assets/icons-ui.jsx'

import { Copy } from 'lucide-react'
import {formatDate} from "@/utils/formatterDate.jsx";
const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Название кампании' },
  { key: 'email', label: 'Формат рекламы' },
  { key: 'phone_number', label: 'Дата начало' },
  { key: 'advertising_agency', label: 'Дата конец' },
  { key: 'advertising_agency', label: 'Количество просмотров' },
  { key: 'advertising_agency', label: 'Бюджет' },
  { key: 'comment', label: 'Комментарий' },
  { key: 'advertising_agency', label: 'Статус' },
]

function DopOrder({ onceOrder }) {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(onceOrder.notes)
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

  return (
    <>
      <Table
        className={`${style.responsive_table} rounded-lg overflow-auto bg-[#0A0F3680]`}
      >
        <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
          <TableRow>
            {headers.map((row) => {
              if (row.key === 'comment' && onceOrder?.notes === '') {
                return null
              }
              return (
                <TableHead key={row.key} className="text-white">
                  <div className="sorts-button">{row.label}</div>
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <>
            <TableRow>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {onceOrder.id}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {onceOrder.name}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {(onceOrder.format === 'preroll' && 'Pre-roll') ||
                  ('mixroll' && 'Mix-roll')}
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>

                {formatDate (onceOrder.expected_start_date)}

              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                {formatDate (onceOrder.expected_end_date)}

              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <FormatterView data={onceOrder.expected_number_of_views} />
              </TableCell>
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <FormatterBudjet
                  budget={onceOrder.budget}
                  data={onceOrder.expected_start_date}
                />
              </TableCell>
              {onceOrder?.notes ? (
                <TableCell
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="link">
                        <CommentSvg className="text-white hover:text-[#2A85FF]" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Комментарий
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {onceOrder.notes}
                          </p>
                          <Button
                            variant="link"
                            className="text-black hover:text-[#2A85FF] w-full flex justify-end"
                            onClick={copyToClipboard}
                          >
                            <Copy />
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              ) : null}
              <TableCell className={`font-normal text-${textColor} text-sm `}>
                <div>
                  <AdvertStatus status={onceOrder.status} />
                </div>
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>
    </>
  )
}

export default DopOrder
