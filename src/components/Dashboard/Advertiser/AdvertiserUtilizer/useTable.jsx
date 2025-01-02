

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import {Monitor, MonitorPlay, MonitorUp} from "lucide-react";

export const useTable = () => {
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { advertisers, status } = useSelector((state) => state.advertiser);

  const numberFilterFn = (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    if (!filterValue) return true; // Показывать все строки, если фильтр пустой
    return value.toString().includes(filterValue.toString()); // Частичное совпадение
  };
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: '№',
        header: () => <span>№</span>,
        enableColumnFilter: false, // Отключить фильтрацию для этой колонки

      },
      {
        accessorFn: (row) => row.name,
        id: 'Наименование Компании',
        cell: (info) => info.getValue(),
        header: () => <span>Наименование Компании</span>,
      },
      {
        accessorFn: (row) => Number(row.cpm_preroll), // Преобразование в число
        id: 'Preroll',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'><Monitor/>Preroll</span>,
        filterFn: numberFilterFn, // Кастомная функция фильтрации

      },
      {
        accessorFn: (row) => row.cpm_preroll_uz,
        id: 'Preroll UZ',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'><Monitor/> Preroll
          <div
            className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline"
          >UZ</div>
        </span>,
        filterFn: numberFilterFn, // Кастомная функция фильтрации

      },
      {
        accessorFn: (row) => row.cpm_tv_preroll,
        id: 'TV Preroll',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'><MonitorPlay/>TV Preroll</span>,
        filterFn: numberFilterFn, // Кастомная функция фильтрации
      },
      {
        accessorFn: (row) => row.cpm_tv_preroll_uz,
        id: 'TV Preroll UZ',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'><MonitorPlay/>TV Preroll <div
          className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline"
        >UZ</div>
        </span>,
        filterFn: numberFilterFn, // Кастомная функция фильтрации
      },
      {
        accessorFn: (row) => row.cpm_top_preroll,
        id: 'Top Preroll',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'><MonitorUp/>Top Preroll</span>,
        filterFn: numberFilterFn, // Кастомная функция фильтрации
      },
      {
        accessorFn: (row) => row.cpm_top_preroll_uz,
        id: 'Top Preroll UZ',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'><MonitorUp/>Top Preroll <div
          className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline"
        >UZ</div></span>,
        filterFn: numberFilterFn, // Кастомная функция фильтрации
      },
      {
        accessorFn: (row) => row.email,
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'>Email</span>,
      },
      {
        accessorFn: (row) => row.phone_number,
        id: 'Номер телефона',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'>Номер телефона</span>,
      },
      {
        accessorFn: (row) => row.advertising_agency?.name,
        id: 'Рекламное агенство',
        cell: (info) => info.getValue(),
        header: () => <span className='flex justify-between items-center gap-1'>Рекламное агенство</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: advertisers || [], // Ensure advertisers is defined
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // Client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // Generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // Generate min/max values for range filter
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return {
    table,
    columns,
    setColumnFilters,
    flexRender
  };
};

