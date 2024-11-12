import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import style from './AdvChartTable.module.scss'
import OrderChartThead from './AdvChartThead'
import AdvChartData from './AdvChartData'
import { InfoCardsBottom } from './components/InfoCardsBottom/InfoCards'
import FilteredTooltip from './components/FilteredTooltip/FilteredTooltip'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice'
import FilteredTooltipMain from './components/FilteredTooltip/FilteredTooltipMain'
import { fetchShortList } from '@/redux/order/orderSlice'
import { format } from 'date-fns'
import { clearStatistics, fetchStatistics } from '@/redux/statisticsSlice.js'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { FilterSvg } from '@/assets/icons-ui.jsx'
import { Button } from '@/components/ui/button.jsx'
import {
  TableRow,
  TableHeader,
  Table,
  TableHead,
  TableBody,
} from '@/components/ui/table'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
function AdvertiserReportTable() {
  const dispatch = useDispatch()
  const [expandedRows, setExpandedRows] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  //
  const data = useSelector((state) => state.statistics.statistics.results)
  const ShortListdata = useSelector((state) => state.order.shortListData)
  const advdata = useSelector((state) => state.advertiser.advertisers)
  //
  const [isTooltip, setIsTooltip] = React.useState(false)
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  //
  const [selectedAdv, setSetSelectedAdv] = React.useState(null)
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const [selectedOptionAdv, setSelectedOptionAdv] = React.useState('')
  //
  const [selectedOrderName, setSelectedOrderName] = React.useState(null)
  const [selectedOptionOrder, setSelectedOptionOrder] = React.useState('')
  const [startDateMonth, setStartDateMonth] = React.useState(null)
  const [endDateMonth, setEndDateMonth] = React.useState(null)
  const [dateRange, setDateRange] = React.useState([])
  const [selectedMonth, setSelectedMonth] = React.useState('')

  React.useEffect(() => {
    setStartDateMonth(dateRange[0])
    setEndDateMonth(dateRange[1])
  }, [dateRange])
  //Выбор рекламадателя
  const handleSelectChangeADV = (value) => {
    setSelectedOptionAdv(value)

    if (value) {
      const option = JSON.parse(value)
      setSetSelectedAdv(option.id)
      setSelectedAdvName(option.name)
    } else {
      setSetSelectedAdv(null)
      setSelectedAdvName('')
    }
  }
  //Выбор рекламадателя

  //useEffect
  React.useEffect(() => {
    dispatch(fetchAdvertiser({}))
  }, [dispatch])
  React.useEffect(() => {
    if (selectedAdv) {
      dispatch(fetchShortList({ id: selectedAdv }))
    }
  }, [dispatch, selectedAdv])
  //useEffect

  const formattedStartDate = startDate
    ? format(startDate, 'yyyy-MM-dd')
    : undefined
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : undefined

  const handleDateChange = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    setDateRange([startOfMonth, endOfMonth])
    setSelectedMonth(startOfMonth)
    setEndDateMonth(dateRange[1])
    setStartDateMonth(dateRange[0])
  }
  // Отправка запроса с фильтра

  const handleDateStatictick = () => {
    if (selectedAdv) {
      setLoading(true) // Start loading
      const formattedStartDateMonth = startDateMonth
        ? format(startDateMonth, 'yyyy-MM-dd')
        : undefined
      const formattedEndDateMonth = endDateMonth
        ? format(endDateMonth, 'yyyy-MM-dd')
        : undefined

      const useMonthBasedDates = startDateMonth !== undefined
      dispatch(
        fetchStatistics({
          adv_id: selectedAdv,
          startDate: useMonthBasedDates
            ? formattedStartDateMonth
            : formattedStartDate,
          endDate: useMonthBasedDates
            ? formattedEndDateMonth
            : formattedEndDate,
        }),
      )
        .then(() => {
          setLoading(false) // Stop loading when the request is successful
        })
        .catch(() => {
          setLoading(false) // Stop loading also when there is an error
        })
      setIsTooltip(!isTooltip)
    } else {
      console.log('No advertiser selected')
    }
  }
  // Отправка запроса с фильтра

  const handleProfileClick = () => {
    setIsTooltip(!isTooltip)
  }
  const closeH = () => {
    setIsTooltip(!isTooltip)
    setStartDate(startDate)
    setEndDate(endDate)
  }
  const handleClear = () => {
    setSelectedOrderName(null)
    setSelectedAdvName(null)
    setSelectedOptionAdv('')
    setSelectedOptionOrder('')
    setStartDate(null)
    setEndDate(null)
    setSelectedMonth('')
    setDateRange([])
    dispatch(clearStatistics())
  }
  const handleStartDateChange = (date) => {
    setStartDate(date) // Keep the Date object for DatePicker
  }
  const handleEndDateChange = (date) => {
    setEndDate(date) // Keep the Date object for DatePicker
  }

  let totalViews = 0
  let totalBudget = 0
  let totalAnalitickView = 0
  let tableData = []

  return (
    <>
      {loading ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading}text="Загрузка отчета" />

        ) : (
        <div className="tableWrapper" style={{ overflow: 'visible' }}>
          <div className="tableWrapper__table_title">
            <div className="flex justify-end items-center gap-2">
              {selectedAdvName && (
                <Button
                  variant="link"
                  onClick={handleClear}
                  className="text-[#A7CCFF] px-0"
                >
                  Очистить
                </Button>
              )}
              {(startDate || endDate) && (
                <div className="rounded-lg	border border-solid border-[#D9D9D9] h-[48px] p-2 text-white text-sm	px-5	flex items-center justify-center">
                  <div>
                    {' '}
                    {startDate && (
                      <>
                        {startDate
                          .toLocaleDateString('en-GB')
                          .replaceAll('/', '-')}
                      </>
                    )}
                    &nbsp;
                    {endDate && (
                      <>
                        {endDate
                          .toLocaleDateString('en-GB')
                          .replaceAll('/', '-')}
                      </>
                    )}
                  </div>
                </div>
              )}
              {(startDateMonth || endDateMonth) && (
                <div className="rounded-lg	border border-solid border-[#D9D9D9] h-[48px] p-2 text-white text-sm	px-5	flex items-center justify-center">
                  <div>
                    {' '}
                    {selectedMonth
                      ? selectedMonth
                          .toLocaleString('ru-RU', { month: 'long' })
                          .toLowerCase()
                      : 'All'}
                  </div>
                </div>
              )}
              {selectedAdvName && (
                <div className="rounded-lg	border border-solid border-[#D9D9D9] h-[48px] p-2 text-white text-sm	px-5	flex items-center justify-center">
                  <div>{selectedAdvName}</div>
                </div>
              )}

              <Popover>
                <PopoverTrigger asChild className="">
                  <Button
                    variant="ghost"
                    className=" flex justify-end mb-4 bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
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
                    <FilteredTooltip
                      isTooltip={isTooltip}
                      handleDateStatictick={handleDateStatictick}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      closeH={closeH}
                      advdata={advdata}
                      selectedOptionAdv={selectedOptionAdv}
                      handleSelectChangeADV={handleSelectChangeADV}
                      ShortListdata={ShortListdata}
                      //
                      setSelectedOptionOrder={setSelectedOptionOrder}
                      selectedOptionOrder={selectedOptionOrder}
                      selectedAdv={selectedAdv}
                      handleClear={handleClear}
                      selectedAdvName={selectedAdvName}
                      selectedOrderName={selectedOrderName}
                      //
                      handleStartDateChange={handleStartDateChange}
                      handleEndDateChange={handleEndDateChange}
                      handleDateChange={handleDateChange}
                      setStartDateMonth={setStartDateMonth}
                      setEndDateMonth={setEndDateMonth}
                      startDateMonth={startDateMonth}
                      endDateMonth={endDateMonth}
                      selectedMonth={selectedMonth}
                      setIsTooltip={setIsTooltip}
                      tableData={tableData}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            className={`border_container rounded-[22px] p-[3px] glass-background h-[calc(100vh-270px)]`} // Здесь используется h-screen для высоты на весь экран
          >
            {data && data.length ? (
              <>
                <div className="h-full overflow-y-auto">
                  <Table
                    className={`${style.responsive_table} border_design rounded-lg overflow-auto`}
                  >
                    {' '}
                    {/* Колонки основной таблица  */}
                    <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                      <OrderChartThead statistic={tableData}/>
                    </TableHeader>
                    {/* Колонки основной таблица  */}
                    <TableBody>
                      {data &&
                        data.length &&
                        data.map ((statistic, index) => {
                          totalBudget += statistic.budget
                          totalAnalitickView += statistic.online_view_count
                          totalViews += statistic.online_view_count
                          tableData.push (statistic)
                          return (
                            <React.Fragment key={statistic.video_link}>
                              {/* Данные таблицы  */}
                              <tr
                                key={index}
                                style={{borderBottom: '1px solid #f9f9f92b'}}
                              >
                                <AdvChartData
                                  statistic={statistic}
                                  index={index}
                                  isExpanded={
                                    expandedRows === statistic.video_link
                                  }
                                />
                              </tr>
                            </React.Fragment>
                          )
                        })}
                    </TableBody>
                  </Table>
                  {/* Ячейки с инфо Итого:	 */}

                  {/* Ячейки с инфо Итого:	 */}
                </div>
                <div className="w-full justify-center flex py-4">
                  <InfoCardsBottom
                    totalViews={totalViews}
                    totalBudget={totalBudget}
                    totalAnalitickView={totalAnalitickView}
                    tableData={data}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 justify-center h-[100%] 	">
                Установите фильтр для отображения данных!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdvertiserReportTable
