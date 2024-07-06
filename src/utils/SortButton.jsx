import { ArrowDownUp } from 'lucide-react';
import React from "react";

// eslint-disable-next-line react/prop-types
export function SortButton({ sort, columnKey, sortKey, onClick, row }) {
  return (
    <div className="sorts-button">
      {row}
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sort === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        <ArrowDownUp />
      </button>
    </div>
  );
}
