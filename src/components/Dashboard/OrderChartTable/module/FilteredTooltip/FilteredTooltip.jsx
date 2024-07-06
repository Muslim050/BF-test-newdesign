import React from 'react'
import style from './FilteredTooltip.module.scss'

import { X } from 'lucide-react'
// import {ReactComponent as Delete} from 'src/assets/Delete.svg'
import DownloadReport from '../DownloadReport'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateCalendarSvg } from 'src/assets/icons-ui.jsx'
import { Label } from 'src/components/ui/label.jsx'

function FilteredTooltip({
  handleDateStatictick,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsTooltip,
  getOrder,
  handleClear,
}) {
  const handleStartDateChange = (date) => {
    setStartDate(date.toISOString().slice(0, 10)) // Преобразование даты в строку формата YYYY-MM-DD
  }

  const handleEndDateChange = (date) => {
    setEndDate(date.toISOString().slice(0, 10)) // Аналогично для конечной даты
  }

  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label
            style={{
              fontSize: '10px',
              color: 'var(--text-color)',
              fontWeight: '400',
            }}
          >
            Дата начало
          </label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            minDate={new Date(startDate)} // Устанавливаем minDate равным startDate
            maxDate={new Date(endDate)} // Устанавливаем maxDate равным endDate
            className={style.input}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '5px',
          }}
        >
          <label
            style={{
              fontSize: '10px',
              color: 'var(--text-color)',
              fontWeight: '400',
            }}
          >
            Дата конец
          </label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            minDate={new Date(startDate)} // Устанавливаем minDate равным startDate
            maxDate={new Date(endDate)} // Устанавливаем maxDate равным endDate
            className={style.input}
          />
        </div>

        <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
          <button className={style.btn_filtered} onClick={handleDateStatictick}>
            Сортировать
          </button>

          <button onClick={handleClear} className={style.btn_filtered}>
            Delete
          </button>

          <DownloadReport
            getOrder={getOrder}
            startDate={startDate}
            endDate={endDate}
            setIsTooltip={setIsTooltip}
          />
        </div>

        {/*<div style={{width: '100%'}}>*/}

        {/*</div>*/}
      </div>
    </>
  )
}

export default FilteredTooltip
