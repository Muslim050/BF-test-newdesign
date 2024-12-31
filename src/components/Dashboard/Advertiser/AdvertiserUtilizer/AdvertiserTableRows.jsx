import {TableHead, TableRow} from "@/components/ui/table.jsx";
import {hasRole} from "@/utils/roleUtils.js";
import React from "react";
import {ThemeContext} from "@/utils/ThemeContext.jsx";
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react';


const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Наименование Компании' },
  { key: 'cpm_preroll',img: Monitor, label: 'Preroll' },
  {
    key: 'cpm_preroll_uz',img: Monitor, label: 'Preroll', icon:
      <div
      className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline"
    >
      uz
    </div>
  },
  {key: 'cpm_tv_preroll',img: MonitorPlay, label: 'TV Preroll'},
  {
    key: 'cpm_tv_preroll_uz',img: MonitorPlay, label: 'TV Preroll', icon: <div
      className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline"
    >
      uz
    </div>
  },
  {key: 'cpm_top_preroll',img: MonitorUp,  label: 'Top Preroll'},
  {
    key: 'cpm_top_preroll_uz',img: MonitorUp, label: 'Top Preroll', icon: <div
      className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline"
    >
      uz
    </div>
  },

  {key: 'email', label: 'Email'},
  {key: 'phone_number', label: 'Номер телефона'},
  {key: 'advertising_agency', label: 'Рекламное агенство' },
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
              <div className='flex gap-1 items-center'>
                {row.img && <div>{<row.img />}</div>}
                {row.label}
                {
                  row.icon && <div>{row.icon}</div>
                }
              </div>
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