import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";

const masterConfigs = {
  "Brand Master": {
    singular: "Brand", codePlaceholder: "Enter brand code", namePlaceholder: "Enter brand name", searchPlaceholder: "Search brands...", extraLabel: "Brand Type", extraPlaceholder: "Select Brand Type", extraOptions: ["Premium", "Standard"], rows: [["BR001", "Northstar", "Premium", "Active"], ["BR002", "Urban Thread", "Standard", "Active"], ["BR003", "Everlane", "Premium", "Active"]],
  },
  "Unit Master": {
    singular: "Unit", codePlaceholder: "Enter unit code", namePlaceholder: "Enter unit name", searchPlaceholder: "Search units...", extraLabel: "Short Name", extraPlaceholder: "Enter short name", rows: [["UNT001", "Piece", "pcs", "Active"], ["UNT002", "Pair", "pair", "Active"], ["UNT003", "Kilogram", "kg", "Active"]],
  },
  "Tax Master": {
    singular: "Tax", codePlaceholder: "Enter tax code", namePlaceholder: "Enter tax name", searchPlaceholder: "Search taxes...", extraLabel: "Tax Percentage", extraPlaceholder: "Enter tax percentage", rows: [["TAX001", "GST 5%", "5%", "Active"], ["TAX002", "GST 12%", "12%", "Active"], ["TAX003", "GST 18%", "18%", "Active"]],
  },
  "Warehouse Master": {
    singular: "Warehouse", codePlaceholder: "Enter warehouse code", namePlaceholder: "Enter warehouse name", searchPlaceholder: "Search warehouses...", extraLabel: "Location", extraPlaceholder: "Enter warehouse location", rows: [["WH001", "Main Warehouse", "New Delhi", "Active"], ["WH002", "East Distribution", "Kolkata", "Active"], ["WH003", "West Distribution", "Mumbai", "Inactive"]],
  },
  "Attribute Master": {
    singular: "Attribute", codePlaceholder: "Enter attribute code", namePlaceholder: "Enter attribute name", searchPlaceholder: "Search attributes...", extraLabel: "Attribute Value", extraPlaceholder: "Enter attribute value", rows: [["ATT001", "Color", "Red", "Active"], ["ATT002", "Color", "Blue", "Active"], ["ATT003", "Color", "Green", "Active"], ["ATT004", "Color", "Black", "Active"]],
  },
};

function TextField({ label, required, value, onChange, placeholder }) {
  return <label className="category-field"><span>{label}{required && <b>*</b>}</span><div className="category-input"><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></div></label>;
}

function StatusField({ value, onChange }) {
  return <label className="category-field"><span>Status <b>*</b></span><div className="category-input category-select"><select value={value} onChange={(event) => onChange(event.target.value)}><option>Active</option><option>Inactive</option></select><ChevronDown size={14} /></div></label>;
}

export default function MasterFormPage({ masterName, onBack }) {
  const config = masterConfigs[masterName];
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const [status, setStatus] = useState("Active");
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(config.rows);
  const filteredRows = rows.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()));
  const reset = () => { setCode(""); setName(""); setExtra(""); setStatus("Active"); };
  const save = () => { if (!code.trim() || !name.trim()) return; setRows((current) => [...current, [code.trim(), name.trim(), extra.trim() || "-", status]]); reset(); };
  const remove = (rowCode) => setRows((current) => current.filter(([itemCode]) => itemCode !== rowCode));

  return <section className="category-page">
    <div className="category-header"><div><h1>{masterName}</h1><div className="breadcrumbs"><button>Home</button><span>›</span><button>Masters</button><span>›</span><strong>{masterName}</strong></div></div><button className="secondary-btn" onClick={onBack}><ArrowLeft size={14} /> Back to List</button></div>
    <section className="category-information card"><h2>{config.singular} Information</h2><div className="category-form-grid"><TextField label={`${config.singular} Code`} required value={code} onChange={setCode} placeholder={config.codePlaceholder} /><TextField label={`${config.singular} Name`} required value={name} onChange={setName} placeholder={config.namePlaceholder} /><TextField label={config.extraLabel} value={extra} onChange={setExtra} placeholder={config.extraPlaceholder} /><StatusField value={status} onChange={setStatus} /></div><div className="category-form-actions"><button className="secondary-btn" onClick={reset}>Reset</button><button className="primary-btn" onClick={save}>Save</button><button className="save-btn" onClick={save}>Save & New</button></div></section>
    <section className="category-list card"><div className="category-list-heading"><h2>{config.singular} List</h2><button className="primary-btn" onClick={() => document.querySelector(".category-information")?.scrollIntoView({ behavior: "smooth" })}><Plus size={15} /> Add New {config.singular}</button></div><div className="category-list-toolbar"><label>Show <select><option>10</option><option>25</option><option>50</option></select> entries</label><div className="category-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={config.searchPlaceholder} /></div></div><div className="category-table master-form-table"><div className="category-row category-table-head"><span>#</span><span>{config.singular} Code</span><span>{config.singular} Name</span><span>{config.extraLabel}</span><span>Status</span><span>Action</span></div>{filteredRows.map(([itemCode, itemName, itemExtra, itemStatus], index) => <div className="category-row" key={itemCode}><span>{index + 1}</span><span>{itemCode}</span><span>{itemName}</span><span>{itemExtra}</span><span><em className="category-status">{itemStatus}</em></span><span className="category-actions"><button aria-label={`Edit ${itemName}`}><Pencil size={17} /></button><button aria-label={`Delete ${itemName}`} onClick={() => remove(itemCode)}><Trash2 size={17} /></button></span></div>)}{filteredRows.length === 0 && <div className="category-empty">No {config.singular.toLowerCase()} records found.</div>}</div><div className="category-pagination"><span>Showing 1 to {filteredRows.length} of {filteredRows.length} entries</span><div><button>‹</button><button className="active-page">1</button><button>›</button></div></div></section>
  </section>;
}
