import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import ActionMenu from "./ActionMenu";

const initialCategories = [
  ["CAT001", "Electronics", "-", "Active"],
  ["CAT002", "Mobile Phones", "Electronics", "Active"],
  ["CAT003", "Laptops", "Electronics", "Active"],
  ["CAT004", "Accessories", "Mobile Phones", "Active"],
];

function SelectField({ label, required, placeholder, value, onChange }) {
  return (
    <label className="category-field">
      <span>{label}{required && <b>*</b>}</span>
      <div className="category-input category-select"><select value={value} onChange={(event) => onChange(event.target.value)}><option>{placeholder}</option></select><ChevronDown size={14} /></div>
    </label>
  );
}

export default function CategoryMasterPage({ onBack }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [parent, setParent] = useState("Select Parent Category");
  const [status, setStatus] = useState("Active");
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const filteredCategories = categories.filter((category) => category.join(" ").toLowerCase().includes(query.toLowerCase()));

  const reset = () => { setCode(""); setName(""); setParent("Select Parent Category"); setStatus("Active"); };
  const save = () => {
    if (!code.trim() || !name.trim()) return;
    setCategories((current) => [...current, [code.trim(), name.trim(), parent === "Select Parent Category" ? "-" : parent, status]]);
    reset();
  };

  return (
    <section className="category-page">
      <div className="category-header"><div><h1>Category Master</h1><div className="breadcrumbs"><button>Home</button><span>›</span><button>Masters</button><span>›</span><strong>Category Master</strong></div></div><button className="secondary-btn" onClick={onBack}><ArrowLeft size={14} /> Back to List</button></div>

      <section className="category-information card">
        <h2>Category Information</h2>
        <div className="category-form-grid">
          <label className="category-field"><span>Category Code <b>*</b></span><div className="category-input"><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter category code" /></div></label>
          <label className="category-field"><span>Category Name <b>*</b></span><div className="category-input"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter category name" /></div></label>
          <SelectField label="Parent Category" placeholder={parent} value={parent} onChange={setParent} />
          <SelectField label="Status" required placeholder={status} value={status} onChange={setStatus} />
        </div>
        <div className="category-form-actions"><button className="secondary-btn" onClick={reset}>Reset</button><button className="primary-btn" onClick={save}>Save</button><button className="save-btn" onClick={save}>Save & New</button></div>
      </section>

      <section className="category-list card">
        <div className="category-list-heading"><h2>Category List</h2><button className="primary-btn" onClick={() => document.querySelector(".category-information")?.scrollIntoView({ behavior: "smooth" })}><Plus size={15} /> Add New Category</button></div>
        <div className="category-list-toolbar"><label>Show <select><option>10</option><option>25</option><option>50</option></select> entries</label><div className="category-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories..." /></div></div>
        <div className="category-table"><div className="category-row category-table-head"><span>#</span><span>Category Code</span><span>Category Name</span><span>Parent Category</span><span>Status</span><span>Action</span></div>{filteredCategories.map(([categoryCode, categoryName, parentCategory, categoryStatus], index) => <div className="category-row" key={categoryCode}><span>{index + 1}</span><span>{categoryCode}</span><span>{categoryName}</span><span>{parentCategory}</span><span><em className="category-status">{categoryStatus}</em></span><span className="category-actions"><ActionMenu itemName={categoryName} /></span></div>)}{filteredCategories.length === 0 && <div className="category-empty">No categories found.</div>}</div>
        <div className="category-pagination"><span>Showing 1 to {filteredCategories.length} of {filteredCategories.length} entries</span><div><button>‹</button><button className="active-page">1</button><button>›</button></div></div>
      </section>
    </section>
  );
}
