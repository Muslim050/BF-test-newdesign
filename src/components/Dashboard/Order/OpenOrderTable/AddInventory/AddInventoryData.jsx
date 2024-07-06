import React from "react";

import style from "../BindingOrderModal.module.scss";

import {useDispatch, useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion";
import {TableBody, TableCell} from "@/components/ui/table.jsx";
import {Plus, Star} from 'lucide-react';

// import {ReactComponent as Deactivate} from "src/assets/Table/deactivate.svg";
// import {ReactComponent as Linkk} from 'src/assets/link.svg'
import FormatterView from "@/components/Labrery/formatter/FormatterView.jsx";
import ButtonBorder from "@/components/Labrery/ButtonBorder/ButtonBorder.jsx";
import {showModalVerify} from "@/redux/modalSlice.js";
import CircularBadge from "@/components/Labrery/Circular/CircularBadge.jsx";
import ModalUI from "@/components/Labrery/ModalComponents/ModalUI/ModalUI.jsx";
import AdvertStatus from "@/components/Labrery/AdvertStatus/AdvertStatus.jsx";
import VerifyModal from "@/components/Dashboard/Order/BindingOrder/VerifyModal/VerifyModal.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import {LinkSvg} from "@/assets/icons-ui.jsx";
import {formatDate} from "@/utils/formatterDate.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.jsx";
import AdvertiserModalUsers from "@/components/Dashboard/Advertiser/AdvertiserUsers/AdvertiserModalUsers.jsx";

function AddInventoryData ({inventor, selectedRows, setSelectedRows, expandedRows, handleDeactivateInventory}) {
  const dispatch = useDispatch ();
  const [selectedInventoryId, setSelectedInventoryId] = React.useState ('')
  const role = localStorage.getItem ('role')

  const {showVerify} = useSelector ((state) => state.modal)
  const [showModalSelectingVerify, setShowModalSelectingVerify] =
    React.useState (false)

  function handleRowClick (rowId) {
    if (selectedRows.includes (rowId)) {
      setSelectedRows (selectedRows.filter ((id) => id !== rowId));
    } else {
      setSelectedRows ([...selectedRows, rowId]);
    }
  }

  const filteredVideoLink = inventor.find (
    (item) => item.id === selectedInventoryId,
  )
  const { textColor } = React.useContext(ThemeContext);


  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal



  {}
  return (
    <>
      {
        open &&                       <Dialog open={open} onOpenChange={setOpen}> {open &&
          <VerifyModal
            setShowModalSelectingVerify={setShowModalSelectingVerify}
            onInventoryVerify
            expandedRows={expandedRows}
            selectedInventoryId={selectedInventoryId}
            videoLink={filteredVideoLink}
            onClose={handleClose}
          />}
        </Dialog>

        }
      {inventor.map ((advert, i) => (
        <>
          <TableBody
            key={i}
            onClick={() => handleRowClick (advert.id)}
            className={selectedRows.includes (advert.id) ? "selected" : ""}
          >

            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>{i + 1}</TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              {advert.channel?.name}
            </TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>{advert.video_content?.name}</TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              {(advert.format === "preroll" && "Pre-roll") ||
                ("midroll1" && "Mid-roll 1") ||
                ("midroll2" && "Mid-roll 2") ||
                ("midroll3" && "Mid-roll 3") ||
                ("midroll4" && "Mid-roll 4")}
            </TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              <FormatterView data={advert.expected_number_of_views}/>
            </TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              {advert.video_content?.category}
            </TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              <a
                href={`${advert.video_content.link_to_video}&t=${advert.start_at}`}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  gap: "4px",
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor:
                    advert.verified_link_with_timecode === null
                      ? 'not-allowed'
                      : 'pointer',
                }}
                className={`underline ${advert.verified_link_with_timecode === null ? ' text-gray-500' : 'text-[#A7CCFF] hover:text-[#3282f1]'}`}
                onClick={(e) => {
                  if (advert.verified_link_with_timecode === null) {
                    e.preventDefault ()
                  }
                }}
                rel="noreferrer"
              >
                Ссылка
                {
                  advert.verified_link_with_timecode === null ? null : <LinkSvg/>
                }
              </a>
            </TableCell>

            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              {formatDate (advert.video_content?.publication_time)}
            </TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              {
                advert.online_views ?               <FormatterView data={advert.online_views}/> : <div>-----</div>

              }
            </TableCell>
            <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>
              <div className='flex gap-2 items-center'>
                {
                  role === 'admin' && advert.status === "in_use" || advert.status === "inactive" ?
                    <AdvertStatus status={advert.status}/>
                    : <div style={{width: "fit-content"}}>
                          <Button
                            variant='outline'
                            onClick={() => {
                              setOpen(true)
                              setSelectedInventoryId (() => advert.id);
                            }}
                            className='flex gap-1 relative'
                          >
                            <Star/>
                            {advert.video_content.link_to_video ? (
                              <CircularBadge
                                style={{
                                  backgroundColor: "#4833d0",
                                  width: "15px",
                                  height: "15px",
                                  top: "-5px",
                                  right: "-5px",
                                  position: "absolute",
                                }}
                              />
                            ) : (
                              ""
                            )}
                            Проверить
                          </Button>


                    </div>
                }

                {advert.status === "in_use" ? (
                  <div>
                    <ButtonBorder onClick={() => handleDeactivateInventory (advert.id)}>
                      {/*<Deactivate*/}
                      {/*  style={{*/}
                      {/*    width: "16px",*/}
                      {/*    height: "16px",*/}
                      {/*    marginRight: "5px",*/}
                      {/*  }}*/}
                      {/*/>*/}
                      Завершить
                    </ButtonBorder>
                  </div>
                ) : (
                  ""
                )}
              </div>

            </TableCell>
          </TableBody>
        </>
      ))}
    </>
  );
}

export default AddInventoryData;
