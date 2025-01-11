import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import style from "./TablePagination.module.scss";
import {ChevronDown, ChevronsUpDown, ChevronUp} from "lucide-react";
import React from "react";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

const TablePagination = ({flexRender,table, renderSubComponent }) => {
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
      <Table className={`${style.responsive_table} border_design rounded-lg `}>
        <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg justify-between">
          {table.getHeaderGroups ().map (headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map (header => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}
                             className={`text-${textColor} ${header.column.getIsSorted () ? 'underline ' : ''}`}>
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
                <>
                  <TableRow key={row.id}>
                    {row.getVisibleCells ().map (cell => {
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

                  {row.getIsExpanded() && (
                    <TableRow >
                      <TableCell className='p-0' colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })} {/* Передача строки в компонент */}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )
            })}
          </TableBody>
        }
      </Table>
      {
        table.getRowModel ().rows.length === 0 &&
        <div className='flex justify-center items-center h-full py-10'>
          <div>По данному фильтру ничего не найдено!</div>
        </div>
      }
      </>
  )
}



export default TablePagination