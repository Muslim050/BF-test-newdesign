import style from "../BindingOrderModal.module.scss";
import React from "react";
import AddSentPublisherRows from "./AddSentPublisherRows";
import AddSentPublisherData from "./AddSentPublisherData";
import {useDispatch, useSelector} from "react-redux";
import AddSendPublisherModal from "./AddSendPublisherModal";
import {motion} from "framer-motion";
import {fetchOnceListSentToPublisher} from "@/redux/order/SentToPublisher.js";
import { Table, TableBody, TableHeader, TableHead } from 'src/components/ui/table'
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import {CommentSvg} from "@/assets/icons-ui.jsx";
import {Button} from "@/components/ui/button.jsx";
import { Plus } from 'lucide-react';
import { X } from 'lucide-react';

export default function AddSentPublisher ({expandedRows, onceOrder}) {
  const { textColor } = React.useContext(ThemeContext);
  const dispatch = useDispatch ();
  const {listsentPublisher} = useSelector ((state) => state.sentToPublisher);
  const [viewNote, setViewNote] = React.useState (false);
  React.useEffect (() => {
    dispatch (fetchOnceListSentToPublisher ({expandedRows}))
  }, []);
  return (
    <div className={` rounded-xl p-[5px]  `}>


      {/*Добавление новой записи*/}
      <div>
        <Table className={`${style.responsive_table} border_design rounded-lg overflow-auto`}>
          {viewNote &&
            <div className="grid grid-cols-5 gap-4">
              <TableHeader className="col-span-5 grid grid-cols-5 bg-[#FFFFFF2B] rounded-t-lg">

              </TableHeader>
            </div>}
          <TableBody>

            {viewNote ?
              <div className='flex justify-end'>
                <Button
                  variant="outline"
                  onClick={() => setViewNote (false)}
                  className=" px-2  rounded-lg  gap-2 my-1 "
                >
                  <X/>
                </Button>
              </div> : null

            }
            {viewNote && (
              <motion.tr initial={{opacity: 0, x: -10, filter: "blur(10px)"}}
                         animate={{opacity: 1, x: 0, filter: "blur(0px)"}}
                         transition={{duration: 0.5}}>
                <AddSendPublisherModal expandedRows={expandedRows} setViewNote={setViewNote} onceOrder={onceOrder}/>
              </motion.tr>
            )}
          </TableBody>
        </Table>


        {viewNote ? null :
        <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
          <Button
            variant="outline"
            onClick={() => setViewNote (!viewNote)}
            className=" px-2  rounded-lg lex gap-2 "
          >

              <div className='flex items-center justify-center gap-2'>
                <Plus/>
                Добавить запись
              </div>

          </Button>
        </div>
        }
      </div>
      {/*Добавление новой записи*/}


      {/*Данные */}
      {listsentPublisher.length > 0 ? (
        <div className={` rounded-xl p-[3px]  glass-background`}>
          <Table
            className={`${style.responsive_table}  rounded-lg overflow-auto`}
          >
            <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
              <AddSentPublisherRows/>
            </TableHeader>
            <TableBody>
              <AddSentPublisherData listsentPublisher={listsentPublisher} expandedRows={expandedRows}
                                    onceOrder={onceOrder}/>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div style={{fontSize: "15px", color: "gray"}} className={style['no-records']}>
          Нет записей, Добавьте размещение
        </div>
      )}
      {/*Данные */}


    </div>
  )
}

