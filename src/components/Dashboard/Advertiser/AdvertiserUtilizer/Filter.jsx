import DebouncedInput from "@/components/Dashboard/Advertiser/AdvertiserUtilizer/DebouncedInput.jsx";
import React from "react";
import log from "eslint-plugin-react/lib/util/log.js";

function Filter({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(() => {
    if (filterVariant === 'range') {
      return [];
    }
    return Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000);
  }, [filterVariant, column]);
  const handleFilterChange = React.useCallback(
    (value) => column.setFilterValue(value),
    
    [column]
  );

  return filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue)?.[0] ?? ''}
          onChange={handleFilterChange}

          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue )?.[1] ?? ''}
          onChange={handleFilterChange}

          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={e => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      {sortedUniqueValues.map(value => (
        //dynamically generated select options from faceted values feature
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : (
    <div className='w-full'>

      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ''}
        onChange={handleFilterChange}
        placeholder={`Поиск... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />

    </div>
  )
}

export default Filter