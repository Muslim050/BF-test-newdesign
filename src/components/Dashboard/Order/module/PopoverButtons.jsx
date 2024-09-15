import React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { ListChecks } from 'lucide-react'
import { Copy } from 'lucide-react'
import OrderPayment from '../components/OrderPayment'
import CircularBadge from 'src/components/Labrery/Circular/CircularBadge'
import {
  CheckCompletedSvg,
  CommentSvg,
  EditSvg,
  MoreSvg,
} from '../../../../assets/icons-ui.jsx'
import { hasRole } from '../../../../utils/roleUtils.js'
import { useOrder } from '../OrderTable/useOrder.jsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

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
import EditOrderModal from '../EditOrderModalAdmin/EditOrderModal.jsx'

const PopoverButtons = ({
  advert,
  setShowModalEditAdmin,
  handleFinishOrder,
}) => {
  //нотификация на кнопке ЗАВЕРШИТЬ
  const isOver100Percent =
    (advert.online_views / advert.expected_number_of_views) * 100 >= 100
  const isInProgress = advert.status === 'in_progress'
  //нотификация на кнопке ЗАВЕРШИТЬ

  const [currentOrder, setCurrentOrder] = React.useState(null)
  const { copyToClipboard } = useOrder(currentOrder)
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal
  const { textColor } = React.useContext(ThemeContext)
  console.log(textColor)

  return (
    <div
      className="flex gap-2 items-center justify-between
    "
    >
      {/*Редактировать*/}

      <>
        {advert.status === 'accepted' || advert.status === 'sent' ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="link"
                onClick={() => {
                  setShowModalEditAdmin(true)
                  setCurrentOrder(advert)
                }}
                className="hover:scale-125 transition-all p-0 "
                style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
              >
                <EditSvg className="w-[24px] h-[24px] hover:text-orange-500" />
              </Button>
            </DialogTrigger>
            {open && (
              <EditOrderModal
                onClose={handleClose}
                currentOrder={currentOrder}
              />
            )}
          </Dialog>
        ) : null}
      </>
      {/*Редактировать*/}

      {/*Комментарий*/}
      <>
        {advert.status === 'in_progress' ||
        advert.status === 'finished' ? null : (
          <div>
            {advert?.notes ? (
              <Popover>
                <PopoverTrigger asChild>
                  {/* <Button
                    variant="link"
                    onClick={() => {
                      setCurrentOrder(advert)
                    }}
                    className="hover:scale-125 transition-all p-0 m-0"
                  >
                    <CommentSvg
                      style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
                      className={`w-[24px] h-[24px]   hover:text-green-500`}
                    />
                  </Button> */}

                  <Button
                    variant="link"
                    onClick={() => {
                      setCurrentOrder(advert)
                    }}
                    className="hover:scale-125 transition-all p-0 m-0"
                    style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
                  >
                    <CommentSvg className="w-[24px] h-[24px] hover:text-green-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full  bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
                  <div className="grid gap-4 ">
                    <div className="w-80">
                      <h4 className="pb-4 font-medium leading-none text-white border-b-[#F9F9F926] border-b">
                        Комментарий
                      </h4>
                      <p className="text-sm text-white break-words pt-4">
                        {advert.notes}
                      </p>
                      <div className="flex mt-10 float-right">
                        <Button
                          style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
                          variant="link"
                          className=" hover:text-[#2A85FF] "
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
          </div>
        )}
      </>
      {/*Комментарий*/}

      {/*Кнопка ЗАвершить*/}
      <div>
        {hasRole('admin') && advert.status === 'in_progress' ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="link"
                className="hover:scale-125 transition-all p-0 relative"
                style={{ color: 'var(--text-color)' }} // Динамическая переменная для цвета текста
              >
                {isOver100Percent && (
                  <CircularBadge
                    style={{
                      backgroundColor: 'red',
                      width: '15px',
                      height: '15px',
                    }}
                  />
                )}
                <CheckCompletedSvg
                  className={`w-[24px] h-[24px]  hover:text-red-500`}
                />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500">
                  Вы уверены, что хотите финишировать заказ?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white">
                  Это действие не может быть отменено.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-white">
                  Отмена
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-300 hover:bg-red-500 border-2 border-red-500 "
                  onClick={() => handleFinishOrder(advert.id)}
                >
                  Завершить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          ''
        )}
      </div>
      {/*Кнопка ЗАвершить*/}

      {/*Оплата*/}
      <div>
        {hasRole('admin') ? (
          <div>
            <OrderPayment advert={advert} />
          </div>
        ) : null}
      </div>
      {/*Оплата*/}
    </div>
  )
}

export default PopoverButtons
