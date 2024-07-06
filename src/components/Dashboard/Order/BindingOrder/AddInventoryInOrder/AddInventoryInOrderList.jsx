import React from 'react'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus'
import FormatterTime from '../../../../Labrery/formatter/FormatterTime'
import FormatterView from '../../../../Labrery/formatter/FormatterView'
import style from './BindingOrderModal.module.scss'
import { TableCell, TableRow } from 'src/components/ui/table'
import {formatDate} from "@/utils/formatterDate.jsx";

function AddInventoryInOrderList({ inventor, selectedRows, setSelectedRows }) {
  function handleRowClick(rowId) {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId))
    } else {
      setSelectedRows([...selectedRows, rowId])
    }
  }
  return (
    <>
      {inventor.map((advert, i) => (
        <>
          <TableRow
            key={i}
            key={i}
            onClick={() => handleRowClick(advert.id)}
            className={selectedRows.includes(advert.id) ? 'selected' : ''}
          >
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              <input
                type="checkbox"
                onChange={() => handleRowClick(advert.id)}
                checked={selectedRows.includes(advert.id)}
              />
            </TableCell>

            <TableCell className={`font-normal text-${textColor} text-sm `}>
              {advert.channel.name}
            </TableCell>
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              {advert.video_content?.name}
            </TableCell>
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              {(advert.format === 'preroll' && 'Pre-roll') ||
                ('midroll1' && 'Mid-roll 1') ||
                ('midroll2' && 'Mid-roll 2') ||
                ('midroll3' && 'Mid-roll 3') ||
                ('midroll4' && 'Mid-roll 4')}
            </TableCell>
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              {advert.start_at}
            </TableCell>
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              <FormatterView data={advert.expected_number_of_views} />
            </TableCell>
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              <FormatterTime data={advert.expected_promo_duration} />
            </TableCell>

            <TableCell className={`font-normal text-${textColor} text-sm `}>
              {advert.video_content?.category}
            </TableCell>
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              {formatDate (advert.video_content?.publication_time)}

            </TableCell>

            <TableCell className={`font-normal text-${textColor} text-sm `}>
              <div>
                <AdvertStatus status={advert.status} />
              </div>
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  )
}

export default AddInventoryInOrderList
