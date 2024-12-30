import {TableHead, TableRow} from "@/components/ui/table.jsx";
import {hasRole} from "@/utils/roleUtils.js";
import React from "react";
import {ThemeContext} from "@/utils/ThemeContext.jsx";


const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Наименование Компании' },
  { key: 'cpm_preroll', label: 'Preroll' },
  { key: 'cpm_preroll_uz', label: 'Preroll UZ' },
  { key: 'cpm_top_preroll', label: 'Top Preroll' },
  { key: 'cpm_top_preroll_uz', label: 'Top Preroll UZ' },
  { key: 'cpm_tv_preroll', label: 'TV Preroll' },
  { key: 'cpm_tv_preroll_uz', label: 'TV Preroll UZ' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Номер телефона' },
  { key: 'advertising_agency', label: 'Рекламное агенство' },
  { key: 'advertising_agency', label: '' },
]

const AdvertiserTableRows = () => {
  const { textColor } = React.useContext(ThemeContext);

  return (
    <TableRow>
      {headers.map((row) => {
        // Проверяем, является ли пользователь администратором
        if (
          hasRole('admin') ||
          (row.key !== 'cpm_preroll' &&
            row.key !== 'cpm_preroll_uz' &&
            row.key !== 'cpm_top_preroll' &&
            row.key !== 'cpm_top_preroll_uz' &&
            row.key !== 'cpm_tv_preroll'  &&
            row.key !== 'cpm_tv_preroll_uz')
        ) {
          return (
            <TableHead key={row.key} className={`text-${textColor}`}>
              {row.label}
            </TableHead>
          )
        } else {
          return null // Не отображаем столбцы cpm_preroll и cpm_mixroll для других ролей
        }
      })}
    </TableRow>
  )
}
export default AdvertiserTableRows;