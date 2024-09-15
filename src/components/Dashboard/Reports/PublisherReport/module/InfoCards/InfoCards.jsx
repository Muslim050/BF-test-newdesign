import FormatterView from 'src/components/Labrery/formatter/FormatterView'
import FormatterBudjet from 'src/components/Labrery/formatter/FormatterBudjet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { truncate } from '@/utils/other.js'

export function InfoCardsTop({
  totalViews,
  totalBudget,
  totalComisy,
  totalComisyAdtech,
  totalbudjetChannel,
  uniqueChannelNameFiltered,
}) {
  return (
    <div className="flex gap-3">
      {/*Просмотры*/}
      <div className="flex flex-col gap-2 justify-center  h-[90px] text-white rounded-[14px]	bg-[#b5e4ca80] items-normal px-6	">
        <div className="text-xs">Просмотры</div>
        {totalViews > 0 && (
          <div className="text-[24px] text-white">
            <FormatterView data={totalViews} />
          </div>
        )}
      </div>
      {/*Просмотры*/}

      {/*Бюджет*/}
      <div className="flex flex-col gap-2 justify-center text-base h-[90px]  bg-[#FFFFFF1A]	text-white  rounded-[14px]	  items-normal  px-6	">
        <div className="text-xs">Бюджет</div>
        <div className="text-[35px] text-white">
          {totalBudget > 0 && (
            <div className="text-[24px] text-white">
              <FormatterBudjet budget={totalBudget} />
            </div>
          )}
        </div>
      </div>
      {/*Бюджет*/}

      {/*Комиссия*/}
      <div className="flex flex-col gap-2 justify-center text-base h-[90px]  bg-[#2a85ff78]	text-white  rounded-[14px]	  items-normal  px-6	">
        <div className="text-xs">Комиссия</div>
        <div className="flex gap-2">
          <div className="text-[35px] text-white">
            {totalComisyAdtech > 0 && (
              <div className="text-[24px] text-white">
                <FormatterBudjet budget={totalComisyAdtech} />
              </div>
            )}
            <div className="text-[10px]">Adtech</div>
          </div>
          <div className="text-[35px] text-white">
            {totalComisy > 0 && (
              <div className="text-[24px] text-white">
                <FormatterBudjet budget={totalComisy} />
              </div>
            )}
            <div className="text-[10px]">Агенство</div>
          </div>
        </div>
      </div>
      {/*Комиссия*/}

      {/*К оплате*/}
      <div className="flex flex-col gap-2 justify-center  h-[90px] text-white rounded-[14px]	bg-[#FFFFFF1A] items-normal px-6	">
        <div className="text-xs">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-context-menu	 hover:text-[#2a85ff78]	">
                  {' '}
                  К оплате - {truncate(uniqueChannelNameFiltered[0], 20)}...
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{uniqueChannelNameFiltered}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {totalbudjetChannel > 0 && (
          <div className="text-[24px] text-white">
            <FormatterBudjet budget={totalbudjetChannel} />
          </div>
        )}
      </div>
      {/*К оплате*/}
    </div>
  )
}
