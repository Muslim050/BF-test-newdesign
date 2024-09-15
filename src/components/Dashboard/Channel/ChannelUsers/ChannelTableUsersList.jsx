import React from 'react'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import { TableCell, TableRow } from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

function ChannelTableUsersList({ channelUsers }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {channelUsers.map((user, i) => (
        <>
          <TableRow>
            <TableCell
              data-label="ID"
              className={`font-normal text-${textColor} text-sm `}
              key={i}
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
              data-label="Канал"
              className={`font-normal text-${textColor} text-sm `}
            >
              {user.channel.name}
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

export default ChannelTableUsersList
