import React from 'react'
import style from './TableInventory.module.scss'
import { TableCell, TableRow } from 'src/components/ui/table'

import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import {showModalVideoLinked} from "../../../../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import {formatDate} from "../../../../utils/formatterDate";
import CircularTable from "@/components/Labrery/Circular/CircularTable.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
function OpenTableSentOrderData ({
                                   data,

                                 }) {
  const user = localStorage.getItem ('role')
  const [expandedRows, setExpandedRows] = React.useState ('')
  const [activeTooltip, setActiveTooltip] = React.useState (null)
  const [activeTooltipp, setActiveTooltipp] = React.useState (null)
  const dispatch = useDispatch ()
  const {showVideoLinked} = useSelector ((state) => state.modal)
  const [id, setId] = React.useState (null)
  const { textColor } = React.useContext(ThemeContext);

  const handleRowClick = (id) => {
    setExpandedRows (id === expandedRows ? false : id)
  }
  const linkedVideo = (id) => {
    dispatch (showModalVideoLinked ())
    inventoryPublish (id)
  }
  const inventoryPublish = (id) => {
    setId (id)
  }
  return (
    <>
      {/*<AnimatePresence>*/}
      {/*  {showVideoLinked && (*/}
      {/*    <ModalUI>*/}
      {/*      <LinkedVideo selectedId={id}/>*/}
      {/*    </ModalUI>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
      {data.map ((inventor, i) => (
        <>
          <TableRow className={style.table__tr}>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
              <div style={{display: 'flex'}}>
                <div>{i + 1}</div>
                {user === 'publisher' || user === 'channel' ? (
                  <>
                    {inventor.status === 'pre_booked' ? (
                      <CircularTable/>
                    ) : null}
                  </>
                ) : null}

                {user === 'admin' ? (
                  <>{inventor.status === 'open' ? <CircularTable/> : null}</>
                ) : null}
              </div>
            </TableCell>
            <TableCell
              style={{position: 'relative'}}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip (i)}
              onMouseLeave={() => setActiveTooltip (null)}
            >
              {inventor.channel === null ? '' : inventor.channel.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{inventor?.id}
                </span>
              )}
            </TableCell>

            <TableCell
              style={{position: 'relative'}}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip (i)}
              onMouseLeave={() => setActiveTooltip (null)}
            >
              {inventor.video_content?.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{inventor.video_content?.id}
                </span>
              )}
            </TableCell>
            {/**/}
            <TableCell className={style.table_td} style={{color: 'blue'}}>
              {(inventor.format === 'preroll' && 'Pre-roll') ||
                (inventor.format === 'midroll1' && 'Mid-roll 1') ||
                (inventor.format === 'midroll2' && 'Mid-roll 2') ||
                (inventor.format === 'midroll3' && 'Mid-roll 3') ||
                (inventor.format === 'midroll4' && 'Mid-roll 4')}
            </TableCell>

             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
              <FormatterView data={inventor.online_views}/>
            </TableCell>

             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
              {inventor.video_content?.category}
            </TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
              {formatDate (inventor.video_content?.publication_time)}

            </TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
              {inventor.video_content.link_to_video === null ? (
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className={style.linkVideo}
                  onClick={() => linkedVideo (inventor.video_content.id)}
                >
                  LinkVideo
                  Прикрепить Видео
                </button>
              ) : (
                <a
                  href={inventor.video_content.link_to_video}
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className={style.linkFile}
                  rel="noreferrer"
                >
                  Link
                  Ссылка на Видео
                </a>
              )}

            </TableCell>
            <TableCell>
              {(user === 'admin' ||
                user === 'advertiser' ||
                user === 'advertising_agency') &&
              inventor.status === 'open' ? (
                <button

                >
                  Edit
                </button>
              ) : null}
            </TableCell>
          </TableRow>


        </>
      ))}
    </>
  )
}

export default OpenTableSentOrderData
