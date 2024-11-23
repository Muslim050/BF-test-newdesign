import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableVideoList from './TableVideoList'
import style from '@/components/Dashboard/Video/TableVideo/TableVideo.module.scss'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import TableVideoRows from '@/components/Dashboard/Video/TableVideo/TableVideoRows.jsx'
import { fetchVideos } from '@/redux/video/videoSlice.js'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";

function TableVideo() {
  const dispatch = useDispatch()
  const { videos, status } = useSelector((state) => state.video)
  const [setId] = React.useState(null)
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const inventoryPublish = (id) => {
    setId(id)
  }
  React.useEffect(() => {
    dispatch(fetchVideos()).then(() => setLoading(false))
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка видео'} />

        ) : (
        <div>
          <div className="border_container h-[calc(100vh-100px)]  sm:h-[calc(100vh-100px)] rounded-[22px] mt-3 p-[3px] glass-background flex flex-col w-full">
            {videos.length ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg h-full`}
              >
                <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                  <TableVideoRows />
                </TableHeader>
                <TableBody>
                  <TableVideoList
                    inventoryPublish={inventoryPublish}
                    videos={videos}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                  />
                </TableBody>
              </Table>
            ) : (
              <div className="empty_list">Список пустой. Добавьте Видео!</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default TableVideo
