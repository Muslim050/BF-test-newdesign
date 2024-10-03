import React from 'react'
import style from './AdvertiserTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import { Table, TableHeader, TableBody } from '@/components/ui/table.jsx'
import AdvertiserTableRows from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTableRows.jsx'
import AdvertiserTableData from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTableData.jsx'

const AdvertiserTable = () => {
  const { advertisers, status } = useSelector((state) => state.advertiser)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAdvertiser())
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div className="text-white">Загрузка рекламодателей &nbsp;</div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div
            className={`border_container rounded-[22px] p-[3px] glass-background h-screen`} // Здесь используется h-screen для высоты на весь экран
          >
            {advertisers.length ? (
              <div className="h-full overflow-y-auto">
                <Table
                  className={`${style.responsive_table} border_design rounded-lg h-full`}
                >
                  {/*Столбцы таблицы*/}
                  <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                    <AdvertiserTableRows />
                  </TableHeader>
                  {/*Столбцы таблицы*/}

                  <TableBody>
                    <AdvertiserTableData advertisers={advertisers} />
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="empty_list">
                Список пустой. Добавьте Рекламодателя!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdvertiserTable
