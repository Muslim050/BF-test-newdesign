import {TableHead, TableRow} from "@/components/ui/table.jsx";
import {hasRole} from "@/utils/roleUtils.js";


const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Наименование Компании' },
  { key: 'cpm_preroll', label: 'CPM_Preroll' },
  { key: 'cpm_mixroll', label: 'CPM_Mixroll' },
  { key: 'cpm_preroll_uz', label: 'Target_Preroll' },
  { key: 'cpm_mixroll_uz', label: 'Target_Mixroll' },
  { key: 'email', label: 'Email' },
  { key: 'phone_number', label: 'Номер телефона' },
  { key: 'advertising_agency', label: 'Рекламное агенство' },
  { key: 'advertising_agency', label: '' },

]

const AdvertiserTableAgencyRows = () => {
  return (
    <TableRow>
      {headers.map((row) => {
        // Проверяем, является ли пользователь администратором
        if (
          hasRole('admin') ||
          (row.key !== 'cpm_preroll' &&
            row.key !== 'cpm_mixroll' &&
            row.key !== 'cpm_preroll_uz' &&
            row.key !== 'cpm_mixroll_uz')
        ) {
          return (
            <TableHead key={row.key} className="text-white">
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
export default AdvertiserTableAgencyRows;