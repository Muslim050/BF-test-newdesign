import React from 'react'
import style from './StatictickVideoTable.module.scss'
import WrapperThead from './components/DopTable/Thead/WrapperThead'
import StatictickVideoThead from './components/StatictickVideoThead'
import StatictickVideoData from './components/StatictickVideoData'
import TheadAgeGenderGeo from './components/TheadAgeGenderGeo'

import {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'src/components/ui/table'
import AgeData from './components/DopTable/Data/AgeData'
import GenderData from './components/DopTable/Data/GenderData'
import GeoData from './components/DopTable/Data/GeoData'

function StatictickVideoTable({ data, loading }) {
  const [expandedRows, setExpandedRows] = React.useState('')

  const handleRowClick = (videoLink) => {
    setExpandedRows((prevExpandedRow) =>
      prevExpandedRow === videoLink ? '' : videoLink,
    )
  }

  const genders = []
  data &&
    data.forEach((statistic) => {
      statistic.gender_percentages.forEach((gen) => {
        if (!genders.includes(gen.gender)) {
          genders.push(gen.gender)
        }
      })
    })
  return (
    <>
      <div className="tableWrapper" style={{ marginTop: '20px' }}>
        {loading ? (
          <div className="loaderWrapper" style={{ height: '20vh' }}>
            <div style={{ color: 'var(--text-color, )' }}>
              {' '}
              Загрузка статистики &nbsp;
            </div>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Видео отсуствуют или нужно обновить токен канала
              </div>
            ) : (
              <div
                className={`border_container rounded-[22px]  mt-2 p-[12px]  glass-background`}
              >
                <div className="tableWrapper__table_title">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#A7CCFF] w-4 h-8 rounded"></div>
                    Статистика видео
                  </div>
                </div>{' '}
                <div
                  className={`border_container rounded-[22px] p-[5px] mt-2  glass-background`}
                >
                  <Table
                    className={`${style.responsive_table} border_design rounded-lg overflow-auto `}
                  >
                    {/* Верхние столбцы */}
                    <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                      <StatictickVideoThead />
                    </TableHeader>
                    {/* Верхние столбцы */}

                    <TableBody>
                      {data &&
                        data.map((statistic, index) => (
                          <>
                            {/* Данные основной таблицы */}
                            <TableRow>
                              <StatictickVideoData
                                statistic={statistic}
                                index={index}
                                handleRowClick={handleRowClick}
                                isExpanded={
                                  expandedRows === statistic.video_link
                                }
                              />
                            </TableRow>
                            {/* Данные основной таблицы */}

                            {expandedRows === statistic.video_link && (
                              <TableRow
                                className={`bg-[#ffffff4d]  rounded-[22px]`}
                              >
                                <TableCell
                                  colSpan="5"
                                  style={{ background: '#FFFFFF4D' }}
                                  className="rounded-[22px]"
                                >
                                  <div className="tableWrapper">
                                    {statistic.age_group_percentages.length ===
                                      0 &&
                                    statistic.gender_percentages.length === 0 &&
                                    statistic.geo_percentages.length === 0 ? (
                                      <div
                                        style={{
                                          fontSize: '15px',
                                          lineHeight: '15px',
                                          color: '#fa8a00',
                                          textAlign: 'center',
                                        }}
                                      >
                                        Введется аналитика данных
                                      </div>
                                    ) : (
                                      <div className="bg-[#0A0F3680] p-[5px] rounded-[22px]">
                                        <Table
                                          className={`${style.responsive_table} border_design rounded-lg overflow-auto `}
                                        >
                                          {' '}
                                          {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
                                          <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                                            <TableRow>
                                              <TheadAgeGenderGeo data={data} />
                                            </TableRow>
                                          </TableHeader>
                                          {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
                                          {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
                                          <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                                            <TableRow
                                              className={style.tableChart__tr}
                                            >
                                              <WrapperThead
                                                statistic={statistic}
                                              />
                                            </TableRow>
                                          </TableHeader>
                                          {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
                                          <GenderData statistic={statistic} />
                                          <AgeData statistic={statistic} />
                                          <GeoData statistic={statistic} />
                                        </Table>
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default StatictickVideoTable
