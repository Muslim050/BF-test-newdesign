import React from 'react'
import { TableHead, TableRow } from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

function AddSentPublisherRows() {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableRow>
        <TableHead className={`text-${textColor} `}>Паблишер</TableHead>
        <TableHead className={`text-${textColor} `}>Канал</TableHead>
        <TableHead className={`text-${textColor} `}>Формат</TableHead>
        <TableHead className={`text-${textColor} `}>Начало</TableHead>
        <TableHead className={`text-${textColor} `}>Конец</TableHead>

        <TableHead className={`text-${textColor} `}>Показы</TableHead>
        <TableHead className={`text-${textColor} `}>Прогресс</TableHead>

        <TableHead className={`text-${textColor} `}>Бюджет</TableHead>
        <TableHead className={`text-${textColor} `}>Возраст</TableHead>
        <TableHead className={`text-${textColor} `}>Ролик</TableHead>
        <TableHead className={`text-${textColor} `}>Ссылка</TableHead>
        <TableHead className={`text-${textColor} `}>Target</TableHead>
        <TableHead className={`text-${textColor} `}>Действие</TableHead>
      </TableRow>
    </>
  )
}

export default AddSentPublisherRows
