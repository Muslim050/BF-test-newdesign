import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchStatistics } from '../../../redux/statisticsSlice'
import { useLocation, useParams } from 'react-router-dom'

export const useOrderChart = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { id } = useParams()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  //фильтрация по дате
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [dataFiltered, setDataFiltered] = React.useState(false)
  //фильтрация по дате

  const orderData = location.state?.advert || {}
  const [getOrder] = React.useState(orderData)

  //Получение отчета
  React.useEffect(() => {
    dispatch(fetchStatistics({ order_id: id }))
      .unwrap()
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)

        setLoading(false)
        toast.error(error?.data?.error?.detail)
      })
  }, [dispatch])
  //Получение отчета

  //Дата
  React.useEffect(() => {
    const startDateObj = new Date(orderData.expected_start_date)
    const endDateObj = orderData.actual_end_date
      ? new Date(orderData.actual_end_date)
      : new Date(orderData.expected_end_date)

    const minDate = startDateObj.toISOString().split('T')[0]
    const maxDate = endDateObj.toISOString().split('T')[0]

    setStartDate(minDate)
    setEndDate(maxDate)
  }, [
    orderData.expected_start_date,
    orderData.expected_end_date,
    orderData.actual_end_date,
  ])
  //Дата

  //При закрытий окна фильтра
  const dataFilteredClose = () => {
    setDataFiltered(false)
    const toastId = toast.loading('Загрузка отчета..')

    dispatch(fetchStatistics({ order_id: id }))
      .then(() => {
        toast.success('Данные успешно обновлены', { id: toastId })
      })
      .catch((error) => {
        toast.error(`Failed to load statistics: ${error.message}`, {
          id: toastId,
        })
      })
      .finally(() => {
        setOpen(false)
      })
  }
  //При закрытий окна фильтра

  //Очищаем фильтр
  const handleClear = () => {
    setDataFiltered(false)

    const startDateObj = new Date(orderData.expected_start_date)
    const endDateObj = orderData.actual_end_date
      ? new Date(orderData.actual_end_date)
      : new Date(orderData.expected_end_date)

    const minDate = startDateObj.toISOString().split('T')[0]
    const maxDate = endDateObj.toISOString().split('T')[0]

    setStartDate(minDate)
    setEndDate(maxDate)

    const toastId = toast.loading('Загрузка отчета...')

    dispatch(fetchStatistics({ order_id: id }))
      .then(() => {
        toast.success('Данные успешно обновлены', { id: toastId })
      })
      .catch((error) => {
        toast.error(`Failed to load statistics: ${error.message}`, {
          id: toastId,
        })
      })
      .finally(() => {
        setOpen(false)
      })
  }
  //Очищаем фильтр

  //Фильтрация по параметрам

  const handleDateStatictick = () => {
    const toastId = toast.loading('Фильтруем отчет...')

    setDataFiltered(true)
    dispatch(fetchStatistics({ order_id: id, startDate, endDate }))
      .then(() => {
        toast.success('Данные успешно обновлены', { id: toastId })
      })
      .catch((error) => {
        toast.error(`Failed to load statistics: ${error.message}`, {
          id: toastId,
        })
      })
      .finally(() => {
        setOpen(false)
      })
  }
  //Фильтрация по параметрам

  return {
    dataFilteredClose,
    handleDateStatictick,
    handleClear,
    dataFiltered,
    orderData,
    getOrder,
    setStartDate,
    startDate,
    setEndDate,
    endDate,
    loading,
    setOpen,
    open,
  }
}
