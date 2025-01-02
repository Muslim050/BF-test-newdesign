import React from 'react'
import style from './AdvertiserTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import {Table, TableHeader, TableBody, TableRow, TableCell} from '@/components/ui/table.jsx'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import {useTable} from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/useTable.jsx";
import Filter from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/Filter.jsx";
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import {ThemeContext} from "@/utils/ThemeContext.jsx";

const AdvertiserTable = () => {
  const { status } = useSelector((state) => state.advertiser)
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchAdvertiser()).then(() => setLoading(false))
  }, [dispatch])
  const {
    table, // Экземпляр таблицы
    flexRender
  } = useTable();

  const { textColor } = React.useContext(ThemeContext)
  console.log (table.getRowModel ().rows.length)
  return (
    <>
      {status === 'loading' ? (

        <PreLoadDashboard onComplete={() => setLoading(false)} loading={loading} text={'Загрузка рекламодателей'} />

        ) : (
        <div
          className="border_container h-[calc(100vh-150px)]  rounded-[22px] mt-3 p-[3px] glass-background flex flex-col">

          <Table className={`${style.responsive_table} border_design rounded-lg h-full`}>
            <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg justify-between">
            {table.getHeaderGroups().map (headerGroup => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map (header => {
                  return (
                    <th  key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div className='flex flex-col justify-between h-full py-2'>
                          <div
                            {...{
                              className: `
                              ${header.column.getCanSort ()
                                ? 'cursor-pointer select-none flex items-center'
                                : ''}
                              `,
                              onClick: header.column.getToggleSortingHandler (),
                            }}
                          >
                            {flexRender (
                              header.column.columnDef.header,
                              header.getContext ()
                            )}
                            <span className="ml-2">
                              {{
                                asc: <ChevronUp  className='size-4'/>, // Сортировка по возрастанию
                                desc: <ChevronDown className='size-4'/>, // Сортировка по убыванию
                                null: ('asda'), // Иконка по умолчанию
                              }[header.column.getIsSorted()] ?? (
                                <ChevronsUpDown className='size-4'/>
                              )}
                            </span>
                          </div>
                          {header.column.getCanFilter () ? (
                            <div>
                              <Filter column={header.column}/>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
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
          {/*{advertisers.length ? (*/}
          {/*  // <Table*/}
          {/*  //   className={`${style.responsive_table} border_design rounded-lg h-full`}*/}
          {/*  // >*/}
          {/*  //   /!*Столбцы таблицы*!/*/}
          {/*  //   <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">*/}
          {/*  //     <AdvertiserTableRows />*/}
          {/*  //   </TableHeader>*/}
          {/*  //   /!*Столбцы таблицы*!/*/}
          {/*  //*/}
          {/*  //   <TableBody>*/}
          {/*  //     <AdvertiserTableData advertisers={advertisers} />*/}
          {/*  //   </TableBody>*/}
          {/*  // </Table>*/}
          {/*) : (*/}
          {/*  <div className="empty_list">*/}
          {/*    Список пустой. Добавьте Рекламодателя!*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      )}
    </>
  )
}

export default AdvertiserTable
