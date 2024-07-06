
import { TableHead, TableRow } from 'src/components/ui/table.jsx'
const headers = [
  { key: 'id', label: '№' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'video_content.name', label: 'Контент' },
  { key: 'format', label: 'Формат' },
  {
    key: 'expected_number_of_views',
    label: 'Прогноз',
  },
  { key: 'category', label: 'Категория' },

  { key: 'publication_time', label: 'Дата начала' },
  { key: 'status', label: 'Статус' },
]
function InventoryRows({ inventory }) {
  const hasOpenStatus = inventory?.some((item) => item.status === 'open')
  const actionsHeaderExists = headers.some((header) => header.key === 'actions')
  const hasOnlineView = inventory.some((item) => item.online_views > 0)

  if (hasOpenStatus && !actionsHeaderExists) {
    headers.push({ key: 'actions', label: 'Действия' })
  }
  if (hasOnlineView) {
    headers.push({ key: 'online_views', label: 'Показы' })
  }

  return (
    <TableRow>
      {headers.map((row) => {
        const user = localStorage.getItem('role')
        const showStatusColumn = user !== 'admin'
        if (row.key === 'is_connected' && !showStatusColumn) {
          return null
        }

        return (
          <TableHead key={row.key} className="text-white">
            {row.label}
          </TableHead>
        )
      })}
    </TableRow>
  )
}

export default InventoryRows
