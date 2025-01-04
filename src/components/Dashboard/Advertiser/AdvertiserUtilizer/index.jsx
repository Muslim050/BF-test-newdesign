import React from 'react'
import style from './AdvertiserTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import {Table, TableHeader, TableBody, TableRow, TableCell, TableHead} from '@/components/ui/table.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import {ThemeContext} from "@/utils/ThemeContext.jsx";

const AdvertiserTable = ({table, flexRender}) => {
  const { status } = useSelector((state) => state.advertiser)
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchAdvertiser()).then(() => setLoading(false))
  }, [dispatch])


  const { textColor } = React.useContext(ThemeContext)
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])


  return (
    <>

      {status === 'loading' ? (
        <PreLoadDashboard onComplete={() => setLoading (false)} loading={loading} text={'Загрузка рекламодателей'}/>
      ) : (
        <div
          className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen"
        >
          <div className="overflow-y-auto h-full">

          <Table className={`${style.responsive_table} border_design rounded-lg max-h-full`}>
            <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg justify-between">
              {table.getHeaderGroups ().map (headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map (header => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}
                                 className={`text-${textColor} ${header.column.getIsSorted () ? 'underline' : ''}`}>
                        {header.isPlaceholder ? null : (
                          <div className='flex flex-col justify-center h-full py-2'>
                            {
                              header.column.id === 'edit' ? null :
                                <div
                                  className={`flex items-center ${
                                    header.column.getCanSort () ? 'cursor-pointer select-none' : ''
                                  }`}
                                  onClick={header.column.getToggleSortingHandler ()}
                                >
                                {flexRender (
                                  header.column.columnDef.header,
                                  header.getContext ()
                                )}
                                <span className="ml-2">
                                {{
                                  asc: <ChevronUp className='size-4'/>, // Сортировка по возрастанию
                                  desc: <ChevronDown className='size-4'/>, // Сортировка по убыванию
                                }[header.column.getIsSorted ()] ?? (
                                  <ChevronsUpDown className='size-4'/>
                                )}
                              </span>
                              </div>
                            }

                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {table.getRowModel ().rows.length > 0 &&
              <TableBody>
                {table.getRowModel ().rows.map (row => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells ().map (cell => {
                        console.log (cell)
                        return (
                          <TableCell
                            className={`font-normal text-${textColor} text-sm`}
                            key={cell.id}
                            data-label={cell.column.id}
                          >
                            {flexRender (
                              cell.column.columnDef.cell,
                              cell.getContext ()
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            }
          </Table>

          <div className='flex justify-center items-center h-full'>
            {table.getRowModel ().rows.length === 0 && <div>По данному фильтру ничего не найдено!</div>}
          </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdvertiserTable
