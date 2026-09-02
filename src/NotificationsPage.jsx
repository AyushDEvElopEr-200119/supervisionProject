import React, { useState } from "react";
import { Bell, CheckCircle2, Clock3, FileText, MessageSquare, MoreHorizontal, Search, UserRound, XCircle } from "lucide-react";

const notificationIcons = { published: FileText, updated: CheckCircle2, scheduled: Clock3, alert: XCircle, comment: UserRound };
export const initialNotifications = [
  { id: 1, type: "published", title: "Page Published", text: '"Summer Collection" has been published successfully.', time: "2m ago", read: false },
  { id: 2, type: "updated", title: "Content Updated", text: '"Promotional Banner" has been updated.', time: "15m ago", read: false },
  { id: 3, type: "scheduled", title: "Page Scheduled", text: '"Winter Sale" is scheduled to publish on 15 Sept 2025 at 10:00 AM', time: "1h ago", read: false },
  { id: 4, type: "alert", title: "Page Needs Review", text: '"Spring Collection" is waiting for your review.', time: "3h ago", read: true },
  { id: 5, type: "comment", title: "New Comment", text: 'John Doe commented on "Homepage Draft."', time: "5h ago", read: true },
  { id: 6, type: "updated", title: "Content Updated", text: '"Homepage Hero Section" content has been updated.', time: "Yesterday, 4:15 PM", read: true },
  { id: 7, type: "published", title: "Page Published", text: '"About Us" page has been published successfully.', time: "Yesterday, 11:30 AM", read: true },
];

export function NotificationPopover({ notifications, onMarkAllRead, onViewAll }) {
  const unread = notifications.filter((item) => !item.read).length;
  return <div className="notification-popover" role="dialog" aria-label="Notifications"><div className="notification-popover-head"><h3>Notifications</h3><button onClick={onMarkAllRead}>Mark all as read</button></div><div className="notification-popover-list">{notifications.slice(0, 5).map((item) => { const Icon = notificationIcons[item.type]; return <button className={`notification-popover-item ${item.read ? "read" : ""}`} key={item.id} onClick={onViewAll}><span className={`notification-icon ${item.type}`}><Icon size={17} /></span><span><strong>{item.title}</strong><small>{item.text}</small><time>{item.time}</time></span>{!item.read && <i />}</button>; })}</div><button className="notification-view-all" onClick={onViewAll}>View all notifications</button></div>;
}

export default function NotificationsPage({ notifications, onMarkAllRead }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = notifications.filter((item) => (filter === "All" || (filter === "Unread" && !item.read) || (filter === "Updates" && item.type === "updated") || (filter === "Comments" && item.type === "comment") || (filter === "Alerts" && ["alert", "scheduled"].includes(item.type))) && `${item.title} ${item.text}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="notifications-page"><div className="notifications-page-header"><div><div className="cms-breadcrumb">CMS <span>›</span> Notifications</div><h1>Notifications</h1><p>Stay updated with important activities and updates</p></div><button className="secondary-btn" onClick={onMarkAllRead}>Mark all as read</button></div><div className="notification-tabs">{["All", "Unread", "Updates", "Comments", "Alerts"].map((item) => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}{item === "Unread" && <b>{notifications.filter((notification) => !notification.read).length}</b>}</button>)}</div><section className="notifications-card card"><div className="notifications-toolbar"><div className="category-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notifications..." /></div><div><button className="secondary-btn">12 Sept - 20 Sept</button><button className="secondary-btn">All Types</button></div></div><div className="notification-table"><div className="notification-table-row notification-table-head"><span>Notification</span><span>Time</span><span>Action</span></div>{filtered.map((item) => { const Icon = notificationIcons[item.type]; return <div className={`notification-table-row ${item.read ? "read" : ""}`} key={item.id}><span className="notification-detail"><i className={`notification-icon ${item.type}`}><Icon size={17} /></i><strong>{item.title}<small>{item.text}</small></strong></span><span>{item.time}</span><span className="notification-row-action">{!item.read && <b /> }<button aria-label={`Actions for ${item.title}`}><MoreHorizontal size={17} /></button></span></div>; })}{filtered.length === 0 && <div className="notification-empty">No notifications found.</div>}</div><div className="notifications-footer"><span>Showing 1 to {filtered.length} of 24 notifications</span><div><button>«</button><button>‹</button><button className="active-page">1</button><button>2</button><button>3</button><button>›</button><button>»</button></div></div></section></section>;
}
