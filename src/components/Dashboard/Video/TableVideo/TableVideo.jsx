import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableVideoList from './TableVideoList'
import style from 'src/components/Dashboard/Video/TableVideo/TableVideo.module.scss'
import { Table, TableBody, TableHeader } from 'src/components/ui/table'
import TableVideoRows from 'src/components/Dashboard/Video/TableVideo/TableVideoRows.jsx'
import { fetchVideos } from '@/redux/video/videoSlice.js'

function TableVideo() {
  const dispatch = useDispatch()
  const { videos, status } = useSelector((state) => state.video)
  const [setId] = React.useState(null)
  const [currentOrder, setCurrentOrder] = React.useState(null)

  const inventoryPublish = (id) => {
    setId(id)
  }
  React.useEffect(() => {
    dispatch(fetchVideos())
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div style={{ color: 'var(--text-color, )' }}>
            Загрузка видео &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="pt-6">
          <div
            className={`border_container rounded-[22px] p-[3px]  glass-background`}
          >
            {videos.length ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
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
