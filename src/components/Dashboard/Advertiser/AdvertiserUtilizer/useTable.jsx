

import React, {useCallback} from 'react';
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
import {
  compareItems,
} from '@tanstack/match-sorter-utils'
import {hasRole} from "@/utils/roleUtils.js";
import {Button} from "@/components/ui/button.jsx";
import { Pencil } from 'lucide-react';
import {Dialog} from "@/components/ui/dialog.jsx";
import EditAdvModal from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/modal/EditAdvModal.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import backendURL from "@/utils/url.js";
import {ThemeContext} from "@/utils/ThemeContext.jsx";


export const useTable = () => {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { advertisers } = useSelector((state) => state.advertiser);
  const [globalFilter, setGlobalFilter] = React.useState('')
  const fuzzySort = (rowA, rowB, columnId) => {
    let dir = 0;

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId] && rowB.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]?.itemRank,
        rowB.columnFiltersMeta[columnId]?.itemRank
      );
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
  };
  const { textColor } = React.useContext(ThemeContext)

  const [currentAdv, setCurrentAdv] = React.useState(null)
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const fetchCpm = useCallback(async (id) => {
    try {
      const token = Cookies.get('token')
      await axios.get(`${backendURL}/order/cpm/?advertiser=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Error fetching CPM:', error)
    }
  }, [])


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
        id: 'Наименование Компании',
        cell: info => info.getValue(),
        filterFn: 'includesStringSensitive', //note: normal non-fuzzy filter column - case sensitive
        header: () => <span>Наименование Компании</span>,
      },
      {
        accessorFn: (row) => Number(row.cpm_preroll), // Преобразование в число
        id: 'Preroll',
        cell: info => info.getValue(),
        filterFn: 'includesString',
        header: () =>
          hasRole('admin') ? (
            <span className="flex items-center gap-1"><Monitor/>Preroll</span>
          ) : null,
      },
      {
        accessorFn: (row) => Number (row.cpm_preroll_uz), // Преобразование в число
        id: 'Preroll UZ',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><Monitor/> Preroll
              <div className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline">UZ</div>
            </span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll,
        id: 'TV Preroll',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><MonitorPlay/>TV Preroll</span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll_uz,
        id: 'TV Preroll UZ',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><Monitor/> TV Preroll
              <div className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline">UZ</div>
            </span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll,
        id: 'Top Preroll',
        cell: info => info.getValue (),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><MonitorUp/>Top Preroll</span>
          ) : null,
      },
      {
        accessorFn: row => row.cpm_tv_preroll_uz,
        id: 'Top Preroll UZ',
        cell: info => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () =>
          hasRole('admin') ? (
            <span className='flex  items-center gap-1'><MonitorUp/>Top Preroll
              <div className="rounded-[8px] px-1 pb-0.5 h-auto text-[16px] bg-[#606afc] inline">UZ</div>
            </span>
          ) : null,
      },
      {
        accessorFn: (row) => row.email,
        id: 'Email',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Email</span>,
      },
      {
        accessorFn: (row) => row.phone_number,
        id: 'Номер телефона',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Номер телефона</span>,
      },
      {
        accessorFn: (row) => row.advertising_agency?.name,
        id: 'Рекламное агенство',
        cell: (info) => info.getValue(),
        filterFn: 'includesString', //note: normal non-fuzzy filter column - case insensitive
        header: () => <span className='flex  items-center gap-1'>Рекламное агенство</span>,
      },
      {
        id: 'edit',
        cell: ({ row }) =>
          hasRole('admin') ? (
            <Button
              variant="link"
              onClick={() => {
                setCurrentAdv(row.original); // Передаем данные строки
                setOpen(true); // Открываем модальное окно
              }}
              className="hover:scale-125 transition-all p-0"
            >
              <Pencil className={`w-[24px] h-[24px] text-white hover:text-orange-500`} />
            </Button>
          ) : null,
        header: () => null,
        enableSorting: false,
        enableFiltering: false,
      },
    ],
    []
  )
  const table = useReactTable({
    data: advertisers || [], // Ensure advertisers is defined
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // Client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // Generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // Generate min/max values for range filter
  });

  return {
    table,
    columns,
    setColumnFilters,
    flexRender,
    globalFilter,
    setGlobalFilter,
    open,
    setOpen,
    currentAdv,
    fetchCpm,
  };
};

