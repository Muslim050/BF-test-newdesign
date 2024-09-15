import React from 'react'
import style from './FilteredTooltip.module.scss'
import { X } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import {ReactComponent as Delete} from 'src/assets/Delete.svg'
import ru from 'date-fns/locale/ru'
import DownloadReport from '../DownloadReport'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from 'src/components/ui/select.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import { FormatSvg, TvSvg } from 'src/assets/icons-ui.jsx'
import { Label } from '@/components/ui/label'
import { Button } from 'src/components/ui/button.jsx'
import { Trash2 } from 'lucide-react'

function FilteredTooltip({
  isTooltip,
  handleDateStatictick,
  startDate,
  endDate,
  closeH,
  advdata,
  tableData,
  selectedOptionAdv,
  handleSelectChangeADV,
  handleClear,
  selectedOrderName,
  selectedAdvName,
  loadingDots,
  handleEndDateChange,
  handleStartDateChange,
  setStartDateMonth,
  setEndDateMonth,
  startDateMonth,
  endDateMonth,
  selectedAdv,
  handleDateChange,
  selectedMonth,
  setIsTooltip,
}) {
  return (
    <>
      <div className={style.profile__wrapper__tooltip}>
        {/*  */}
        <Select onValueChange={handleSelectChangeADV} value={selectedOptionAdv}>
          <div className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-md">
            <div
              className="text-xs flex gap-2 "
              style={{ color: 'var(--text-color )' }}
            >
              <TvSvg /> Рекламодатель
            </div>
            <SelectTrigger
              className="rounded-none border-0 p-0 h-auto pl-[25px] "
              style={{ color: 'var(--text-color )' }}
            >
              <SelectValue placeholder="Выбрать рекламодателя" />
            </SelectTrigger>
          </div>
          <SelectContent className="w-full">
            <SelectGroup>
              {advdata.map((option) => (
                <SelectItem
                  style={{ color: 'var(--text-color )' }}
                  key={option.id}
                  value={JSON.stringify(option)}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*  */}

        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            gap: '10px',
            position: 'relative',
          }}
        >
          {loadingDots && (
            <div
              style={{
                position: 'absolute',
                background: '#5f5f5f1c',
                width: '100%',
                height: '100%',
                zIndex: '3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className={style.loader}></div>
            </div>
          )}

          <div className="grid">
            <Label
              htmlFor="terms"
              className=" pb-2"
              style={{ color: 'var(--text-color )' }}
            >
              Дата начало
            </Label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd-MM-yyyy"
              className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-md w-full text-white"
            />
          </div>

          <div className="grid">
            <Label
              htmlFor="terms"
              className=" pb-2"
              style={{ color: 'var(--text-color )' }}
            >
              Дата конец
            </Label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-md w-full text-white"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>

        <div className="grid pt-2">
          <Label
            htmlFor="terms"
            className=" pb-2"
            style={{ color: 'var(--text-color )' }}
          >
            Месяц
          </Label>
          <DatePicker
            onChange={handleDateChange}
            selected={selectedMonth}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[45px] rounded-md w-full text-white"
            disabled={!!startDate || !!endDate} // Здесь используется приведение dateRange к булевому типу
            locale={ru}
          />
        </div>

        <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
          {
            <Button
              variant="ghost"
              className="bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
              onClick={handleDateStatictick}
              disabled={!selectedAdvName}
            >
              Сортировать
            </Button>
          }
          {startDate || endDate || endDateMonth || startDateMonth ? (
            <DownloadReport
              selectedAdv={selectedAdv}
              selectedAdvName={selectedAdvName}
              setIsTooltip={setIsTooltip}
              tableData={tableData}
              startDate={startDate}
              endDate={endDate}
              endDateMonth={endDateMonth}
              startDateMonth={startDateMonth}
            />
          ) : null}
          {(startDate || endDate || selectedAdvName) && (
            <div>
              <Button
                onClick={handleClear}
                className="bg-red-400 rounded-lg hover:bg-red-500 text-white no-underline hover:text-white h-[44px] w-full"
              >
                {/*<Delete style={{ width: '23px', height: '23px' }} />*/}
                <Trash2 />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FilteredTooltip
