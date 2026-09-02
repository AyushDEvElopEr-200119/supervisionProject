import React, { useState } from "react";
import { MoreVertical, Plus, Search } from "lucide-react";
import MasterDataTable from "./MasterDataTable";
import ActionMenu from "./ActionMenu";

const masterData = {
  "Category Master": [
    ["CAT-001", "Formal Shirt", "Men's clothing", "Active"],
    ["CAT-002", "Jacket", "Men's clothing", "Active"],
    ["CAT-003", "Sneakers", "Footwear", "Active"],
  ],
  "Sub Category Master": [
    ["SUB-001", "Casual Shirt", "Shirts", "Active"],
    ["SUB-002", "Denim Jacket", "Jackets", "Active"],
    ["SUB-003", "Running Shoes", "Sneakers", "Inactive"],
  ],
  "Brand Master": [
    ["BR-001", "Northstar", "Premium", "Active"],
    ["BR-002", "Urban Thread", "Standard", "Active"],
    ["BR-003", "Everlane", "Premium", "Active"],
  ],
  "Unit Master": [
    ["UNT-001", "Piece", "pcs", "Active"],
    ["UNT-002", "Pair", "pair", "Active"],
    ["UNT-003", "Kilogram", "kg", "Active"],
  ],
  "Tax Master": [
    ["TAX-001", "GST 5%", "5%", "Active"],
    ["TAX-002", "GST 12%", "12%", "Active"],
    ["TAX-003", "GST 18%", "18%", "Active"],
  ],
  "Warehouse Master": [
    ["WH-001", "Main Warehouse", "New Delhi", "Active"],
    ["WH-002", "East Distribution", "Kolkata", "Active"],
    ["WH-003", "West Distribution", "Mumbai", "Inactive"],
  ],
  "Attribute Master": [
    ["ATT-001", "Color", "Red, Blue, Green", "Active"],
    ["ATT-002", "Size", "S, M, L, XL", "Active"],
    ["ATT-003", "Material", "Cotton, Denim", "Active"],
  ],
};

export default function MasterPage({ masterName }) {
  const [query, setQuery] = useState("");
  const rows = masterData[masterName] || [];
  const columns = [
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "details", header: "Details" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => <span className="master-status">{getValue()}</span> },
    { id: "action", header: "Action", enableSorting: false, cell: ({ row }) => <ActionMenu itemName={row.original.name} /> },
  ];
  const tableData = rows.map(([code, name, details, status]) => ({ code, name, details, status }));

  return (
    <section className="master-page">
      <div className="master-header">
        <div><h1>{masterName}</h1><p>Manage and organize your {masterName.toLowerCase().replace(" master", "")} records</p></div>
        <button className="primary-btn"><Plus size={16} /> Add New</button>
      </div>
      <div className="master-card card">
        <div className="master-toolbar"><div className="product-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${masterName.toLowerCase()}...`} /></div><span>{tableData.length} records</span></div>
        <MasterDataTable columns={columns} data={tableData} globalFilter={query} onGlobalFilterChange={setQuery} />
      </div>
    </section>
  );
}
