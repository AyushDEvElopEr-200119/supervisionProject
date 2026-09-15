import React, { useMemo, useState } from "react";
import {
  CalendarDays, ChevronDown, Filter, MoreVertical, Search, Upload,
  Users, UserCheck, UserX, CircleDollarSign
} from "lucide-react";
import ActionMenu from "./ActionMenu";
import { AnimatedNumber } from "./AnimatedUtils";

const customers = [
  ["John Smith","john@example.com","+1 (555) 123-4567","12","$459.95","12 Sept 2025","Active","JS"],
  ["Sarah Johnson","sarah.j@example.com","+1 (555) 234-5678","23","$1,245.80","12 Sept 2025","Active","SJ"],
  ["Michael Brown","mbrown@example.com","+1 (555) 123-4567","34","$459.95","12 Sept 2025","Active","MB"],
  ["Emily Davis","emily.d@example.com","+1 (555) 456-7870","12","$2,150.40","11 Sept 2025","Inactive","ED"],
  ["David Wilson","dwilson@example.com","+1 (555) 456-7890","34","$3,000.95","09 Sept 2025","Active","DW"],
  ["John Smith","john@example.com","+1 (555) 123-4567","12","$459.95","09 Sept 2025","Inactive","JS"],
  ["Sarah Johnson","sarah.j@example.com","+1 (555) 234-5678","23","$1,245.80","09 Sept 2025","Active","SJ"],
  ["Michael Brown","mbrown@example.com","+1 (555) 123-4567","34","$459.95","08 Sept 2025","Active","MB"],
  ["Emily Davis","emily.d@example.com","+1 (555) 456-7870","12","$2,150.40","08 Sept 2025","Inactive","ED"],
  ["David Wilson","dwilson@example.com","+1 (555) 456-7890","34","$3,000.95","07 Sept 2025","Active","DW"],
];

function CustomerStatus({ value }) {
  return <span className={`customer-status ${value.toLowerCase()}`}><i />{value}</span>;
}

export default function CustomersPage({ onExport, onDateClick, dateRange }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Status");

  const rows = useMemo(() => customers.filter(c =>
    (c[0] + c[1] + c[2]).toLowerCase().includes(query.toLowerCase()) &&
    (status === "Status" || c[6] === status)
  ), [query, status]);

  return (
    <section className="inner-page customers-page">
      <div className="inner-title-row">
        <div><h1>Customers</h1><p>Manage customer accounts and information</p></div>
        <button className="secondary-btn" onClick={onExport}><Upload size={15}/> Export Report</button>
      </div>

      <div className="customer-kpis">
        <div className="customer-kpi"><div className="customer-icon purple"><Users size={20}/></div><span>Total Customers</span><strong><AnimatedNumber value="5,000" delay={50} /></strong><small>▲ 3.1% <em>vs Last Week</em></small></div>
        <div className="customer-kpi"><div className="customer-icon green"><UserCheck size={20}/></div><span>Active Customers</span><strong><AnimatedNumber value="4,000" delay={100} /></strong><small>▲ 2.4% <em>vs Last Week</em></small></div>
        <div className="customer-kpi"><div className="customer-icon yellow"><UserX size={20}/></div><span>Inactive Customers</span><strong><AnimatedNumber value="1,000" delay={150} /></strong><small className="down">▼ 1.2% <em>vs Last Week</em></small></div>
        <div className="customer-kpi"><div className="customer-icon pink"><CircleDollarSign size={20}/></div><span>Total Revenue</span><strong><AnimatedNumber value="$68,760" delay={200} /></strong><small>▲ 4.4% <em>vs Last Week</em></small></div>
      </div>

      <div className="customer-table-card card">
        <div className="customer-toolbar">
          <div className="customer-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search customers..."/></div>
          <div className="customer-filters">
            <button onClick={onDateClick}><CalendarDays size={15}/>{dateRange}<ChevronDown size={14}/></button>
            <button onClick={()=>setStatus(status==="Status"?"Active":"Status")}>{status}<ChevronDown size={14}/></button>
            <button><Filter size={15}/>Filters<ChevronDown size={14}/></button>
          </div>
        </div>

        <div className="customer-table">
          <div className="customer-tr customer-th"><span>Customer Name</span><span>Email</span><span>Phone</span><span>Total Orders</span><span>Total Spent</span><span>Joined Date</span><span>Status</span><span>Action</span></div>
          {rows.map((c,i)=><div className="customer-tr" key={i}>
            <span className="customer-name"><div className="avatar-small">{c[7]}</div><strong>{c[0]}</strong></span>
            <span>{c[1]}</span><span>{c[2]}</span><span>{c[3]}</span><span>{c[4]}</span><span>{c[5]}</span><span><CustomerStatus value={c[6]}/></span>
            <span><ActionMenu itemName={c[0]} /></span>
          </div>)}
        </div>
        <div className="customer-pagination">
          <span>Showing 1 to 10 of 45 customers</span>
          <button className="per-page">10 <ChevronDown size={13}/></button>
          <div><button>‹</button><button className="current-page">1</button><button>2</button><button>3</button><button>…</button><button>5</button><button>›</button></div>
        </div>
      </div>
    </section>
  );
}
