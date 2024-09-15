import React from 'react'
import style from './InfoCards.module.scss'
import FormatterView from 'src/components/Labrery/formatter/FormatterView'
import FormatterBudjet from 'src/components/Labrery/formatter/FormatterBudjet'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

export function InfoCardsBottom({ totalViews, totalBudget, tableData }) {
  const ndc = totalBudget * 0.12
  const { textColor } = React.useContext(ThemeContext)

  return (
    <div className="flex rounded-xl	 bg-[#FFFFFF2B] max-w-max	 h-[80px] px-4 py-[4px] gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2.5	h-6	bg-[#D1C5FF] rounded-[4px]"></div>
        <h4 className="font-medium " style={{ color: textColor }}>
          Итого
        </h4>
      </div>
      <div className=" gap-2 w-[250px] flex flex-col justify-center text-base h-full  bg-[#FFFFFF1A]	text-white  rounded-xl	  items-normal  px-6	">
        <div
          className="flex items-center justify-between"
          style={{ color: textColor }}
        >
          <div className="text-base font-medium	">Показы</div>
          <FormatterView data={totalViews} />
        </div>
      </div>

      <div className=" gap-2 w-[250px] flex flex-col justify-center text-base h-full  	text-white  rounded-xl	  items-normal  px-6	">
        <div className="flex items-center justify-between">
          <div className="text-base font-medium	" style={{ color: textColor }}>
            Бюджет
          </div>
          <div style={{ color: textColor }}>
            <FormatterBudjet
              budget={totalBudget}
              // data={getOrder.expected_start_date}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs	" style={{ color: textColor }}>
            Цена с НДС
          </div>
          <div className="">
            {ndc > 0 ? (
              <div className="text-xs " style={{ color: textColor }}>
                <FormatterBudjet budget={ndc} className="text-xs" />
              </div>
            ) : (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                ---
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>=</div>

        <div className="text-[24px] " style={{ color: textColor }}>
          <FormatterBudjet
            budget={totalBudget + ndc}
            // data={getOrder.expected_start_date}
          />{' '}
          <div className="text-[10px] " style={{ color: textColor }}>
            Итого с НДС
          </div>
        </div>
      </div>
    </div>
  )
}
