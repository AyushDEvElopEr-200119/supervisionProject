import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Edit3,
  Filter,
  MoreVertical,
  Package,
  Plus,
  Search,
  Tags,
  TrendingDown,
  Upload,
  XCircle,
} from "lucide-react";
import ActionMenu from "./ActionMenu";

const products = [
  { name: "Premium Formal Shirt", code: "FS-1920", category: "Formal Shirt", price: "$120.00", stock: 150, date: "12 Sept 2025", status: "Active", image: "PS" },
  { name: "Blue Check Casual Shirt", code: "CS-1220", category: "Casual Shirt", price: "$110.00", stock: 100, date: "14 Sept 2025", status: "Active", image: "BC" },
  { name: "Men's Denim Jacket", code: "DJ-1190", category: "Jacket", price: "$150.00", oldPrice: "$180.00", stock: 40, date: "14 Sept 2025", status: "Inactive", sale: true, image: "DJ" },
  { name: "Women's Jacket", code: "WJ-1280", category: "Jacket", price: "$180.00", oldPrice: "$200.00", stock: 30, date: "15 Sept 2025", status: "Active", sale: true, image: "WJ" },
  { name: "Men's Denim Jacket", code: "DJ-1190", category: "Jacket", price: "$200.00", stock: 0, date: "16 Sept 2025", status: "Out of Stock", image: "DJ" },
  { name: "Classic White Sneakers", code: "SN-2001", category: "Sneakers", price: "$90.00", stock: 200, date: "16 Sept 2025", status: "Active", image: "SW" },
  { name: "Travel Backpack", code: "TB-3001", category: "Bags", price: "$75.00", stock: 70, date: "17 Sept 2025", status: "Active", image: "TB" },
  { name: "Analog Watch", code: "AW-4001", category: "Accessories", price: "$60.00", stock: 15, date: "18 Sept 2025", status: "Low Stock", image: "AW" },
];

function ProductStatus({ status }) {
  const cls = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`product-status ${cls}`}><i />{status}<ChevronDown size={11} /></span>;
}

export default function ProductPage({ onAddProduct, onExport, onDateClick, dateRange }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Category");
  const [status, setStatus] = useState("Status");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Category" || p.category === category;
      const matchesStatus = status === "Status" || p.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [query, category, status]);

  return (
    <section className="product-page">
      <div className="product-title-row">
        <div>
          <h1>Products</h1>
          <p>Manage and organize your products inventory</p>
        </div>
        <div className="product-actions">
          <button className="primary-btn" onClick={onAddProduct}><Plus size={16} /> Add New Product</button>
          <button className="secondary-btn" onClick={onExport}><Upload size={15} /> Export Report</button>
        </div>
      </div>

      <div className="product-kpis">
        <div className="product-kpi">
          <div className="product-kpi-icon purple"><Package size={20} /></div>
          <div><span>Total Products</span><strong>2,300</strong><small className="green-text">↑ 12.5% <em>vs Last Month</em></small></div>
        </div>
        <div className="product-kpi">
          <div className="product-kpi-icon green"><CheckCircle2 size={20} /></div>
          <div><span>Active Products</span><strong>2,100</strong><small className="green-text">↑ 8.3% <em>vs Last Month</em></small></div>
        </div>
        <div className="product-kpi">
          <div className="product-kpi-icon yellow"><AlertTriangle size={20} /></div>
          <div><span>Low Stock Products</span><strong>120</strong><small className="red-text">↓ 3.2% <em>vs Last Month</em></small></div>
        </div>
        <div className="product-kpi">
          <div className="product-kpi-icon red"><XCircle size={20} /></div>
          <div><span>Out of Stock Products</span><strong>80</strong><small className="red-text">↓ 1.4% <em>vs Last Month</em></small></div>
        </div>
      </div>

      <div className="product-workspace">
        <div className="product-main card">
          <div className="product-toolbar">
            <div className="product-search">
              <Search size={17} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
            </div>
            <div className="product-filters">
              <button onClick={onDateClick}><CalendarDays size={15} />{dateRange} <ChevronDown size={14} /></button>
              <button onClick={() => setCategory(category === "Category" ? "Jacket" : "Category")}>{category}<ChevronDown size={14} /></button>
              <button onClick={() => setStatus(status === "Status" ? "Active" : "Status")}>{status}<ChevronDown size={14} /></button>
              <button><Filter size={15} />Filters</button>
            </div>
          </div>

          <div className="product-table">
            <div className="product-tr product-th">
              <span>Image</span><span>Product Name</span><span>Code</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span>Added Date</span><span>Action</span>
            </div>
            {filtered.map((p, index) => (
              <div className="product-tr" key={`${p.code}-${index}`}>
                <span><div className="catalog-image">{p.image}</div></span>
                <span className="catalog-name"><strong>{p.name}</strong>{p.sale && <b>Sale</b>}</span>
                <span>{p.code}</span>
                <span><em className={`category-tag ${p.category.toLowerCase().replaceAll(" ", "-")}`}>{p.category}</em></span>
                <span>{p.oldPrice && <del>{p.oldPrice}</del>}<strong className={p.oldPrice ? "sale-price" : ""}>{p.price}</strong></span>
                <span className={p.stock === 0 ? "stock-zero" : p.stock <= 30 ? "stock-low" : "stock-ok"}>{p.stock}</span>
                <span><ProductStatus status={p.status} /></span>
                <span>{p.date}</span>
                <span className="row-actions"><ActionMenu itemName={p.name} /></span>
              </div>
            ))}
            {filtered.length === 0 && <div className="empty-products">No products found.</div>}
          </div>

          <div className="product-pagination">
            <span>Showing 1 to {filtered.length || 0} of 2300 products</span>
            <div>
              <button>‹</button><button className="active-page">1</button><button>2</button><button>3</button><button>…</button><button>288</button><button>›</button>
            </div>
            <button className="per-page">10 / page <ChevronDown size={13} /></button>
          </div>
        </div>

        <aside className="product-right">
          <div className="side-product-card card">
            <div className="subhead"><h3>Top Categories</h3><a>View All</a></div>
            <div className="donut-wrap">
              <div className="donut" />
              <div className="category-list">
                {[
                  ["Shirts", "35%"],["Jackets", "26%"],["T-Shirts", "15%"],["Sneakers", "10%"],["Accessories", "8%"],["Others", "7%"]
                ].map(([n,v], i) => <div key={n}><i className={`cat-dot c${i}`} /><span>{n}</span><b>{v}</b></div>)}
              </div>
            </div>
          </div>

          <div className="side-product-card card">
            <h3>Quick Actions</h3>
            {[
              [Plus, "Add New Product", "Create a new product", "purple"],
              [Upload, "Import Products", "Import products via CSV", "blue"],
              [Archive, "Manage Categories", "View and manage categories", "purple"],
              [AlertTriangle, "Low Stock Alert", "View products running low", "red"],
            ].map(([Icon, title, desc, tone]) => (
              <button className="quick-action" key={title}>
                <span className={tone}><Icon size={15} /></span><div><strong>{title}</strong><small>{desc}</small></div>
              </button>
            ))}
          </div>

          <div className="side-product-card card inventory">
            <h3>Inventory Summary</h3>
            {[
              ["Total Stock", "12,450"],
              ["Total Value", "$95,420.00"],
              ["Avg. Price", "$83.05"],
              ["Out of Stock", "80"],
              ["Low Stock", "120"],
            ].map(([label, value]) => <div key={label}><span>{label}</span><strong className={label === "Out of Stock" ? "red-text" : label === "Low Stock" ? "orange-text" : ""}>{value}</strong></div>)}
          </div>
        </aside>
      </div>
    </section>
  );
}
