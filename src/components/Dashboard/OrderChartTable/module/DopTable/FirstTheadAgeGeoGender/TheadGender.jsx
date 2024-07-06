import React from 'react'
import Anonim from 'src/assets/anonim.png'
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
                  <img src={Anonim} alt="Anonim" style={{ width: '20px' }} />
                </div>
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
