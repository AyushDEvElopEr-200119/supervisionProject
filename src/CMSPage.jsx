import React, { useState } from "react";
import { Activity, Clock3, FilePlus2, Plus, Search, Settings2, ShieldCheck, CheckCircle2 } from "lucide-react";
import ActionMenu from "./ActionMenu";
import CMSContentModal from "./CMSContentModal";
import { AnimatedNumber } from "./AnimatedUtils";

export default function CMSPage({ pageKey }) {
  const [, group, item] = pageKey.split("|");
  const [query, setQuery] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const isPolicy = group === "Policies";

  // Realistic domain-specific records
  const getRecordsForGroup = () => {
    if (group === "Policies") {
      return [
        [`${item} — v2.4 (Current Live Policy)`, "Published", "Updated 3 days ago"],
        [`${item} — 2026 Compliance Revision`, "Draft", "Today, 11:30 AM"],
        [`${item} — Global Consumer Rights Addendum`, "Scheduled", "15 Sept 2025"],
        [`${item} — Historical Archive (v1.9)`, "Published", "12 Aug 2025"],
      ];
    }
    if (group === "Storefront") {
      return [
        [`${item} — Desktop Master Layout`, "Published", "Today, 10:24 AM"],
        [`${item} — Mobile Optimized View`, "Published", "Yesterday, 4:15 PM"],
        [`${item} — Holiday Promotional Variation`, "Draft", "14 Sept 2025"],
        [`${item} — Brand Refresh Staging`, "Scheduled", "10 Sept 2025"],
      ];
    }
    if (group === "Marketing") {
      return [
        [`${item} — Fall Season Launch`, "Published", "Today, 09:15 AM"],
        [`${item} — VIP Exclusive Offer`, "Scheduled", "Tomorrow, 8:00 AM"],
        [`${item} — Flash Weekend Campaign`, "Draft", "Yesterday, 2:40 PM"],
        [`${item} — Customer Loyalty Reward`, "Published", "08 Sept 2025"],
      ];
    }
    if (group === "SEO & Growth") {
      return [
        [`${item} — Core Target Indexing Rules`, "Published", "Today, 12:00 PM"],
        [`${item} — Canonical & Schema Mapping`, "Published", "Yesterday, 5:20 PM"],
        [`${item} — Organic Ranking Draft`, "Draft", "13 Sept 2025"],
        [`${item} — Search Crawl Optimization`, "Scheduled", "09 Sept 2025"],
      ];
    }
    return [
      [`${item} — Main Production Version`, "Published", "Today, 10:24 AM"],
      [`${item} — Working Draft Revision`, "Draft", "Yesterday, 4:15 PM"],
      [`${item} — Scheduled Quarterly Update`, "Scheduled", "12 Sept 2025"],
      [`${item} — System Configuration Master`, "Published", "10 Sept 2025"],
    ];
  };

  const records = getRecordsForGroup().filter((record) =>
    record.join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="cms-page">
      <div className="admin-page-header">
        <div>
          <div className="cms-breadcrumb">
            CMS <span>›</span> {group} <span>›</span> <strong>{item}</strong>
          </div>
          <h1>{item}</h1>
          <p>
            {isPolicy
              ? `Manage legal compliance, privacy mandates, and policy governance for ${item.toLowerCase()}`
              : `Manage and configure ${item.toLowerCase()} in your ${group.toLowerCase()} workspace`}
          </p>
        </div>
        <div className="cms-header-actions">
          <button className="secondary-btn" onClick={() => setModalMode("configure")}>
            <Settings2 size={15} /> Configure
          </button>
          <button className="primary-btn" onClick={() => setModalMode("create")}>
            <Plus size={15} /> {isPolicy ? "Draft Policy" : "Create New"}
          </button>
        </div>
      </div>

      <div className="cms-summary">
        <div className="cms-detail-stat card">
          <div className="stat-icon-wrap purple">
            <FilePlus2 size={20} />
          </div>
          <div>
            <span>{isPolicy ? "Total Documents" : "Total Items"}</span>
            <strong>
              <AnimatedNumber value="24" delay={50} />
            </strong>
            <small>{isPolicy ? "Legal policies & versions" : "Across this module"}</small>
          </div>
        </div>
        <div className="cms-detail-stat card">
          <div className="stat-icon-wrap green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Published</span>
            <strong>
              <AnimatedNumber value="18" delay={100} />
            </strong>
            <small>{isPolicy ? "Active live policies" : "Live and visible"}</small>
          </div>
        </div>
        <div className="cms-detail-stat card">
          <div className="stat-icon-wrap orange">
            <Clock3 size={20} />
          </div>
          <div>
            <span>Scheduled</span>
            <strong>
              <AnimatedNumber value="4" delay={150} />
            </strong>
            <small>{isPolicy ? "Upcoming legal revisions" : "Upcoming releases"}</small>
          </div>
        </div>
        <div className="cms-detail-stat card">
          <div className="stat-icon-wrap blue">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span>Needs Review</span>
            <strong>
              <AnimatedNumber value="2" delay={200} />
            </strong>
            <small>{isPolicy ? "Pending compliance sign-off" : "Waiting for approval"}</small>
          </div>
        </div>
      </div>

      <section className="cms-workspace card">
        <div className="cms-workspace-head">
          <div>
            <h2>{isPolicy ? `${item} Revisions & Governance` : `${item} Records`}</h2>
            <p>
              {isPolicy
                ? `Review active live policies, version history, and compliance status`
                : `Review, search, and manage your latest ${item.toLowerCase()} entries`}
            </p>
          </div>
          <div className="cms-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isPolicy ? `Search ${item.toLowerCase()} versions...` : `Search ${item.toLowerCase()}...`}
            />
          </div>
        </div>

        <div className="cms-record-table">
          <div className="cms-record-row cms-record-head">
            <span>{isPolicy ? "Policy Version & Clause Title" : "Name & Description"}</span>
            <span>{isPolicy ? "Enforcement Status" : "Status"}</span>
            <span>{isPolicy ? "Last Revised" : "Last Updated"}</span>
            <span style={{ textAlign: "center" }}>Action</span>
          </div>
          {records.map(([name, status, updated]) => (
            <div className="cms-record-row" key={name}>
              <strong>{name}</strong>
              <span>
                <em className={`cms-status ${status.toLowerCase()}`}>{status}</em>
              </span>
              <span>{updated}</span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <ActionMenu itemName={name} />
              </span>
            </div>
          ))}
          {records.length === 0 && (
            <div className="cms-empty">No records found matching "{query}".</div>
          )}
        </div>

        <div className="cms-workspace-footer">
          <span>
            Showing {records.length} of 24 {item.toLowerCase()} records
          </span>
          <button className="secondary-btn" onClick={() => setModalMode("create")}>
            <Plus size={14} /> {isPolicy ? "Add Policy Revision" : "Add New Entry"}
          </button>
        </div>
      </section>

      {modalMode && (
        <CMSContentModal mode={modalMode} item={item} onClose={() => setModalMode(null)} />
      )}
    </section>
  );
}
