import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Tag,
  Upload,
} from "lucide-react";
import { AnimatedNumber } from "./AnimatedUtils";

const initialProductList = [
  {
    name: "Premium Formal Shirt",
    code: "FS-1920",
    subcategory: "Formal Shirt",
    price: "$120.00",
    oldPrice: null,
    stock: "150",
    date: "12 Sept 2025",
    status: "Active",
    sale: false,
    image: "/formal-shirt.jpg",
  },
  {
    name: "Blue Check Casual Shirt",
    code: "CS-1220",
    subcategory: "Casual Shirt",
    price: "$110.00",
    oldPrice: null,
    stock: "100",
    date: "14 Sept 2025",
    status: "Active",
    sale: false,
    image: "/check-shirt.jpg",
  },
  {
    name: "Men's Denim Jacket",
    code: "DJ-1190",
    subcategory: "Denim Jacket",
    price: "$150.00",
    oldPrice: "$180.00",
    stock: "40",
    date: "14 Sept 2025",
    status: "Inactive",
    sale: true,
    image: "/denim-jacket.svg",
  },
  {
    name: "Women's Jacket",
    code: "WJ-1280",
    subcategory: "Jacket",
    price: "$180.00",
    oldPrice: "$200.00",
    stock: "30",
    date: "15 Sept 2025",
    status: "Active",
    sale: true,
    image: "/women-jacket.svg",
  },
  {
    name: "Men's Denim Jacket",
    code: "DJ-1190",
    subcategory: "Denim Jacket",
    price: "$200.00",
    oldPrice: null,
    stock: "40",
    date: "14 Sept 2025",
    status: "Inactive",
    sale: false,
    image: "/denim-jacket.svg",
  },
  {
    name: "Blue Check Casual Shirt",
    code: "CS-1220",
    subcategory: "Casual Shirt",
    price: "$110.00",
    oldPrice: null,
    stock: "00",
    date: "14 Sept 2025",
    status: "Active",
    sale: false,
    image: "/check-shirt.jpg",
  },
];

export default function ProductPage({
  onAddProduct,
  onExport,
  onDateClick,
  dateRange = "12 Sept - 20 Sept",
}) {
  const [productList, setProductList] = useState(initialProductList);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const [statusFilter, setStatusFilter] = useState("Status");

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);

  const categoryRef = useRef(null);
  const statusRef = useRef(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusOpen(false);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      const matchQuery =
        query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(query.toLowerCase());

      const matchCat =
        categoryFilter === "Category" || p.subcategory === categoryFilter;

      const matchStat =
        statusFilter === "Status" || p.status === statusFilter;

      return matchQuery && matchCat && matchStat;
    });
  }, [productList, query, categoryFilter, statusFilter]);

  const toggleStatus = (idx) => {
    setProductList((prev) => {
      const next = [...prev];
      next[idx].status = next[idx].status === "Active" ? "Inactive" : "Active";
      return next;
    });
  };

  return (
    <section className="product-page">
      {/* Title Row */}
      <div className="product-title-row">
        <div>
          <h1>Products</h1>
          <p>Manage your product inventory</p>
        </div>
        <div className="product-actions">
          <button type="button" className="products-add-btn" onClick={onAddProduct}>
            <Plus size={16} /> Add New
          </button>
          <button type="button" className="products-export-btn" onClick={onExport}>
            <Upload size={15} /> Export Report
          </button>
        </div>
      </div>

      {/* 4 KPI Cards in a row */}
      <div className="products-kpi-grid">
        <div className="products-kpi-card">
          <div className="products-kpi-top">
            <span>Total Products</span>
            <Package size={17} className="products-kpi-icon" />
          </div>
          <strong className="products-kpi-val">
            <AnimatedNumber value="2300" delay={50} />
          </strong>
        </div>

        <div className="products-kpi-card">
          <div className="products-kpi-top">
            <span>Active Products</span>
            <CheckCircle2 size={17} className="products-kpi-icon" />
          </div>
          <strong className="products-kpi-val">
            <AnimatedNumber value="2300" delay={100} />
          </strong>
        </div>

        <div className="products-kpi-card">
          <div className="products-kpi-top">
            <span>Low Stocks</span>
            <AlertTriangle size={17} className="products-kpi-icon" />
          </div>
          <strong className="products-kpi-val">
            <AnimatedNumber value="2300" delay={150} />
          </strong>
        </div>

        <div className="products-kpi-card">
          <div className="products-kpi-top">
            <span>Total Products</span>
            <Tag size={17} className="products-kpi-icon" />
          </div>
          <strong className="products-kpi-val">
            <AnimatedNumber value="2300" delay={200} />
          </strong>
        </div>
      </div>

      {/* Main Products Table Card */}
      <div className="products-table-card">
        {/* Toolbar */}
        <div className="products-table-toolbar">
          <div className="products-search-wrapper">
            <Search size={16} className="products-search-icon" />
            <input
              type="text"
              className="products-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
          </div>

          <div className="products-toolbar-actions">
            <button
              type="button"
              className="products-pill-btn"
              onClick={onDateClick}
            >
              <CalendarDays size={15} />
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </button>

            {/* Category Dropdown */}
            <div className="products-filter-wrapper" ref={categoryRef}>
              <button
                type="button"
                className="products-pill-btn"
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setStatusOpen(false);
                }}
              >
                <span>{categoryFilter}</span>
                <ChevronDown size={14} />
              </button>

              {categoryOpen && (
                <div className="products-dropdown-menu">
                  {["Category", "Formal Shirt", "Casual Shirt", "Denim Jacket", "Jacket"].map(
                    (cat) => (
                      <button
                        type="button"
                        key={cat}
                        className={`products-dropdown-item ${
                          categoryFilter === cat ? "active" : ""
                        }`}
                        onClick={() => {
                          setCategoryFilter(cat);
                          setCategoryOpen(false);
                        }}
                      >
                        {cat === "Category" ? "All Categories" : cat}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="products-filter-wrapper" ref={statusRef}>
              <button
                type="button"
                className="products-pill-btn"
                onClick={() => {
                  setStatusOpen(!statusOpen);
                  setCategoryOpen(false);
                }}
              >
                <span>{statusFilter}</span>
                <ChevronDown size={14} />
              </button>

              {statusOpen && (
                <div className="products-dropdown-menu">
                  {["Status", "Active", "Inactive"].map((st) => (
                    <button
                      type="button"
                      key={st}
                      className={`products-dropdown-item ${
                        statusFilter === st ? "active" : ""
                      }`}
                      onClick={() => {
                        setStatusFilter(st);
                        setStatusOpen(false);
                      }}
                    >
                      {st === "Status" ? "All Statuses" : st}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>Image</th>
                <th style={{ width: "23%" }}>Product Name</th>
                <th style={{ width: "11%" }}>Code</th>
                <th style={{ width: "14%" }}>Subcategory</th>
                <th style={{ width: "11%" }}>Price</th>
                <th style={{ width: "9%" }}>Stock</th>
                <th style={{ width: "13%" }}>Added Date</th>
                <th style={{ width: "10%" }}>Status</th>
                <th style={{ width: "5%", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, index) => {
                const isInactive = p.status === "Inactive";
                return (
                  <tr key={`${p.code}-${index}`}>
                    {/* Image */}
                    <td>
                      <div className="products-image-cell">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="products-item-thumb"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    </td>

                    {/* Product Name */}
                    <td>
                      <div className="products-name-cell">
                        <span className="products-item-name">{p.name}</span>
                        {p.sale && <span className="product-sale-tag">Sale</span>}
                      </div>
                    </td>

                    {/* Code */}
                    <td className="products-col-code">{p.code}</td>

                    {/* Subcategory */}
                    <td className="products-col-subcat">{p.subcategory}</td>

                    {/* Price */}
                    <td>
                      {p.oldPrice ? (
                        <div className="products-price-cell">
                          <span className="product-old-price">{p.oldPrice}</span>
                          <span className="product-sale-price">{p.price}</span>
                        </div>
                      ) : (
                        <span className="products-col-price">{p.price}</span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="products-col-stock">{p.stock}</td>

                    {/* Added Date */}
                    <td className="products-col-date">{p.date}</td>

                    {/* Status */}
                    <td>
                      <button
                        type="button"
                        className={`product-status-pill ${
                          isInactive ? "inactive" : "active"
                        }`}
                        title="Click to toggle status"
                        onClick={() => toggleStatus(index)}
                      >
                        <span>{p.status}</span>
                        <ChevronDown size={11} strokeWidth={2.2} />
                      </button>
                    </td>

                    {/* Action */}
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                        ref={actionMenuIndex === index ? actionMenuRef : null}
                      >
                        <button
                          type="button"
                          className="products-action-icon-btn"
                          aria-label="Actions"
                          onClick={() =>
                            setActionMenuIndex(
                              actionMenuIndex === index ? null : index
                            )
                          }
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {actionMenuIndex === index && (
                          <div
                            className="products-dropdown-menu"
                            style={{
                              right: 0,
                              top: "100%",
                              minWidth: 130,
                              zIndex: 60,
                            }}
                          >
                            <button
                              type="button"
                              className="products-dropdown-item"
                              onClick={() => {
                                onAddProduct?.();
                                setActionMenuIndex(null);
                              }}
                            >
                              Edit Product
                            </button>
                            <button
                              type="button"
                              className="products-dropdown-item"
                              onClick={() => setActionMenuIndex(null)}
                            >
                              Duplicate
                            </button>
                            <button
                              type="button"
                              className="products-dropdown-item"
                              onClick={() => setActionMenuIndex(null)}
                            >
                              View in Store
                            </button>
                            <button
                              type="button"
                              className="products-dropdown-item"
                              style={{ color: "#ef4444" }}
                              onClick={() => {
                                setProductList((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                                setActionMenuIndex(null);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
