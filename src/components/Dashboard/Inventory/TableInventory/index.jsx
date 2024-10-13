import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InventoryData from './InventoryData.jsx'
import style from './TableInventory.module.scss'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import Filter from '../module/Filter.jsx'
import InventoryRows from '@/components/Dashboard/Inventory/TableInventory/InventoryRows.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  fetchInventory,
  resetInventory,
} from '@/redux/inventory/inventorySlice.js'
import { fetchChannel } from '@/redux/channel/channelSlice.js'
import { FilterSvg } from '@/assets/icons-ui.jsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

function TableInventory() {
  const dispatch = useDispatch()
  const { inventory, status } = useSelector((state) => state.inventory)
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const [filterLoading, setFilterLoading] = React.useState(false)
  const [selectedOptionChannel, setSelectedOptionChannel] = React.useState('')
  const [selectedFormat, setSelectedFormat] = React.useState('')
  const [selectedChannel, setSelectedChannel] = React.useState(null)
  const [selectedChannelName, setSelectedChannelName] = React.useState(null)
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const channel = useSelector((state) => state.channel.channel)

  const handleSelectFormat = (value) => {
    setSelectedFormat(value)
  }
  const handleSelectChange = (value) => {
    setSelectedOptionChannel(value)
    if (value) {
      const option = JSON.parse(value)
      setSelectedChannel(option.id)
      setSelectedChannelName(option.name)
    } else {
      setSelectedChannel(null)
      setSelectedChannelName('')
    }
  }
  const handleClear = () => {
    setFilterLoading(true)
    setSelectedChannel(null)
    setSelectedOptionChannel('')
    setSelectedAdvName('')
    setSelectedChannelName(null)
    setSelectedFormat('')
    dispatch(resetInventory()) // Dispatch the reset action
    setFilterLoading(false)
    dispatch(fetchInventory({}))
  }
  const handleSearch = () => {
    setFilterLoading(true)
    dispatch(
      fetchInventory({
        id: selectedChannel,
        format: selectedFormat,
      }),
    )
      .then(() => {
        setFilterLoading(false)
      })
      .catch(() => {
        setFilterLoading(false) // Ensure loading is reset on error
      })
  }
  React.useEffect(() => {
    dispatch(fetchChannel())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(fetchInventory({}))
  }, [dispatch])

  return (
    <>
      {status === 'loading' ? (
        <div className="loaderWrapper">
          <div style={{ color: 'var(--text-color, )' }}>
            {' '}
            Загрузка инвентарей &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="">
          <div className="tableWrapper__table_title">
            <div className="flex items-center justify-end w-full">
              <div
                style={{ display: 'flex', alignItems: 'end', gap: '10px' }}
                // className="py-4"
              >
                {filterLoading && (
                  <div className="loaderWrapper" style={{ height: '5vh' }}>
                    <div
                      className="spinner"
                      style={{ width: '25px', height: '25px' }}
                    ></div>
                  </div>
                )}

                <div style={{ display: 'flex' }}>
                  <div className="flex gap-2 items-center">
                    {(selectedChannel || selectedFormat) && (
                      <Button
                        variant="link"
                        onClick={handleClear}
                        className="text-[#A7CCFF] px-0"
                      >
                        Очистить
                      </Button>
                    )}
                    {selectedFormat && (
                      <div className="rounded-lg	border border-solid border-[#D9D9D9] h-[48px] p-2 text-white text-sm	px-5	flex items-center justify-center">
                        <div>{selectedFormat}</div>
                      </div>
                    )}
                    {selectedChannelName && (
                      <div className="rounded-lg	border border-solid border-[#D9D9D9] h-[48px] p-2 text-white text-sm	px-5	flex items-center justify-center">
                        <div>{selectedChannelName}</div>
                      </div>
                    )}
                  </div>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                    >
                      <FilterSvg className="w-4 h-4 mr-2" /> Фильтр
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 mr-3.5 bg-white bg-opacity-30 backdrop-blur-md border-0 rounded-xl">
                    <div className="">
                      <div className="flex items-center gap-2 pb-4">
                        <div className="w-2.5	h-6	bg-[#B5E4CA] rounded-[4px]"></div>
                        <h4
                          className="font-medium "
                          style={{ color: 'var(--text-color )' }}
                        >
                          Фильтры
                        </h4>
                      </div>
                      <p
                        className="text-xs	  py-3 border-t border-[#F9F9F9] "
                        style={{ color: 'var(--text-color )' }}
                      >
                        Выберите необходимые параметры
                      </p>
                      <Filter
                        channel={channel}
                        selectedOptionChannel={selectedOptionChannel}
                        selectedFormat={selectedFormat}
                        handleSelectFormat={handleSelectFormat}
                        handleSelectChange={handleSelectChange}
                        selectedChannel={selectedChannel}
                        handleSearch={handleSearch}
                        handleClear={handleClear}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/*Таблица*/}
          <div
            className={`border_container h-[calc(100vh-210px)] sm:h-[calc(100vh-100px)] rounded-[22px] mt-3 p-[3px] glass-background flex flex-col w-full`}
          >
            {inventory ? (
              <Table
                className={`${style.responsive_table} border_design rounded-lg `}
              >
                <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                  <InventoryRows inventory={inventory} />
                </TableHeader>
                <TableBody>
                  <InventoryData
                    inventory={inventory}
                    setCurrentOrder={setCurrentOrder}
                  />
                </TableBody>
              </Table>
            ) : (
              <div className="empty_list">
                Список пустой. Добавьте инвентарь!
              </div>
            )}
          </div>
          {/*Таблица*/}
        </div>
      )}
    </>
  )
}

export default TableInventory
