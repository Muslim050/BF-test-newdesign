import React from 'react'
import { TableHead } from 'src/components/ui/table.jsx'

function OrderChartTwoThead({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.gender_percentages.map((gen) => gen.gender)),
  )

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center "
            >
              {gender === 'female' ? (
                'Ж'
              ) : gender === 'male' ? (
                'М'
              ) : gender === 'Other' ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Anonim                </div>
              ) : (
                <>{gender}</>
              )}
            </TableHead>
          ))
        : null}
    </>
  )
}

export default OrderChartTwoThead
