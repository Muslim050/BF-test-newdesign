import React from 'react'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import { TableBody, TableCell } from '@/components/ui/table.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'

function AdvertiserAgencyTableUsersList({ advertiserAgencyUsers }) {
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      {advertiserAgencyUsers.map((advertiseruser, i) => (
        <>
          <TableBody>
            <TableCell
              data-label="№"
              key={i}
              className={`font-normal text-${textColor} text-sm `}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Username"
              className={`font-normal text-${textColor} text-sm `}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div> {advertiseruser.username}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID:{advertiseruser.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell
              data-label="Рекламное агентство"
              className={`font-normal text-${textColor} text-sm `}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>{advertiseruser?.advertising_agency?.name}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID:{advertiseruser?.advertising_agency?.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell
              data-label="Имя"
              className={`font-normal text-${textColor} text-sm `}
            >
              {advertiseruser.first_name}
            </TableCell>
            <TableCell
              data-label="Фамилия"
              className={`font-normal text-${textColor} text-sm `}
            >
              {advertiseruser.last_name}
            </TableCell>
            <TableCell
              data-label="Email"
              className={`font-normal text-${textColor} text-sm `}
            >
              {advertiseruser.email}
            </TableCell>
            <TableCell
              data-label="Роль"
              className={`font-normal text-${textColor} text-sm `}
            >
              {advertiseruser.side}
            </TableCell>
            <TableCell
              data-label="Номер"
              className={`font-normal text-${textColor} text-sm `}
            >
              <FormatterPhone phoneNumber={advertiseruser.phone_number} />
            </TableCell>
          </TableBody>
        </>
      ))}
    </>
  )
}

export default AdvertiserAgencyTableUsersList
