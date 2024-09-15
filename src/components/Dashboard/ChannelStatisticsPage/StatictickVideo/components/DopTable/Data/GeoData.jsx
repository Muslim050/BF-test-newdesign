import React from 'react'
import style from './StatictickData.module.scss'
import { TableCell } from 'src/components/ui/table'

function GeoData({ statistic }) {
  return (
    <>
      {statistic.geo_percentages.map((geo, index) => (
        <>
          <TableCell
            key={index}
            style={{
              textAlign: 'center',
            }}
          >
            {geo.percentage}%
          </TableCell>
        </>
      ))}
    </>
  )
}

export default GeoData
