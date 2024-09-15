import style from 'src/components/Dashboard/OrderChartTable/OrderChartTable.module.scss'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table.jsx'

import FormatterView from 'src/components/Labrery/formatter/FormatterView.jsx'
import { Eye } from 'lucide-react'

import React from 'react'
import TheadAgeGeoGender from './TheadAgeGeoGender.jsx'
import WrapperThead from 'src/components/Dashboard/OrderChartTable/module/DopTable/FirstTheadAgeGeoGender/WrapperThead.jsx'
import AgeData from 'src/components/Dashboard/OrderChartTable/module/DopTable/Data/AgeData.jsx'
import GeoData from 'src/components/Dashboard/OrderChartTable/module/DopTable/Data/GeoData.jsx'
import GenderData from 'src/components/Dashboard/OrderChartTable/module/DopTable/Data/GenderData.jsx'

const DopTable = ({ statistic, data, expandedRows }) => {
  return (
    <TableCell
      colSpan="9"
      style={{ background: '#FFFFFF4D' }}
      // className={`${style.list__item} ${
      //   expandedRows === statistic.video_link
      //     ? style.list__item__open
      //     : ''
      // }`}
      className="rounded-[22px]"
    >
      <div className="bg-[#0A0F3680] p-[5px] rounded-[22px]">
        <Table className="rounded-[22px]">
          <TableHeader style={{ border: 0 }}>
            {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
            <TableRow>
              <TheadAgeGeoGender statistic={statistic} />
            </TableRow>
            {/* Колонки ГЕО Возраст ПОЛ доп таблица  */}
          </TableHeader>

          <TableHeader>
            {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
            <TableRow className="text-white text-sm	font-bold	bg-[#FFFFFF2B]  text-center ">
              <TableHead className="text-white text-center !rounded-t-none  ">
                <Eye className="flex justify-center w-full" />
              </TableHead>
              <WrapperThead statistic={statistic} />
            </TableRow>
            {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
          </TableHeader>

          <TableCell
            data-label="Показов"
            className="text-white text-sm	font-bold text-center"
          >
            <FormatterView data={statistic.online_view_count} />
          </TableCell>
          <GenderData statistic={statistic} />
          <AgeData statistic={statistic} />
          <GeoData statistic={statistic} />
        </Table>
        {/* )} */}
      </div>
    </TableCell>
  )
}

export default DopTable
