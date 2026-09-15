import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Eye,
  MoreVertical,
  Package,
  Search,
  TrendingUp,
  Upload,
  CheckCircle2,
  X,
  FileText,
  Printer,
} from "lucide-react";
import DateFilterDropdown from "./DateFilterDropdown";
import { AnimatedNumber } from "./AnimatedUtils";

const initialOrders = [
  {
    id: "#11852",
    product: "Black Solid T-Shirt",
    extra: "+2 other products",
    image: "/tshirt.svg",
    customer: "Nowshad Khan",
    date: "24 Dec 2025",
    amount: "$300.00",
    status: "Pending",
  },
  {
    id: "#11852",
    product: "Men's Sneakers",
    extra: "+2 other products",
    image: "/sneakers.svg",
    customer: "Khalid Rahman",
    date: "24 Dec 2025",
    amount: "$500.00",
    status: "Pending",
  },
  {
    id: "#11852",
    product: "Men's Jogger",
    extra: null,
    image: "/jogger.svg",
    customer: "Ashraf Ali",
    date: "24 Dec 2025",
    amount: "$400.00",
    status: "In Progress",
  },
  {
    id: "#11852",
    product: "Men's Sneakers",
    extra: "+2 other products",
    image: "/sneakers.svg",
    customer: "Ratul Rezwan",
    date: "24 Dec 2025",
    amount: "$290.00",
    status: "In Progress",
  },
  {
    id: "#11852",
    product: "Women's Jacket",
    extra: null,
    image: "/jacket.svg",
    customer: "Shirin Akter",
    date: "23 Dec 2025",
    amount: "$300.00",
    status: "In Progress",
  },
  {
    id: "#11852",
    product: "Black Solid T-Shirt",
    extra: "+2 other products",
    image: "/tshirt.svg",
    customer: "Nowshad Khan",
    date: "24 Dec 2025",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: "#11852",
    product: "Men's Sneakers",
    extra: "+2 other products",
    image: "/sneakers.svg",
    customer: "Khalid Rahman",
    date: "24 Dec 2025",
    amount: "$500.00",
    status: "Completed",
  },
];

// Helper to generate SVG arc path for Pie Chart
function getSlicePath(cx, cy, r, startAngleDeg, endAngleDeg) {
  const rad = Math.PI / 180;
  const startRad = (startAngleDeg - 90) * rad;
  const endRad = (endAngleDeg - 90) * rad;

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? 0 : 1;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

function getTextPos(cx, cy, r, startAngleDeg, endAngleDeg) {
  const midDeg = (startAngleDeg + endAngleDeg) / 2;
  const rad = (midDeg - 90) * (Math.PI / 180);
  const dist = r * 0.58;
  return {
    x: cx + dist * Math.cos(rad),
    y: cy + dist * Math.sin(rad),
  };
}

function OrderStatusPieChart({ activeCategory, setActiveCategory }) {
  // Slices matching the reference screenshot:
  // Completed (Green): 48% (from 0° to 172.8°)
  // In Progress (Blue): 20% (from 172.8° to 244.8°)
  // Pending (Orange): 32% (from 244.8° to 360°)
  const slices = [
    {
      key: "completed",
      label: "Completed",
      pct: "48%",
      color: "#22c55e",
      start: 0,
      end: 172.8,
    },
    {
      key: "in-progress",
      label: "In Progress",
      pct: "20%",
      color: "#3b82f6",
      start: 172.8,
      end: 244.8,
    },
    {
      key: "pending",
      label: "Pending",
      pct: "32%",
      color: "#f97316",
      start: 244.8,
      end: 360,
    },
  ];

  const cx = 110;
  const cy = 110;
  const r = 88;

  return (
    <div className="order-pie-wrapper">
      <svg viewBox="0 0 220 220" className="order-pie-svg">
        {slices.map((slice) => {
          const pathD = getSlicePath(cx, cy, r, slice.start, slice.end);
          const textPos = getTextPos(cx, cy, r, slice.start, slice.end);
          const isSelected = activeCategory === slice.key;

          return (
            <g
              key={slice.key}
              className={`order-pie-slice ${isSelected ? "active" : ""}`}
              onMouseEnter={() => setActiveCategory(slice.key)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <path
                d={pathD}
                fill={slice.color}
                stroke="#ffffff"
                strokeWidth="2.5"
              />
              <text x={textPos.x} y={textPos.y} className="order-pie-text">
                {slice.pct}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function OrdersPage({
  onExport,
  onDateClick,
  onOpenCustomDate,
  dateRange = "12 Sept - 20 Sept",
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [chartDateRange, setChartDateRange] = useState("Last 7 days");
  const [activePieCategory, setActivePieCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeMenuIdx, setActiveMenuIdx] = useState(null);

  const statusDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setStatusDropdownOpen(false);
      }
    }
    if (statusDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [statusDropdownOpen]);

  // Filter rows based on search and status
  const filteredRows = useMemo(() => {
    return orders.filter((order) => {
      const matchesQuery =
        query === "" ||
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.product.toLowerCase().includes(query.toLowerCase()) ||
        order.customer.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  // Toggle order status on click
  const toggleOrderStatus = (index) => {
    setOrders((prev) => {
      const next = [...prev];
      const cur = next[index].status;
      if (cur === "Pending") next[index].status = "In Progress";
      else if (cur === "In Progress") next[index].status = "Completed";
      else next[index].status = "Pending";
      return next;
    });
  };

  return (
    <section className="inner-page orders-page">
      {/* Title Row */}
      <div className="inner-title-row orders-header-row">
        <div>
          <h1>Orders</h1>
          <p>Manage and track customer orders</p>
        </div>
        <button type="button" className="orders-export-btn" onClick={onExport}>
          <Upload size={15} /> Export Report
        </button>
      </div>

      {/* Top Section: 2x2 KPIs + Order Status Pie Chart */}
      <div className="orders-top-grid">
        {/* Left: 2x2 KPI Cards */}
        <div className="orders-kpi-grid">
          <div className="orders-kpi-card">
            <div className="orders-kpi-top">
              <span>Total Orders</span>
              <Package size={17} className="orders-kpi-icon" />
            </div>
            <div className="orders-kpi-val">
              <AnimatedNumber value="5000" delay={50} />
            </div>
            <div className="orders-kpi-trend positive">
              <span className="trend-arrow">▲</span> +3.1%{" "}
              <span className="trend-period">vs Last Week</span>
            </div>
          </div>

          <div className="orders-kpi-card">
            <div className="orders-kpi-top">
              <span>Pending Orders</span>
              <Clock size={17} className="orders-kpi-icon" />
            </div>
            <div className="orders-kpi-val">
              <AnimatedNumber value="400" delay={100} />
            </div>
            <div className="orders-kpi-trend positive">
              <span className="trend-arrow">▲</span> +2.4%{" "}
              <span className="trend-period">vs Last Week</span>
            </div>
          </div>

          <div className="orders-kpi-card">
            <div className="orders-kpi-top">
              <span>In Progress</span>
              <TrendingUp size={17} className="orders-kpi-icon" />
            </div>
            <div className="orders-kpi-val">
              <AnimatedNumber value="500" delay={150} />
            </div>
            <div className="orders-kpi-trend positive">
              <span className="trend-arrow">▲</span> +2.4%{" "}
              <span className="trend-period">vs Last Week</span>
            </div>
          </div>

          <div className="orders-kpi-card">
            <div className="orders-kpi-top">
              <span>Completed Orders</span>
              <CheckCircle2 size={17} className="orders-kpi-icon" />
            </div>
            <div className="orders-kpi-val">
              <AnimatedNumber value="4000" delay={200} />
            </div>
            <div className="orders-kpi-trend negative">
              <span className="trend-arrow">▼</span> -0.6%{" "}
              <span className="trend-period">vs Last Week</span>
            </div>
          </div>
        </div>

        {/* Right: Order Status Pie Chart Card */}
        <div className="order-status-card">
          <div className="order-status-head">
            <h2>Order Status</h2>
            <DateFilterDropdown
              selected={chartDateRange}
              onSelect={setChartDateRange}
              onCustomClick={() =>
                onOpenCustomDate?.((range) => setChartDateRange(range))
              }
            />
          </div>

          <div className="order-status-body">
            <OrderStatusPieChart
              activeCategory={activePieCategory}
              setActiveCategory={setActivePieCategory}
            />

            <div className="order-status-legend">
              <div
                className={`order-legend-item ${
                  activePieCategory === "in-progress" ? "highlighted" : ""
                }`}
                onMouseEnter={() => setActivePieCategory("in-progress")}
                onMouseLeave={() => setActivePieCategory(null)}
              >
                <span className="legend-badge blue" />
                <span>In Progress</span>
              </div>

              <div
                className={`order-legend-item ${
                  activePieCategory === "pending" ? "highlighted" : ""
                }`}
                onMouseEnter={() => setActivePieCategory("pending")}
                onMouseLeave={() => setActivePieCategory(null)}
              >
                <span className="legend-badge orange" />
                <span>Pending</span>
              </div>

              <div
                className={`order-legend-item ${
                  activePieCategory === "completed" ? "highlighted" : ""
                }`}
                onMouseEnter={() => setActivePieCategory("completed")}
                onMouseLeave={() => setActivePieCategory(null)}
              >
                <span className="legend-badge green" />
                <span>Completed</span>
              </div>

              <div
                className={`order-legend-item ${
                  activePieCategory === "cancelled" ? "highlighted" : ""
                }`}
                onMouseEnter={() => setActivePieCategory("cancelled")}
                onMouseLeave={() => setActivePieCategory(null)}
              >
                <span className="legend-badge red" />
                <span>Cancelled</span>
              </div>

              <div
                className={`order-legend-item ${
                  activePieCategory === "refunded" ? "highlighted" : ""
                }`}
                onMouseEnter={() => setActivePieCategory("refunded")}
                onMouseLeave={() => setActivePieCategory(null)}
              >
                <span className="legend-badge purple" />
                <span>Refunded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="orders-table-card">
        {/* Toolbar */}
        <div className="orders-table-toolbar">
          <div className="orders-search-wrapper">
            <Search size={16} className="orders-search-icon" />
            <input
              type="text"
              className="orders-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
          </div>

          <div className="orders-toolbar-actions">
            <button
              type="button"
              className="orders-pill-btn"
              onClick={onDateClick}
            >
              <CalendarDays size={15} />
              <span>{dateRange}</span>
              <ChevronDown size={14} />
            </button>

            <div className="status-filter-wrapper" ref={statusDropdownRef}>
              <button
                type="button"
                className="orders-pill-btn"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                <span>{statusFilter === "All" ? "Status" : statusFilter}</span>
                <ChevronDown size={14} />
              </button>

              {statusDropdownOpen && (
                <div className="status-dropdown-menu">
                  {["All", "Pending", "In Progress", "Completed"].map((st) => (
                    <button
                      type="button"
                      key={st}
                      className={`status-dropdown-item ${
                        statusFilter === st ? "active" : ""
                      }`}
                      onClick={() => {
                        setStatusFilter(st);
                        setStatusDropdownOpen(false);
                      }}
                    >
                      {st === "All" ? "All Statuses" : st}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th style={{ width: "11%" }}>Order ID</th>
                <th style={{ width: "27%" }}>Products</th>
                <th style={{ width: "18%" }}>Customer</th>
                <th style={{ width: "14%" }}>Date</th>
                <th style={{ width: "12%" }}>Amount</th>
                <th style={{ width: "12%" }}>Status</th>
                <th style={{ width: "6%", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((order, index) => {
                const statusSlug = order.status.toLowerCase().replace(" ", "-");
                return (
                  <tr key={`${order.id}-${index}`}>
                    <td className="orders-col-id">{order.id}</td>
                    <td>
                      <div className="orders-product-cell">
                        <img
                          src={order.image}
                          alt={order.product}
                          className="orders-product-thumb"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div className="orders-product-info">
                          <span className="orders-product-name">
                            {order.product}
                          </span>
                          {order.extra && (
                            <span className="orders-product-extra">
                              {order.extra}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="orders-col-customer">{order.customer}</td>
                    <td className="orders-col-date">{order.date}</td>
                    <td className="orders-col-amount">{order.amount}</td>
                    <td>
                      <button
                        type="button"
                        className={`status-pill-badge ${statusSlug}`}
                        title="Click to toggle status"
                        onClick={() => toggleOrderStatus(index)}
                      >
                        <span>{order.status}</span>
                        <ChevronDown size={11} strokeWidth={2.2} />
                      </button>
                    </td>
                    <td>
                      <div className="orders-actions-cell">
                        <button
                          type="button"
                          className="orders-action-icon-btn"
                          aria-label="View order details"
                          title="View order"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye size={16} />
                        </button>

                        <div style={{ position: "relative" }}>
                          <button
                            type="button"
                            className="orders-action-icon-btn"
                            aria-label="More actions"
                            title="More options"
                            onClick={() =>
                              setActiveMenuIdx(
                                activeMenuIdx === index ? null : index
                              )
                            }
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activeMenuIdx === index && (
                            <div
                              className="status-dropdown-menu"
                              style={{
                                right: 0,
                                top: "100%",
                                minWidth: 130,
                                zIndex: 60,
                              }}
                            >
                              <button
                                type="button"
                                className="status-dropdown-item"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setActiveMenuIdx(null);
                                }}
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                className="status-dropdown-item"
                                onClick={() => {
                                  window.print?.();
                                  setActiveMenuIdx(null);
                                }}
                              >
                                Print Invoice
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Preview Modal */}
      {selectedOrder && (
        <div
          className="date-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <div
            className="card"
            style={{
              width: 480,
              maxWidth: "92vw",
              padding: 24,
              borderRadius: 20,
              animation: "dropdownIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18,
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 14,
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  Order Details {selectedOrder.id}
                </h3>
                <small style={{ color: "#64748b" }}>{selectedOrder.date}</small>
              </div>
              <button
                type="button"
                className="orders-action-icon-btn"
                onClick={() => setSelectedOrder(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "#f8fafc",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <img
                  src={selectedOrder.image}
                  alt={selectedOrder.product}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    background: "#ffffff",
                    padding: 4,
                  }}
                />
                <div>
                  <strong style={{ fontSize: 14, color: "#111827" }}>
                    {selectedOrder.product}
                  </strong>
                  {selectedOrder.extra && (
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {selectedOrder.extra}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#4f46e5",
                      marginTop: 2,
                    }}
                  >
                    {selectedOrder.amount}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  fontSize: 13,
                }}
              >
                <div>
                  <span style={{ color: "#64748b", display: "block" }}>
                    Customer
                  </span>
                  <strong style={{ color: "#111827" }}>
                    {selectedOrder.customer}
                  </strong>
                </div>
                <div>
                  <span style={{ color: "#64748b", display: "block" }}>
                    Status
                  </span>
                  <span
                    className={`status-pill-badge ${selectedOrder.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    style={{ marginTop: 2 }}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <span style={{ color: "#64748b", display: "block" }}>
                    Payment
                  </span>
                  <strong style={{ color: "#16a34a" }}>Paid via Card</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b", display: "block" }}>
                    Fulfillment
                  </span>
                  <strong style={{ color: "#111827" }}>Standard Delivery</strong>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 22,
                borderTop: "1px solid #f1f5f9",
                paddingTop: 16,
              }}
            >
              <button
                type="button"
                className="orders-pill-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="orders-export-btn"
                style={{ background: "#4f46e5", color: "#ffffff", border: "none" }}
                onClick={() => {
                  window.print?.();
                }}
              >
                <Printer size={14} /> Print Order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
