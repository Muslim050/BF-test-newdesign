import React from 'react'
import FormatterView from '../../../../Labrery/formatter/FormatterView'
import style from './BindingOrderTable.module.scss'
import { TableCell, TableRow } from 'src/components/ui/table'

import { AnimatePresence } from 'framer-motion'
import VerifyModal from '../VerifyModal/VerifyModal'
// import { ReactComponent as Linkk } from 'src/assets/link.svg'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus'
import { useDispatch, useSelector } from 'react-redux'
import { showModalVerify } from 'src/redux/modalSlice'
import ModalUI from 'src/components/Labrery/ModalComponents/ModalUI/ModalUI'
import ButtonContainer from './ButtonContainer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../ui/tooltip.jsx'
import { truncate } from '../../../../../utils/other.js'
import { Link } from 'lucide-react'
import {formatDate} from "@/utils/formatterDate.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

function OpenOrderTableData({
  getOrder,
  expandedRows,
  onRemoveInventory,
  onInventoryPrebook,
  onRemoveDeactivate,
  statusOr,
  sortedData,
}) {
  const [showModalSelectingVerify, setShowModalSelectingVerify] =
    React.useState(false)
  const [selectedInventoryId, setSelectedInventoryId] = React.useState('')
  const [activeTooltip, setActiveTooltip] = React.useState(null)
  const { textColor } = React.useContext(ThemeContext);
  const handleInventoryPrebook = (inventory_id) => {
    onInventoryPrebook(expandedRows, inventory_id)
  }

  const handleDeactivateInventory = (inventory_id) => {
    onRemoveDeactivate(inventory_id)
  }
  const handleRemoveInventory = (inventory_id) => {
    onRemoveInventory(expandedRows, inventory_id)
  }
  const filteredVideoLink = getOrder.find(
    (item) => item.id === selectedInventoryId,
  )
  const { showVerify } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const showButtonClick = () => {
    dispatch(showModalVerify())
  }

  return (
    <>
      <AnimatePresence>
        {showVerify && (
          <ModalUI>
            <VerifyModal
              setShowModalSelectingVerify={setShowModalSelectingVerify}
              onInventoryVerify
              expandedRows={expandedRows}
              selectedInventoryId={selectedInventoryId}
              videoLink={filteredVideoLink}
            />
          </ModalUI>
        )}
      </AnimatePresence>

      {sortedData().map((invetar, i) => (
        <TableRow key={i}>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            {i + 1}
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <div>{truncate(invetar.channel.name, 20)}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ID: {invetar.id}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">
                  <div>{truncate(invetar.video_content.name, 20)}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ID: {invetar.video_content.id}</p>
                  <p>Name: {invetar.video_content.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            {(invetar.format === 'preroll' && 'Pre-roll') ||
              ('mixroll' && 'Mix-roll')}
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            <FormatterView data={invetar.expected_number_of_views} />
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            {invetar.video_content.category}
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            <a
              href={`${invetar.video_content.link_to_video}&t=${invetar.start_at}`}
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',

                cursor:
                  invetar.verified_link_with_timecode === null
                    ? 'not-allowed'
                    : 'pointer',
              }}
              className={`gap-1  no-underline ${
                invetar.verified_link_with_timecode === null
                  ? 'text-gray-400'
                  : 'text-[#A7CCFF] hover:underline-offset-2 hover:underline hover:text-[#0767eb]'
              }
                  `}
              onClick={(e) => {
                if (invetar.verified_link_with_timecode === null) {
                  e.preventDefault()
                }
              }}
              rel="noreferrer"
            >
              Ссылка
              <Link className="w-3.5	" />
            </a>
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>

            {formatDate (invetar.video_content?.publication_time)}

          </TableCell>

          {invetar.online_views ? (
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              <FormatterView data={invetar.online_views} />
            </TableCell>
          ) : (
            <TableCell className={`font-normal text-${textColor} text-sm `}>
              ----
            </TableCell>
          )}

          <TableCell className={`font-normal text-${textColor} text-sm `}>
            <div>
              <AdvertStatus
                status={invetar.status}
                endDate={invetar.deactivation_date}
              />
            </div>
          </TableCell>
          <TableCell className={`font-normal text-${textColor} text-sm `}>
            <ButtonContainer
              invetar={invetar}
              statusOr={statusOr}
              handleInventoryPrebook={handleInventoryPrebook}
              setSelectedInventoryId={setSelectedInventoryId}
              handleDeactivateInventory={handleDeactivateInventory}
              handleRemoveInventory={handleRemoveInventory}
              showModalVerify={showModalVerify}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default OpenOrderTableData
