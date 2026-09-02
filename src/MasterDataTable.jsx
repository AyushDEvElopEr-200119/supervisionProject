import React from "react";
import { flexRender, globalFilteringFeature, rowSortingFeature, tableFeatures, useTable } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

export default function MasterDataTable({ columns, data, globalFilter, onGlobalFilterChange }) {
  const table = useTable({
    features: tableFeatures({ globalFilteringFeature, rowSortingFeature }),
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange,
  });

  return <div className="modern-table-wrap"><table className="modern-table"><thead><tr>{table.getHeaderGroups()[0].headers.map((header) => <th key={header.id} className={header.column.getCanSort() ? "sortable" : ""} onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header, header.getContext())}{header.column.getCanSort() && <span className="sort-icon">{{ asc: <ChevronUp size={13} />, desc: <ChevronDown size={13} /> }[header.column.getIsSorted()] || <ChevronsUpDown size={13} />}</span>}</th>)}</tr></thead><tbody>{table.getRowModel().rows.map((row) => <tr key={row.id}>{row.getVisibleCells().map((cell) => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}{table.getRowModel().rows.length === 0 && <tr><td className="modern-empty" colSpan={columns.length}>No records found.</td></tr>}</tbody></table></div>;
}
