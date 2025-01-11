

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender, getPaginationRowModel
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import {hasRole} from "@/utils/roleUtils.js";


export const usePublihserUtilizer = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { publisher, total_count } = useSelector((state) => state.publisher)
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, // Начинаем с 0
    pageSize: 20,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1, // Используем индекс строки
        id: 'id',
        cell: info => info.row.index + 1, // Начинаем с 1
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>№</span>,
      },
      {
        accessorFn: row => row.name,
        id: 'Имя',
        cell: info => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Имя</span>,
      },
      {
        accessorFn: (row) => row.email, // Преобразование в число
        id: 'Email',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () =>
          <span>Email</span>
      },
      {
        accessorFn: (row) => row.phone_number,
        id: 'Номер телефона',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Номер телефона</span>,
      },
    ],
    []
  )
  const filteredColumns = columns.filter((column) => {
    // Если колонка зависит от роли admin, проверяем условие
    if (column.id === 'Preroll' || column.id === 'Preroll UZ' || column.id === 'TV Preroll' || column.id === 'TV Preroll UZ' || column.id === 'Top Preroll' || column.id === 'Top Preroll UZ') {
      return hasRole('admin');
    }
    return true; // Для всех остальных колонок
  });

  const table = useReactTable({
    data: publisher.results || [], // Данные из Redux
    columns: filteredColumns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const newPagination =
          typeof updater === 'function' ? updater(prev) : updater;
        return { ...prev, ...newPagination };
      });
    },
    pageCount: Math.ceil(total_count / pagination.pageSize), // Общее количество страниц
    manualPagination: true, // Указываем, что используем серверную пагинацию
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    pagination
  };
};
