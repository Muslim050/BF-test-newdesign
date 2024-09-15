import React, {useState} from 'react'
import FormatterTime from 'src/components/Labrery/formatter/FormatterTime'
import { TableCell, TableRow } from 'src/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip.jsx'
import { truncate } from 'src/utils/other.js'
import { Dialog } from 'src/components/ui/dialog.jsx'
import { Button } from 'src/components/ui/button.jsx'
import ModalLinkedVideo from './LinkedVideo.jsx'
import {formatDate} from "@/utils/formatterDate.jsx";
import {EditSvg, LinkSvg} from "@/assets/icons-ui.jsx";
import { Plus } from 'lucide-react';
import EditVideoModal from "@/components/Dashboard/Video/TableVideo/EditVideoModal.jsx";
import {hasRole} from "@/utils/roleUtils.js";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

function TableVideoList({ videos, setCurrentOrder, currentOrder }) {
  const [selectedId, setSelectedId] = useState('')
  const { textColor } = React.useContext(ThemeContext);

  // Модальное окно LinkedVideo
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно LinkedVideo

  // Модальное окно EditVideo
  const [edit, setEdit] = React.useState(false)
  const handleCloseEdit = () => {
    setEdit(false)
  }
  // Модальное окно EditVideo

  return (
    <>

      <Dialog open={open} onOpenChange={setOpen} >
        {open && (
          <ModalLinkedVideo onClose={handleClose} selectedId={selectedId} />
        )}
      </Dialog>

      <Dialog open={edit} onOpenChange={setEdit}>
        {edit && (
          <EditVideoModal onClose={handleCloseEdit} currentOrder={currentOrder} />
        )}
      </Dialog>



      {videos.map((video, i) => (
        <>
          <TableRow key={i}>
            <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
              <div className="flex items-center relative">
                <div>{i + 1}</div>

                {video.link_to_video === null ? (
                  <div className="w-2	 h-6 bg-[#05c800] rounded-[2px] absolute -left-2"></div>
                ) : null}
              </div>
            </TableCell>
            <TableCell data-label="Канал" className={`font-normal text-${textColor} text-sm `}>
              {video.channel.name}
            </TableCell>
            <TableCell data-label="Название Видео" className={`font-normal text-${textColor} text-sm `}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>{truncate(video.name, 20)}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID:{video.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell data-label="Категория"  className={`font-normal text-${textColor} text-sm `}>
              {video.category}
            </TableCell>
            <TableCell data-label="Начало"  className={`font-normal text-${textColor} text-sm `}>
              {formatDate (video.publication_time)}
            </TableCell>
            <TableCell data-label="Хрон видео	" className={`font-normal text-${textColor} text-sm `}>
              <FormatterTime data={video.duration} />
            </TableCell>
            <TableCell data-label="Ссылка" className={`font-normal text-${textColor} text-sm w-0\t`}>
              <div className='flex gap-4 '>
                {video.link_to_video === null ? (
                  <Button
                    variant="link"
                    onClick={() => {
        setSelectedId(video.id)
        setOpen(!open)
      }}
                    className="text-[#ff9105] flex items-center gap-1	underline underline-offset-2  hover:text-[#ffaa3e] group px-0"
                  >
                    <Plus className="w-5 h-5 "/>
                    Прикрепить Видео
                  </Button>
                ) : (
                <a
                  href={video.link_to_video}
                  target="_blank"
                  className="text-[#A7CCFF] flex items-center gap-1	underline underline-offset-2  hover:text-[#006bff] group"
                  rel="noreferrer"
                >
                <LinkSvg className=' group-hover:text-[#006bff]'/>
                Ссылка на Видео
              </a>
            )}
            {hasRole('admin') && !video.link_to_video ? (
                <Button
                  variant="link"
                  onClick={() => {
                    setCurrentOrder(video)
                    setEdit(!edit)
                  }}
                  className={`text-${textColor} hover:text-brandPrimary-50 p-1`}
                >
                  <EditSvg className="w-5 h-5 " />
                </Button>

            ) : null}
              </div>
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  )
}

export default TableVideoList
