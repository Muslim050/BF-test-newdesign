import React from 'react'
import style from '../../AdvChartTable.module.scss'
import { TableCell, TableRow } from '@/components/ui/table'

function TheadGeo({ statistic }) {
  function findVideoWithThreeGenders(data) {
    return data.find(
      (item) =>
        item?.geo_percentages.length === 4 ||
        item?.geo_percentages.length === 5,
    )
  }

  const result = findVideoWithThreeGenders(statistic)
  const uniqueGenders = Array.from(
    new Set(result?.geo_percentages.map((gen) => gen.country)),
  )
  return (
    <div>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((geo, index) => (
            <TableCell
              key={index}
              className="border-transparent text-white"
              style={{
                fontSize: '12px',
                padding: '6px',
                width: '60px',
                fontWeight: '600',
              }}
            >
              {geo}
            </TableCell>
          ))
        : null}
    </div>
  )
}

export default TheadGeo
