import React, { useState } from "react";
import { Activity, Clock3, FilePlus2, MoreVertical, Plus, Search, Settings2 } from "lucide-react";
import ActionMenu from "./ActionMenu";
import CMSContentModal from "./CMSContentModal";

export default function CMSPage({ pageKey }) {
  const [, group, item] = pageKey.split("|");
  const [query, setQuery] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const records = [
    [`${item} homepage draft`, "Draft", "Today, 10:24 AM"],
    [`${item} summer collection`, "Published", "Yesterday, 4:15 PM"],
    [`${item} promotional update`, "Scheduled", "12 Sept 2025"],
    [`${item} settings and configuration`, "Published", "10 Sept 2025"],
  ].filter((record) => record.join(" ").toLowerCase().includes(query.toLowerCase()));

  return <section className="cms-page"><div className="admin-page-header"><div><div className="cms-breadcrumb">CMS <span>›</span> {group}</div><h1>{item}</h1><p>Manage {item.toLowerCase()} in your {group.toLowerCase()} workspace</p></div><div className="cms-header-actions"><button className="secondary-btn" onClick={() => setModalMode("configure")}><Settings2 size={14} /> Configure</button><button className="primary-btn" onClick={() => setModalMode("create")}><Plus size={15} /> Create New</button></div></div><div className="cms-summary"><div className="cms-detail-stat card"><FilePlus2 size={18} /><span>Total Items<strong>24</strong><small>Across this workspace</small></span></div><div className="cms-detail-stat card"><Activity size={18} /><span>Published<strong>18</strong><small>Live and visible</small></span></div><div className="cms-detail-stat card"><Clock3 size={18} /><span>Scheduled<strong>4</strong><small>Upcoming updates</small></span></div><div className="cms-detail-stat card"><span className="warning-dot" /><span>Needs Review<strong>2</strong><small>Waiting for approval</small></span></div></div><section className="cms-workspace card"><div className="cms-workspace-head"><div><h2>Recent {item}</h2><p>Review and manage your latest {item.toLowerCase()} records</p></div><div className="cms-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${item.toLowerCase()}...`} /></div></div><div className="cms-record-table"><div className="cms-record-row cms-record-head"><span>Name</span><span>Status</span><span>Last Updated</span><span>Action</span></div>{records.map(([name, status, updated]) => <div className="cms-record-row" key={name}><strong>{name}</strong><em className={`cms-status ${status.toLowerCase()}`}>{status}</em><span>{updated}</span><button aria-label={`Actions for ${name}`}><MoreVertical size={17} /></button></div>)}{records.length === 0 && <div className="cms-empty">No records found.</div>}</div><div className="cms-workspace-footer"><span>Showing {records.length} of 24 items</span><button className="secondary-btn" onClick={() => setModalMode("create")}><Plus size={13} /> Add Item</button></div></section>{modalMode && <CMSContentModal mode={modalMode} item={item} onClose={() => setModalMode(null)} />}</section>;
}
