import React from 'react'
import { TableHead, TableRow } from 'src/components/ui/table'
import {ThemeContext} from "@/utils/ThemeContext.jsx";

function AddSentPublisherRows () {
  const { textColor } = React.useContext(ThemeContext);

  return (
    <>
      <TableRow>
        <TableHead  className={`text-${textColor} `}>Паблишер
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Канал
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Формат
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Период
        </TableHead>

        <TableHead  className={`text-${textColor} `}>Показы
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Бюджет
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Целевая аудитория
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Язык контента
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Ссылка
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Настройка
        </TableHead>
        <TableHead  className={`text-${textColor} `}>Действие
        </TableHead>
      </TableRow>
    </>
  )
}

export default AddSentPublisherRows
