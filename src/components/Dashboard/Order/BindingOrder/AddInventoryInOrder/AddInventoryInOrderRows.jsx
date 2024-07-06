import React from 'react'
import { TableHead, TableRow } from 'src/components/ui/table'

function AddInventoryInOrderRows({ setSelectedRows, inventor, selectedRows }) {
  console.log(inventor)
  return (
    <>
      <TableRow>
        <TableHead className="text-white">
          <input
            type="checkbox"
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedRows(inventor.map((row) => row.id))
              } else {
                setSelectedRows([])
              }
            }}
            checked={selectedRows.length === inventor.length}
          />
        </TableHead>
        <TableHead className="text-white">Паблишер </TableHead>
        <TableHead className="text-white">Название Видео </TableHead>
        <TableHead className="text-white">Формат рекламы </TableHead>
        <TableHead className="text-white">Тайм код рекламы </TableHead>
        <TableHead className="text-white">
          Желаемое количество просмотров{' '}
        </TableHead>
        <TableHead className="text-white">Хронометраж видео </TableHead>
        <TableHead className="text-white">Категория </TableHead>
        <TableHead className="text-white">Время публикаций </TableHead>
        <TableHead className="text-white">Статус </TableHead>
      </TableRow>
    </>
  )
}

export default AddInventoryInOrderRows
