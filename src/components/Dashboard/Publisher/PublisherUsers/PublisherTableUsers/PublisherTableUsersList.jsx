import React from 'react'
import FormatterPhone from 'src/components/Labrery/formatter/FormatterPhone'

import { TableCell, TableRow } from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

function PublisherTableUsersList({ publisherUsers }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {publisherUsers.map((user, i) => (
        <>
          <TableRow>
            <TableCell
              data-label="№"
              key={i}
              className={`font-normal text-${textColor} text-sm `}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Логин"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.username}
            </TableCell>
            <TableCell
              data-label="Паблишер"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.publisher?.name}
            </TableCell>
            <TableCell
              data-label="Имя"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.first_name}
            </TableCell>
            <TableCell
              data-label="Фамилия"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.last_name}
            </TableCell>
            <TableCell
              data-label="Email"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.email}
            </TableCell>
            <TableCell
              data-label="Роль"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.side}
            </TableCell>
            <TableCell
              data-label="Номер"
              className={`font-normal text-${textColor} text-sm `}
            >
              <FormatterPhone phoneNumber={user.phone_number} />
            </TableCell>
          </TableRow>
        </>
      ))}
    </>
  )
}

export default PublisherTableUsersList
