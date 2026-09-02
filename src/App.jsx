import React, { useState } from "react";
import ProductPage from "./ProductPage";
import AddProductPage from "./AddProductPage";
import MasterPage from "./MasterPage";
import CategoryMasterPage from "./CategoryMasterPage";
import SubCategoryMasterPage from "./SubCategoryMasterPage";
import MasterFormPage from "./MasterFormPage";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";
import IntegrationsPage from "./IntegrationsPage";
import CMSPage from "./CMSPage";
import LoginPage from "./LoginPage";
import ExportModal from "./ExportModal";
import DateRangeModal from "./DateRangeModal";
import NotificationsPage, { initialNotifications, NotificationPopover } from "./NotificationsPage";
import CustomersPage from "./CustomersPage";
import OrdersPage from "./OrdersPage";
import RolesPage from "./RolesPage";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  FileText,
  FolderOpen,
  Gauge,
  Image,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  TrendingUp,
  Upload,
  Users,
  XCircle,
  Tags,
  ListTree,
  Ruler,
  Receipt,
  Warehouse,
  ShieldCheck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesData = [
  { day: "Sun", sales: 52, revenue: 42 },
  { day: "Mon", sales: 72, revenue: 62 },
  { day: "Tue", sales: 44, revenue: 38 },
  { day: "Wed", sales: 58, revenue: 48 },
  { day: "Thu", sales: 76, revenue: 66 },
  { day: "Fri", sales: 57, revenue: 46 },
  { day: "Sat", sales: 50, revenue: 42 },
];

const orders = [
  ["#11852", "Black Solid T-Shirt", "Nowshad Khan", "25 Dec 2025", "$300.00", "In Progress"],
  ["#11878", "Men's Sneakers", "Khalid Rahman", "25 Dec 2025", "$500.00", "In Progress"],
  ["#11868", "Men's Jogger", "Ashraf Ali", "24 Dec 2025", "$200.00", "Pending"],
  ["#11842", "Men's Sneakers", "Ratul Rezwan", "23 Dec 2025", "$700.00", "Completed"],
  ["#11821", "Hoodie Jacket", "Fahim Hossain", "22 Dec 2025", "$400.00", "Cancelled"],
];

const posts = [
  ["How to Choose the Right Sneakers", "25 Dec 2025", "SN"],
  ["Top 10 Winter Fashion Trends", "22 Dec 2025", "TW"],
  ["How to Style Your Hoodie", "20 Dec 2025", "HS"],
  ["Best Fabrics for All Seasons", "18 Dec 2025", "BF"],
  ["Streetwear Looks You'll Love", "15 Dec 2025", "SL"],
];

function Logo() {
  return (
    <div className="logo" aria-label="Bloom">
      Blo<span>o</span>m
    </div>
  );
}

function ProfileAvatar({ className = "avatar" }) {
  return <><img className={className} src="/avatar.png" alt="Ayush" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.nextElementSibling.style.display = "grid"; }} /><span className={`${className} avatar-fallback`}>AY</span></>;
}

function Sidebar({ currentPage, setCurrentPage }) {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth <= 900);
  const [masterOpen, setMasterOpen] = useState(currentPage.endsWith(" Master"));
  const [openModule, setOpenModule] = useState(currentPage.startsWith("MODULE|") ? currentPage.split("|")[1] : null);
  const main = [
    [LayoutDashboard, "Dashboard"],
    [Activity, "Analytics"],
    [ShoppingBag, "Orders"],
    [Users, "Customers"],
    [Package, "Products"],
  ];
  const masterItems = [
    [Tags, "Category Master"],
    [ListTree, "Sub Category Master"],
    [Tags, "Brand Master"],
    [Ruler, "Unit Master"],
    [Receipt, "Tax Master"],
    [Warehouse, "Warehouse Master"],
    [SlidersHorizontal, "Attribute Master"],
  ];
  const modules = [
    ["Content", ["Pages", "Blog", "Media Library", "FAQs", "Announcements", "Content Blocks"]],
    ["Storefront", ["Homepage", "Theme", "Header & Footer", "Navigation", "Mega Menu", "Banners", "Sliders", "Storefront Sections"]],
    ["Product Discovery", ["Featured Products", "New Arrivals", "Best Sellers", "Trending Products", ["Collections", ["Product Collections", "Category Collections", "Brand Collections", "Custom Collections"]]]],
    ["Marketing", ["Campaigns", "Promotions", "Coupons", "Flash Sales", "Popups", "Discount Banners", "Referral Program", "Gift Cards"]],
    ["Customer Engagement", ["Reviews", "Ratings", "Testimonials", "Product Q&A", "User Generated Content", "Moderation"]],
    ["SEO & Growth", ["SEO Dashboard", "Page SEO", "Product SEO", "Category SEO", "Blog SEO", "Meta Templates", "URL Manager", "Redirects", "Sitemap", "Robots.txt", "Structured Data"]],
    ["Communication", ["Email", "SMS", "Push Notifications", "WhatsApp", "In-App Notifications", "Notification Campaigns"]],
    ["Personalization", ["Customer Segments", "Personalized Content", "Personalized Banners", "Product Recommendations", "Recently Viewed", "Personalization Rules"]],
    ["Localization", ["Languages", "Translations", "Countries", "Regions", "Currencies", "Regional Content"]],
    ["Policies", ["Privacy Policy", "Terms & Conditions", "Shipping Policy", "Return Policy", "Refund Policy", "Cancellation Policy", "Cookie Policy", "Custom Policies"]],
  ];
  const moduleIcons = {
    Content: FileText,
    Storefront: Package,
    "Product Discovery": Search,
    Marketing: Activity,
    "Customer Engagement": Users,
    "SEO & Growth": TrendingUp,
    Communication: MessageSquare,
    Personalization: SlidersHorizontal,
    Localization: CalendarDays,
    Policies: ShieldCheck,
  };
  const submenuIcons = {
    Pages: FileText, Blog: MessageSquare, "Media Library": Image, FAQs: MessageSquare, Announcements: Bell, "Content Blocks": FolderOpen,
    Homepage: LayoutDashboard, Theme: SlidersHorizontal, "Header & Footer": Menu, Navigation: Menu, "Mega Menu": Menu, Banners: Image, Sliders: SlidersHorizontal, "Storefront Sections": FolderOpen,
    "Featured Products": Package, "New Arrivals": TrendingUp, "Best Sellers": TrendingUp, "Trending Products": Activity, "Product Collections": FolderOpen, "Category Collections": Tags, "Brand Collections": Tags, "Custom Collections": FolderOpen,
    Campaigns: CalendarDays, Promotions: Tags, Coupons: Tags, "Flash Sales": Activity, Popups: MessageSquare, "Discount Banners": Image, "Referral Program": Users, "Gift Cards": Package,
    Reviews: MessageSquare, Ratings: TrendingUp, Testimonials: MessageSquare, "Product Q&A": MessageSquare, "User Generated Content": Users, Moderation: ShieldCheck,
    "SEO Dashboard": TrendingUp, "Page SEO": Search, "Product SEO": Package, "Category SEO": Tags, "Blog SEO": MessageSquare, "Meta Templates": FileText, "URL Manager": Search, Redirects: Activity, Sitemap: FolderOpen, "Robots.txt": FileText, "Structured Data": FolderOpen,
    Email: MessageSquare, SMS: MessageSquare, "Push Notifications": Bell, WhatsApp: MessageSquare, "In-App Notifications": Bell, "Notification Campaigns": CalendarDays,
    "Customer Segments": Users, "Personalized Content": FileText, "Personalized Banners": Image, "Product Recommendations": Package, "Recently Viewed": Activity, "Personalization Rules": SlidersHorizontal,
    Languages: FileText, Translations: MessageSquare, Countries: CalendarDays, Regions: CalendarDays, Currencies: Tags, "Regional Content": FileText,
    "Privacy Policy": FileText, "Terms & Conditions": FileText, "Shipping Policy": FileText, "Return Policy": FileText, "Refund Policy": FileText, "Cancellation Policy": FileText, "Cookie Policy": FileText, "Custom Policies": FolderOpen,
  };
  const settings = [
    [Settings, "Settings"],
    [Users, "Users"],
    [Users, "Roles & Permissions"],
    [SlidersHorizontal, "Integrations"],
  ];

  const section = (title, items) => (
    <div className="side-section" key={title}>
      <div className="side-label">{title}</div>
      {items.map(([Icon, label]) => (
        <button
          className={`side-item ${currentPage === label ? "active" : ""}`}
          key={label}
          onClick={() => setCurrentPage(label)}
          title={collapsed ? label : undefined}
        >
          <Icon size={17} strokeWidth={1.8} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );

  const moduleItems = (module, items) => items.map((entry) => {
    if (Array.isArray(entry)) {
      return <div className="cms-nested-group" key={entry[0]}><div className="cms-group-label">{entry[0]}</div>{moduleItems(module, entry[1])}</div>;
    }
    const key = `MODULE|${module}|${entry}`;
    const SubmenuIcon = submenuIcons[entry] || FileText;
    return <button className={`side-item master-subitem ${currentPage === key ? "active" : ""}`} key={key} onClick={() => setCurrentPage(key)} title={collapsed ? entry : undefined}><SubmenuIcon size={13} strokeWidth={1.8} /><span>{entry}</span></button>;
  });

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand"><Logo /><button className="sidebar-toggle" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}><Menu size={16} /></button></div>
      {section("MAIN", main)}
      <button className={`side-item master-toggle ${masterOpen || currentPage.endsWith(" Master") ? "active" : ""}`} onClick={() => { if (collapsed) setCollapsed(false); setMasterOpen((open) => collapsed || !open); }}>
        <Tags size={17} strokeWidth={1.8} />
        <span>Master</span>
        <ChevronDown className={masterOpen ? "master-chevron open" : "master-chevron"} size={14} />
      </button>
      {masterOpen && <div className="master-submenu">{masterItems.map(([Icon, label]) => <button className={`side-item master-subitem ${currentPage === label ? "active" : ""}`} key={label} onClick={() => setCurrentPage(label)} title={collapsed ? label : undefined}><Icon size={14} strokeWidth={1.8} /><span>{label}</span></button>)}</div>}
      <div className="divider" />
      <div className="module-navigation">{modules.map(([module, items]) => { const ModuleIcon = moduleIcons[module]; return <div className="cms-module" key={module}><button className={`side-item master-toggle ${openModule === module ? "active" : ""}`} onClick={() => { if (collapsed) setCollapsed(false); setOpenModule((open) => collapsed || open !== module ? module : null); }} title={collapsed ? `Open ${module}` : undefined}><ModuleIcon size={17} strokeWidth={1.8} /><span>{module}</span><ChevronDown className={openModule === module ? "master-chevron open" : "master-chevron"} size={14} /></button>{openModule === module && <div className="cms-submenu">{moduleItems(module, items)}</div>}</div>; })}</div>
      <div className="divider" />
      {section("SETTINGS", settings)}

      
    </aside>
  );
}

function Topbar({ currentPage, setCurrentPage, onLogout, notifications, onMarkAllRead, onViewNotifications }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <header className="topbar">
      <nav className="top-nav">
        {["Dashboard", "Products", "Orders", "Customers"].map((item) => (
          <button
            className={currentPage === item ? "selected" : ""}
            key={item}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="top-actions">
        <div className="global-search">
          <Search size={17} />
          <span>Search anything...</span>
          <kbd>⌘K</kbd>
        </div>
        <button className="icon-button notification" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Open notifications" aria-expanded={notificationsOpen}>
          <Bell size={18} />
          {notifications.filter((item) => !item.read).length > 0 && <span>{notifications.filter((item) => !item.read).length}</span>}
        </button>
        {notificationsOpen && <NotificationPopover notifications={notifications} onMarkAllRead={onMarkAllRead} onViewAll={() => { setNotificationsOpen(false); onViewNotifications(); }} />}
        <button className={`profile ${accountOpen ? "open" : ""}`} onClick={() => setAccountOpen((open) => !open)} aria-expanded={accountOpen} aria-haspopup="menu">
          <ProfileAvatar />
          <div>
            <strong>Ayush</strong>
            <small>Super Admin</small>
          </div>
          <ChevronDown size={16} />
        </button>
        {accountOpen && <div className="account-menu" role="menu"><button role="menuitem" onClick={() => setAccountOpen(false)}><Users size={15} /><span><strong>My Profile</strong><small>View your profile</small></span></button><button role="menuitem" onClick={() => { setCurrentPage("Settings"); setAccountOpen(false); }}><Settings size={15} /><span><strong>Account Settings</strong><small>Manage your account</small></span></button><button role="menuitem" onClick={() => { setAccountOpen(false); onLogout(); }}><Users size={15} /><span><strong>Switch Account</strong><small>Sign in as another user</small></span></button><div className="account-menu-divider" /><button className="logout-item" role="menuitem" onClick={onLogout}><XCircle size={15} /><span><strong>Logout</strong><small>End your current session</small></span></button></div>}
      </div>
    </header>
  );
}

function KpiCard({ icon: Icon, title, value, change, down }) {
  return (
    <div className="kpi card">
      <div className="kpi-head">
        <span>{title}</span>
        <div className="kpi-icon"><Icon size={17} /></div>
      </div>
      <strong>{value}</strong>
      <small className={down ? "negative" : "positive"}>
        {down ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
        {change} <span>vs Last Week</span>
      </small>
    </div>
  );
}

function ProfitChart() {
  return (
    <div className="card profit-card">
      <div className="panel-head">
        <div>
          <h2>Total Profit</h2>
          <div className="profit-value">$230,760 <span>+8.4% ↑</span></div>
        </div>
        <button className="select">Last 7 days <ChevronDown size={14} /></button>
      </div>
      <div className="legend">
        <span><i className="dot muted" />Total Sales</span>
        <span><i className="dot purple" />Total Revenue</span>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} barGap={0} margin={{ top: 5, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e9e9ef" strokeDasharray="3 3" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#777785", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#777785", fontSize: 10 }} ticks={[0,20,40,60,80,100]} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="sales" fill="#e9e9ee" radius={[3,3,0,0]} barSize={30} />
            <Bar dataKey="revenue" fill="#6557ee" radius={[3,3,0,0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SuccessRate() {
  return (
    <div className="card success-card">
      <div className="panel-head">
        <h2>Success Rate</h2>
        <button className="select">Last 7 days <ChevronDown size={14} /></button>
      </div>
      <div className="gauge">
        <div className="gauge-arc">
          {Array.from({ length: 18 }).map((_, i) => (
            <i key={i} className={i < 14 ? "on" : ""} style={{ transform: `rotate(${i * 10 - 85}deg)` }} />
          ))}
        </div>
        <div className="gauge-center">
          <strong>78.6%</strong>
          <span>Sales Growth</span>
        </div>
      </div>
      <div className="mini-stats">
        <div>
          <span><TrendingUp size={14} /> Sales Number</span>
          <strong>2,550</strong>
          <em>+6.4% ↑</em>
        </div>
        <div>
          <span><CircleDollarSign size={14} /> Total Revenue</span>
          <strong>$68,760</strong>
          <em className="orange">+4.4% ↑</em>
        </div>
      </div>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="card orders-card">
      <div className="panel-head">
        <div>
          <h2>Recent Orders</h2>
          <p>Track the latest customer orders</p>
        </div>
        <div className="table-tools">
          <div className="small-search"><Search size={15} /> Search orders...</div>
          <button className="filter-btn">Status <ChevronDown size={14} /></button>
        </div>
      </div>

      <div className="table">
        <div className="tr th">
          <span>Order ID</span><span>Products</span><span>Customer</span><span>Date</span><span>Amount</span><span>Status</span><span>Action</span>
        </div>
        {orders.map((o) => (
          <div className="tr" key={o[0]}>
            <span>{o[0]}</span>
            <span className="product-cell"><div className="product-thumb">●</div><div><strong>{o[1]}</strong><small>+2 other products</small></div></span>
            <span>{o[2]}</span>
            <span>{o[3]}</span>
            <span>{o[4]}</span>
            <span><Status text={o[5]} /></span>
            <span className="eye">◉</span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button>‹</button><button className="current">1</button><button>2</button><button>3</button><button>...</button><button>10</button><button>›</button>
      </div>
    </div>
  );
}

function Status({ text }) {
  const cls = text.toLowerCase().replace(" ", "-");
  return <span className={`status ${cls}`}>{text} <ChevronDown size={11} /></span>;
}

function SalesOverview() {
  return (
    <div className="card sales-card">
      <div className="panel-head">
        <h2>Sales Overview</h2>
        <button className="select">Last 7 days <ChevronDown size={14} /></button>
      </div>
      <div className="sales-metrics">
        <MetricBar title="Successful Sales" value="47.05%" cls="green" />
        <MetricBar title="Pending" value="32.48%" cls="orange" />
        <MetricBar title="Cancelled" value="20.47%" cls="red" />
      </div>
      <div className="sales-products">
        <div className="sales-row sales-header"><span>Product Name</span><span>Percent</span><span>Earnings</span></div>
        {[
          ["Black Solid T-Shirt", "32%", "$40,000"],
          ["Men's Jogger (Black)", "30%", "$26,000"],
          ["Men's Sneakers", "20%", "$18,000"],
          ["Hoodie Jacket", "18%", "$14,000"],
        ].map((p) => (
          <div className="sales-row" key={p[0]}>
            <span className="product-name"><i className="tiny-product" />{p[0]}</span><span>{p[1]}</span><span>{p[2]}</span>
          </div>
        ))}
      </div>
      <button className="full-report">View Full Report <ArrowUpRight size={15} /></button>
    </div>
  );
}

function MetricBar({ title, value, cls }) {
  return (
    <div className={`metric-bar ${cls}`}>
      <span><i />{title}</span>
      <strong>{value}</strong>
      <div className="bars">{Array.from({ length: 22 }).map((_, i) => <b key={i} />)}</div>
    </div>
  );
}

function CmsOverview() {
  return (
    <div className="card cms-card">
      <div className="panel-head">
        <div><h2>CMS Overview</h2><p>Manage your content and website</p></div>
      </div>
      <div className="cms-layout">
        <div className="cms-stats">
          {[
            [FileText, "Pages", "24", "blue"],
            [FileText, "Blog Posts", "36", "green"],
            [Image, "Media Files", "1,248", "orange"],
            [MessageSquare, "Comments", "128", "purple"],
          ].map(([Icon, title, value, color]) => (
            <div className={`cms-stat ${color}`} key={title}>
              <Icon size={20} /><span>{title}</span><strong>{value}</strong>
            </div>
          ))}
          <div className="cms-pages">
            <h3>Top Pages</h3>
            {[
              ["Home Page", "12,586", "8,560"],
              ["Shop Page", "8,425", "6,241"],
              ["Product Page", "6,254", "4,180"],
              ["About Us", "3,245", "2,154"],
              ["Contact Us", "1,254", "842"],
            ].map((r) => <div className="page-row" key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span><em>Published</em></div>)}
          </div>
          <button className="manage-btn">Manage Pages <ArrowUpRight size={15} /></button>
        </div>

        <div className="recent-posts">
          <div className="subhead"><h3>Recent Blog Posts</h3><a>View All</a></div>
          {posts.map(([title, date, initials]) => (
            <div className="post" key={title}><div className="post-image">{initials}</div><div><strong>{title}</strong><small>{date}</small></div></div>
          ))}
          <button className="manage-btn">Manage Blog Posts <ArrowUpRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}

function ActivityPanel() {
  const items = [
    ["Ayush published a new page “Winter Collection”", "2 mins ago", FileText],
    ["Admin updated product “Black Solid T-Shirt”", "15 mins ago", Package],
    ["Sara commented on blog post “Top 10 Winter Fashion Trends”", "1 hour ago", MessageSquare],
    ["John Doe placed a new order #11852", "2 hours ago", ShoppingBag],
    ["Media file “banner-winter.jpg” uploaded", "3 hours ago", Upload],
    ["Menu “Main Menu” updated", "5 hours ago", Menu],
  ];
  return (
    <div className="card activity-card">
      <div className="subhead"><h3>Recent Activity</h3><a>View All</a></div>
      {items.map(([text, time, Icon]) => (
        <div className="activity-item" key={text}>
          <div className="activity-icon"><Icon size={14} /></div>
          <span>{text}</span><time>{time}</time>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [productView, setProductView] = useState("list");
  const [exportReport, setExportReport] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState("12 Sept - 20 Sept");
  const [notifications, setNotifications] = useState(initialNotifications);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === "Products") setProductView("list");
  };

  if (!authenticated) return <LoginPage onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} setCurrentPage={navigateTo} />
      <main className="main">
        <Topbar currentPage={currentPage} setCurrentPage={navigateTo} onLogout={() => setAuthenticated(false)} notifications={notifications} onMarkAllRead={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))} onViewNotifications={() => navigateTo("Notifications")} />

        {currentPage === "Products" ? (
          productView === "add" ? <AddProductPage onBack={() => setProductView("list")} /> : <ProductPage onAddProduct={() => setProductView("add")} onExport={() => setExportReport("Products")} onDateClick={() => setDatePickerOpen(true)} dateRange={dateRange} />
        ) : currentPage === "Category Master" ? (
          <CategoryMasterPage onBack={() => navigateTo("Products")} />
        ) : currentPage === "Sub Category Master" ? (
          <SubCategoryMasterPage onBack={() => navigateTo("Products")} />
        ) : currentPage.startsWith("MODULE|") ? (
          <CMSPage pageKey={currentPage} />
        ) : ["Brand Master", "Unit Master", "Tax Master", "Warehouse Master", "Attribute Master"].includes(currentPage) ? (
          <MasterFormPage masterName={currentPage} onBack={() => navigateTo("Products")} />
        ) : currentPage.endsWith(" Master") ? (
          <MasterPage masterName={currentPage} />
        ) : currentPage === "Customers" ? (
          <CustomersPage onExport={() => setExportReport("Customers")} onDateClick={() => setDatePickerOpen(true)} dateRange={dateRange} />
        ) : currentPage === "Orders" ? (
          <OrdersPage onExport={() => setExportReport("Orders")} onDateClick={() => setDatePickerOpen(true)} dateRange={dateRange} />
        ) : currentPage === "Notifications" ? (
          <NotificationsPage notifications={notifications} onMarkAllRead={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))} />
        ) : currentPage === "Roles & Permissions" ? (
          <RolesPage />
        ) : currentPage === "Settings" ? (
          <SettingsPage />
        ) : currentPage === "Users" ? (
          <UsersPage />
        ) : currentPage === "Integrations" ? (
          <IntegrationsPage />
        ) : (
          <section className="content">
            <div className="welcome-row">
              <div>
                <h1>Welcome, Ayush <span>👋</span></h1>
                <p>Manage your business, content, and performance in one place.</p>
              </div>
              <div className="header-actions">
                <button className="date-btn" onClick={() => setDatePickerOpen(true)}><CalendarDays size={15} />{dateRange} <ChevronDown size={14} /></button>
                <button className="export-btn" onClick={() => setExportReport("Dashboard")}><Upload size={15} />Export Report</button>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="kpi-grid">
                <KpiCard icon={TrendingUp} title="Total Sales" value="12,485" change="+3.1%" />
                <KpiCard icon={CircleDollarSign} title="Total Revenue" value="$68,760" change="+2.4%" />
                <KpiCard icon={Users} title="Active Customers" value="4,220" change="+2.4%" />
                <KpiCard icon={FileText} title="Refund Requests" value="250" change="-0.6%" down />
              </div>
              <ProfitChart />
              <SuccessRate />
              <OrdersTable />
              <SalesOverview />
              <CmsOverview />
              <ActivityPanel />
            </div>
          </section>
        )}
      </main>
      {exportReport && <ExportModal reportName={exportReport} onClose={() => setExportReport(null)} onDateClick={() => setDatePickerOpen(true)} dateRange={dateRange} />}
      {datePickerOpen && <DateRangeModal onClose={() => setDatePickerOpen(false)} onApply={setDateRange} />}
    </div>
  );
}

