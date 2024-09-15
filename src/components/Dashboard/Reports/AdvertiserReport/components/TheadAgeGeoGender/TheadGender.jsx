import React from 'react'
import style from '../../AdvChartTable.module.scss'
import { TableCell, TableRow } from 'src/components/ui/table'

function TheadGender({ statistic }) {
  function findVideoWithThreeGenders(data) {
    return data.find((item) => item.gender_percentages.length === 3)
  }

  const result = findVideoWithThreeGenders(statistic)
  const uniqueGenders = Array.from(
    new Set(result.gender_percentages.map((gen) => gen.gender)),
  )
  return (
    <div className="">
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <TableCell
              key={index}
              className="border-transparent text-white "
              style={{
                fontSize: '12px',
                padding: '6px',
                width: '60px',
                fontWeight: '600',
              }}
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
                  Anonim{' '}
                </div>
              ) : (
                <>{gender}</>
              )}
            </TableCell>
          ))
        : null}
    </div>
  )
}

export default TheadGender
