import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import ActionMenu from "./ActionMenu";

const initialSubCategories = [
  ["SUB001", "Smart Phones", "Mobile Phones", "Active"],
  ["SUB002", "Feature Phones", "Mobile Phones", "Active"],
  ["SUB003", "Gaming Laptops", "Laptops", "Active"],
  ["SUB004", "Chargers", "Accessories", "Active"],
];

function SelectField({ label, required, value, options, onChange }) {
  return <label className="category-field"><span>{label}{required && <b>*</b>}</span><div className="category-input category-select"><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></div></label>;
}

export default function SubCategoryMasterPage({ onBack }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [status, setStatus] = useState("Active");
  const [query, setQuery] = useState("");
  const [subCategories, setSubCategories] = useState(initialSubCategories);
  const filtered = subCategories.filter((item) => item.join(" ").toLowerCase().includes(query.toLowerCase()));
  const reset = () => { setCode(""); setName(""); setCategory("Select Category"); setStatus("Active"); };
  const save = () => { if (!code.trim() || !name.trim()) return; setSubCategories((items) => [...items, [code.trim(), name.trim(), category === "Select Category" ? "-" : category, status]]); reset(); };

  return <section className="category-page">
    <div className="category-header"><div><h1>Sub Category Master</h1><div className="breadcrumbs"><button>Home</button><span>›</span><button>Masters</button><span>›</span><strong>Sub Category Master</strong></div></div><button className="secondary-btn" onClick={onBack}><ArrowLeft size={14} /> Back to List</button></div>
    <section className="category-information card"><h2>Sub Category Information</h2><div className="category-form-grid"><label className="category-field"><span>Sub Category Code <b>*</b></span><div className="category-input"><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter sub category code" /></div></label><label className="category-field"><span>Sub Category Name <b>*</b></span><div className="category-input"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter sub category name" /></div></label><SelectField label="Category" required value={category} options={["Select Category", "Mobile Phones", "Laptops", "Accessories"]} onChange={setCategory} /><SelectField label="Status" required value={status} options={["Active", "Inactive"]} onChange={setStatus} /></div><div className="category-form-actions"><button className="secondary-btn" onClick={reset}>Reset</button><button className="primary-btn" onClick={save}>Save</button><button className="save-btn" onClick={save}>Save & New</button></div></section>
    <section className="category-list card"><div className="category-list-heading"><h2>Sub Category List</h2><button className="primary-btn" onClick={() => document.querySelector(".category-information")?.scrollIntoView({ behavior: "smooth" })}><Plus size={15} /> Add New Sub Category</button></div><div className="category-list-toolbar"><label>Show <select><option>10</option><option>25</option><option>50</option></select> entries</label><div className="category-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sub categories..." /></div></div><div className="category-table sub-category-table"><div className="category-row category-table-head"><span>#</span><span>Sub Category Code</span><span>Sub Category Name</span><span>Category</span><span>Status</span><span>Action</span></div>{filtered.map(([itemCode, itemName, parent, itemStatus], index) => <div className="category-row" key={itemCode}><span>{index + 1}</span><span>{itemCode}</span><span>{itemName}</span><span>{parent}</span><span><em className="category-status">{itemStatus}</em></span><span className="category-actions"><button aria-label={`Edit ${itemName}`}><Pencil size={17} /></button><button aria-label={`Delete ${itemName}`}><Trash2 size={17} /></button></span></div>)}{filtered.length === 0 && <div className="category-empty">No sub categories found.</div>}</div><div className="category-pagination"><span>Showing 1 to {filtered.length} of {filtered.length} entries</span><div><button>‹</button><button className="active-page">1</button><button>›</button></div></div></section>
  </section>;
}
