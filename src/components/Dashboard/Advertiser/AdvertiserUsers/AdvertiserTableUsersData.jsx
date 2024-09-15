import React from 'react'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import style from './AdvertiserTableUsers.module.scss'
import {TableBody, TableCell} from "@/components/ui/table.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";

function AdvertiserTableUsersData({ advertiserUsers }) {
  const { textColor } = React.useContext(ThemeContext);

  return (
    <>
      {advertiserUsers.map((advertiseruser, i) => {
        return (
          <TableBody key={advertiseruser.id} className={style.table__tr}>
           <TableCell data-label="№" className={`font-normal text-${textColor} text-sm `}>{advertiseruser.id}</TableCell>
            <TableCell data-label="Username" className={`font-normal text-${textColor} text-sm `}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>              {advertiseruser.username}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID:{advertiseruser.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell data-label="Рекламодатель"  className={`font-normal text-${textColor} text-sm `}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <div>{advertiseruser.advertiser.name}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ID: {advertiseruser.advertiser.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
           <TableCell data-label="Имя" className={`font-normal text-${textColor} text-sm `}> {advertiseruser.first_name}</TableCell>
           <TableCell data-label="Фамилия" className={`font-normal text-${textColor} text-sm `}> {advertiseruser.last_name}</TableCell>
           <TableCell data-label="Email" className={`font-normal text-${textColor} text-sm `}> {advertiseruser.email}</TableCell>
           <TableCell data-label="Роль" className={`font-normal text-${textColor} text-sm `}> {advertiseruser.side === 'advertiser' && 'Рекламодатель'}</TableCell>

           <TableCell data-label="Номер" className={`font-normal text-${textColor} text-sm `}>
              <FormatterPhone phoneNumber={advertiseruser.phone_number} />
            </TableCell>
          </TableBody>
        )
      })}
    </>
  )
}

export default AdvertiserTableUsersData
