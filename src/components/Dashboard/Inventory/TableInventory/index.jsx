import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../module/Filter.jsx'
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
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import TableSearchInput from "@/shared/TableSearchInput/index.jsx";
import {useInventory} from "@/components/Dashboard/Inventory/TableInventory/useInventory.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";

function TableInventory() {
  const dispatch = useDispatch()
  const {  status } = useSelector((state) => state.inventory)
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const [filterLoading, setFilterLoading] = React.useState(false)
  const [selectedOptionChannel, setSelectedOptionChannel] = React.useState('')
  const [selectedFormat, setSelectedFormat] = React.useState('')
  const [selectedChannel, setSelectedChannel] = React.useState(null)
  const [selectedChannelName, setSelectedChannelName] = React.useState(null)
  const {results} = useSelector((state) => state.channel.channel)

  const [loading, setLoading] = React.useState(true)
  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    pagination,
  } = useInventory();


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
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
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
    dispatch(fetchChannel({
      page: 1, // API использует нумерацию с 1
      pageSize: 100,
    }))
  }, [dispatch])

  React.useEffect(() => {
    dispatch(
      fetchInventory({
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
      })
    ).then(() => setLoading(false));
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  return (
    <>
      {(status === 'loading' || loading) ? (
        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка инвентарей'} />
        ) : (
        <div className="">

          <div className="tableWrapper__table_title">
            <div className="flex items-center justify-end w-full">
              <div style={{display: 'flex', alignItems: 'end', gap: '10px'}}>
                {filterLoading && (
                  <div className="loaderWrapper" style={{height: '5vh'}}>
                    <div
                      className="spinner"
                      style={{width: '25px', height: '25px'}}
                    ></div>
                  </div>
                )}
                <div className='flex justify-end mt-3'>
                  <TableSearchInput
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter (String (value))}
                    className={`p-2 font-lg shadow border border-block `}
                  />
                </div>
                <div style={{display: 'flex'}}>
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
                      <div
                        className="rounded-3xl	border border-solid border-[#D9D9D9] h-[40px] p-2 text-white text-sm	px-5	flex items-center justify-center">
                        <div>{selectedFormat}</div>
                      </div>
                    )}
                    {selectedChannelName && (
                      <div
                        className="rounded-3xl	border border-solid border-[#D9D9D9] h-[40px] p-2 text-white text-sm	px-5	flex items-center justify-center">
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
                      <FilterSvg className="w-4 h-4 mr-2"/> Фильтр
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 mr-3.5 bg-white bg-opacity-30 backdrop-blur-md border-0 rounded-xl">
                    <div className="">
                      <div className="flex items-center gap-2 pb-4">
                        <div className="w-2.5	h-6	bg-[#B5E4CA] rounded-[4px]"></div>
                        <h4
                          className="font-medium "
                          style={{color: 'var(--text-color )'}}
                        >
                          Фильтры
                        </h4>
                      </div>
                      <p
                        className="text-xs	  py-3 border-t border-[#F9F9F9] "
                        style={{color: 'var(--text-color )'}}
                      >
                        Выберите необходимые параметры
                      </p>
                      <Filter
                        channel={results}
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
            className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination table={table} flexRender={flexRender}/>
            </div>
          </div>
          <Pagination table={table} pagination={pagination} />
        </div>
      )}

    </>
  )
}

export default TableInventory
