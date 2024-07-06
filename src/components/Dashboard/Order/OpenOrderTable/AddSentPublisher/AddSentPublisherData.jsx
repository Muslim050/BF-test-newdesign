import React from "react";
import {Link} from "react-router-dom";
import {FaEdit} from "react-icons/fa";

import EditSendPublisherModal from "./EditSendPublisherModal";
import { toast } from 'react-hot-toast'
import { TableCell, TableRow } from 'src/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import PopoverEditView from "./PopoverEditView";
import {useDispatch} from "react-redux";
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import FormatterBudjet from "@/components/Labrery/formatter/FormatterBudjet.jsx";
import {formatDate} from "@/utils/formatterDate.jsx";
import {fetchOnceListSentToPublisher, sentToPublisherButton} from "@/redux/order/SentToPublisher.js";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import { BookmarkCheck } from 'lucide-react';
import {EditSvg, LinkSvg} from "@/assets/icons-ui.jsx";
import { Send } from 'lucide-react';
import { Plus } from 'lucide-react';

function AddSentPublisherData ({listsentPublisher, expandedRows, onceOrder}) {
  const [editOpen, setEditOpen] = React.useState (false);
  const [currentOrder, setCurrentOrder] = React.useState (null)
  const [iD, setID] = React.useState ('')
  const dispatch = useDispatch ()
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState (null);
  const { textColor } = React.useContext(ThemeContext);


  const clickSentPublisher = (itemID) => {
    const confirmDelete = window.confirm ("Данный заказ отправляется паблишеру?");
    if (confirmDelete) {
      dispatch (sentToPublisherButton ({id: itemID}))
        .then (() => {
          toast.success ("Запись успешно отправлен");
          dispatch (fetchOnceListSentToPublisher ({expandedRows}));
        })
        .catch ((error) => {
          toast.error (error.message);
          dispatch (fetchOnceListSentToPublisher ({expandedRows}));
        });
    } else {
      toast.info ("Операция отменена");
    }
  };

  return (
    <>
      {listsentPublisher.map ((item, i) => (

        <React.Fragment key={i}>
          {currentOrder === item ? (
            <>
              <EditSendPublisherModal
                item={item}
                expandedRows={expandedRows}
                onCancel={() => setCurrentOrder (null)}
                onSave={(updatedData) => {
                  setCurrentOrder (null);
                }}
                setCurrentOrder={setCurrentOrder}
              />

            </>
          ) : (
            <TableRow>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{item.publisher?.name}</TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{item.channel?.name}</TableCell>
              {/*<td>*/}
              {/*  <Link to={item.promo_file}>Видео</Link>*/}
              {/*</td>*/}
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{(item.format === 'preroll' && 'Pre-roll') || ('mixroll' && 'Mix-roll')}</TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
                {formatDate (item.start_date)}
                - {formatDate (item.end_date)}

              </TableCell>

             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
                <div className='flex gap-4'>
                  <FormatterView data={item.ordered_number_of_views}/>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className='bg-[#5670f1] rounded-full'
                        onClick={() => setOpenPopoverIndex (i)}>
                        <Plus/>
                      </button>
                    </PopoverTrigger>
                    {openPopoverIndex === i && (
                      <PopoverContent className="w-80 bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                      <PopoverEditView item={item} expandedRows={expandedRows} setOpenPopoverIndex={setOpenPopoverIndex} onceOrder={onceOrder}/>
                    </PopoverContent>)}
                  </Popover>
                </div>
              </TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}><FormatterBudjet budget={item.budget}/></TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{item.age_range}</TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{item.content_language}</TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>
                <Link to={item.notes_url} target='_blank' className='underline text-[#A7CCFF] flex gap-1 items-center hover:text-[#3e8bf4]'>
                  Ссылка
                <LinkSvg/>
                </Link>
              </TableCell>
             <TableCell data-label="ID" className={`font-normal text-${textColor} text-sm `}>{item.country}</TableCell>
              <TableCell className='flex gap-4'>
                {
                  item.is_sent_to_publisher ? null :
                    <button onClick={() => setCurrentOrder (item)}>
                      <EditSvg className='text-white w-6 h-6 hover:text-brandPrimary-1'   />
                    </button>
                }
                {
                  item.is_sent_to_publisher ?
                    <div className='inline-flex items-center '>
                      <BookmarkCheck className='w-6 h-6 text-[#8EB67B]'/>
                    </div>
                  :
                    <button onClick={() => clickSentPublisher (item.id)}>
                      <Send className='text-white w-6 h-6 hover:text-brandPrimary-1'/>
                    </button>
                }
              </TableCell>
            </TableRow>

          )}
        </React.Fragment>

      ))}
    </>
  );
}

export default AddSentPublisherData;
