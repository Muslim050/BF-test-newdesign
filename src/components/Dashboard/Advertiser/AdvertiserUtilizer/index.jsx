import React from 'react'
import style from './AdvertiserTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import { Table, TableHeader, TableBody } from '@/components/ui/table.jsx'
import AdvertiserTableRows from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTableRows.jsx'
import AdvertiserTableData from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTableData.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";

const AdvertiserTable = () => {
  const { advertisers, status } = useSelector((state) => state.advertiser)
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchAdvertiser()).then(() => setLoading(false))
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка рекламодателей'} />

        ) : (
        <div className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">
          {advertisers.length ? (
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
          ) : (
            <div className="empty_list">
              Список пустой. Добавьте Рекламодателя!
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AdvertiserTable
