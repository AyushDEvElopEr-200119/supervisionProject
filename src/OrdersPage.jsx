import React, { useMemo, useState } from "react";
import {
  CalendarDays, ChevronDown, Eye, MoreVertical, Search, Upload,
  ShoppingBag, Clock3, TrendingUp, CheckCircle2
} from "lucide-react";
import ActionMenu from "./ActionMenu";

const orderRows = [
  ["#11852","Black Solid T-Shirt","Nowshad Khan","24 Dec 2025","$300.00","Pending","TS"],
  ["#11851","Men's Sneakers","Khalid Rahman","24 Dec 2025","$500.00","Pending","SN"],
  ["#11850","Men's Jogger","Ashraf Ali","24 Dec 2025","$400.00","In Progress","MJ"],
  ["#11849","Men's Sneakers","Ratul Rezwan","24 Dec 2025","$290.00","In Progress","SN"],
  ["#11848","Women's Jacket","Shirin Akter","23 Dec 2025","$300.00","In Progress","WJ"],
  ["#11847","Black Solid T-Shirt","Nowshad Khan","24 Dec 2025","$250.00","Completed","TS"],
];

function OrderStatus({ value }) {
  return <span className={`order-status ${value.toLowerCase().replaceAll(" ","-")}`}><i/>{value}<ChevronDown size={11}/></span>;
}

export default function OrdersPage({ onExport, onDateClick, dateRange }) {
  const [query,setQuery] = useState("");
  const [status,setStatus] = useState("Status");
  const rows = useMemo(()=>orderRows.filter(r =>
    (r[0]+r[1]+r[2]).toLowerCase().includes(query.toLowerCase()) &&
    (status==="Status" || r[5]===status)
  ),[query,status]);

  return <section className="inner-page orders-page">
    <div className="inner-title-row">
      <div><h1>Orders</h1><p>Manage and track customer orders</p></div>
      <button className="secondary-btn" onClick={onExport}><Upload size={15}/> Export Report</button>
    </div>

    <div className="orders-top">
      <div className="order-stat-grid">
        <div className="order-stat"><div className="order-icon purple"><ShoppingBag size={19}/></div><span>Total Orders</span><strong>5,000</strong><small>▲ 3.1% <em>vs Last Week</em></small></div>
        <div className="order-stat"><div className="order-icon orange"><Clock3 size={19}/></div><span>Pending Orders</span><strong>400</strong><small>▲ 2.4% <em>vs Last Week</em></small></div>
        <div className="order-stat"><div className="order-icon blue"><TrendingUp size={19}/></div><span>In Progress</span><strong>500</strong><small>▲ 2.4% <em>vs Last Week</em></small></div>
        <div className="order-stat"><div className="order-icon green"><CheckCircle2 size={19}/></div><span>Completed Orders</span><strong>4,000</strong><small className="negative-order">▼ 0.6% <em>vs Last Week</em></small></div>
      </div>

      <div className="order-chart card">
        <div className="panel-head"><h2>Order Status</h2><button className="select">Last 7 days <ChevronDown size={14}/></button></div>
        <div className="donut-order"><div className="order-donut"><div>48%</div></div>
          <div className="order-legend">
            <div><i className="blue-dot"/>In Progress <b>20%</b></div>
            <div><i className="orange-dot"/>Pending <b>32%</b></div>
            <div><i className="green-dot"/>Completed <b>48%</b></div>
            <div><i className="red-dot"/>Cancelled <b>8%</b></div>
            <div><i className="purple-dot"/>Refunded <b>2%</b></div>
          </div>
        </div>
      </div>
    </div>

    <div className="order-table-card card">
      <div className="order-toolbar">
        <div className="customer-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search orders..."/></div>
        <div className="customer-filters">
          <button onClick={onDateClick}><CalendarDays size={15}/>{dateRange}<ChevronDown size={14}/></button>
          <button onClick={()=>setStatus(status==="Status"?"Pending":"Status")}>{status}<ChevronDown size={14}/></button>
        </div>
      </div>
      <div className="order-table">
        <div className="order-tr order-th"><span>Order ID</span><span>Products</span><span>Customer</span><span>Date</span><span>Amount</span><span>Status</span><span>Action</span></div>
        {rows.map((r,i)=><div className="order-tr" key={i}>
          <span>{r[0]}</span>
          <span className="order-product"><div className="catalog-image">{r[6]}</div><div><strong>{r[1]}</strong><small>+2 other products</small></div></span>
          <span>{r[2]}</span><span>{r[3]}</span><span>{r[4]}</span><span><OrderStatus value={r[5]}/></span>
          <span className="order-actions"><ActionMenu itemName={r[0]} /></span>
        </div>)}
      </div>
      <div className="order-pagination"><span>Showing 1 to 6 of 5,000 orders</span><div><button>‹</button><button className="current-page">1</button><button>2</button><button>3</button><button>…</button><button>50</button><button>›</button></div><button className="per-page">10 / page <ChevronDown size={13}/></button></div>
    </div>
  </section>;
}
