import React from "react";
import {Button} from "@/components/ui/button.jsx";


function InfoBlock({children}) {
  return (
    <div className="rounded-[22px] bg-[#FFFFFF1A]		h-[40px]  p-2 text-white text-sm	px-5	flex items-center justify-center">
    </div>

    )
}


function OrderChartRow({ selectedAdvName, handleClear, startDate, endDate, startDateMonth,
                         endDateMonth,
                         selectedMonth }) {
  return (

   <>
     {selectedAdvName && (
       <Button
         variant="link"
         onClick={handleClear}
         className="text-[#A7CCFF] px-0"
       >
         Очистить
       </Button>
     )}
     {(startDate || endDate) && (
       <InfoBlock>
         {startDate && (
         <>
           {startDate
             .toLocaleDateString('en-GB')
             .replaceAll('/', '-')}
         </>
         )}
         &nbsp;
         {endDate && (
           <>
             {endDate
               .toLocaleDateString('en-GB')
               .replaceAll('/', '-')}
           </>
         )}
       </InfoBlock>
     )}
     {(startDateMonth || endDateMonth) && (
       <InfoBlock>
       {selectedMonth
             ? selectedMonth
               .toLocaleString('ru-RU', { month: 'long' })
               .toLowerCase()
             : 'All'}
       </InfoBlock>
     )}
     {selectedAdvName && (
       <InfoBlock>
         <div>{selectedAdvName}</div>
       </InfoBlock>
     )}</>
  )
}

export default OrderChartRow;