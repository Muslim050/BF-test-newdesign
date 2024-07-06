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
import { CommentSvg, EditSvg, MoreSvg } from '../../../../assets/icons-ui.jsx'
import { hasRole } from '../../../../utils/roleUtils.js'
const PopoverButtons = ({
  advert,
  setShowModalEditAdmin,
  setCurrentOrder,
  copyToClipboard,
  setShowKomment,
                          handleFinishOrder
}) => {
  //нотификация на кнопке ЗАВЕРШИТЬ
  const isOver100Percent =
    (advert.online_views / advert.expected_number_of_views) * 100 >= 100
  const isInProgress = advert.status === 'in_progress'
  //нотификация на кнопке ЗАВЕРШИТЬ

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <MoreSvg className="text-white rounded-full hover:bg-[#ffffff6e]" />
          <>
            {isInProgress && isOver100Percent && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full -top-2.5 -left-2 rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 -top-2.5 -left-2 bg-red-500"></span>
              </span>
            )}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white bg-opacity-30 backdrop-blur-md rounded-lg p-2 text-white">
        <div className="">
          <div className="flex gap-0.5 flex-col">
            {/*Редактировать*/}

            <>
              {hasRole('admin', 'advertiser', 'advertising_agency') &&
              advert.status === 'accepted' ? (
                <Button
                  onClick={() => {
                    setShowModalEditAdmin(true)
                    setCurrentOrder(advert)
                  }}
                  className="w-full px-2 bg-transparent rounded-lg lex gap-2 gradientBorder"
                >
                  <EditSvg className="w-[20px] h-[20px] text-white" />
                  Редактировать
                </Button>
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
                        <Button
                          onClick={() => {
                            setCurrentOrder(advert)
                          }}
                          className="w-full px-2 bg-transparent rounded-lg lex gap-2 gradientBorder"
                        >
                          <CommentSvg className="w-[20px] h-[20px] text-white" />
                          Комментарий
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 bg-white bg-opacity-30 backdrop-blur-md">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              Комментарий
                            </h4>
                            <p className="text-sm text-white">{advert.notes}</p>
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
                </div>
              )}
            </>
            {/*Комментарий*/}

            {/*Оплата*/}
            <div>
              {hasRole('admin') ? (
                <div>
                  <OrderPayment advert={advert} />
                </div>
              ) : null}
            </div>
            {/*Оплата*/}

            {/*Кнопка ЗАвершить*/}
            <div>
              {hasRole('admin') && advert.status === 'in_progress' ? (
                <Button
                  onClick={() => {
                    handleFinishOrder(advert.id)
                  }}
                  className="w-full px-2 bg-transparent rounded-lg lex gap-2 gradientBorder"
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
                  <ListChecks className="w-[20px] h-[20px] text-white" />
                  Завершить
                </Button>
              ) : (
                ''
              )}
            </div>
            {/*Кнопка ЗАвершить*/}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverButtons
