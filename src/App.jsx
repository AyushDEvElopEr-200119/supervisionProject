import React, { useState, useEffect, useRef } from "react";
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
import { getStoredAuth, setStoredAuth, clearStoredAuth, getMe } from "./services/api";
import ExportModal from "./ExportModal";
import DateRangeModal from "./DateRangeModal";
import NotificationsPage, { initialNotifications, NotificationPopover } from "./NotificationsPage";
import CustomersPage from "./CustomersPage";
import OrdersPage from "./OrdersPage";
import RolesPage from "./RolesPage";
import { AnimatedNumber, Sparkline, usePrefersReducedMotion } from "./AnimatedUtils";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  DollarSign,
  FileText,
  FolderOpen,
  Gauge,
  Image,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Package,
  Receipt,
  RotateCcw,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  TrendingUp,
  Upload,
  User,
  Users,
  XCircle,
  Tags,
  ListTree,
  Ruler,
  Warehouse,
  ShieldCheck,
  Eye,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const salesData = [
  { day: "Sun", sales: 48, revenue: 35, date: "24 Dec, 2025", salesCount: "1,840", revValue: "$85,000", leftPct: "10.5%" },
  { day: "Mon", sales: 76, revenue: 64, date: "25 Dec, 2025", salesCount: "2,290", revValue: "$120,900", leftPct: "24.5%" },
  { day: "Tue", sales: 44, revenue: 32, date: "26 Dec, 2025", salesCount: "1,420", revValue: "$68,500", leftPct: "37.5%" },
  { day: "Wed", sales: 58, revenue: 40, date: "27 Dec, 2025", salesCount: "1,910", revValue: "$92,400", leftPct: "50.5%" },
  { day: "Thu", sales: 74, revenue: 52, date: "28 Dec, 2025", salesCount: "2,150", revValue: "$108,200", leftPct: "63.5%" },
  { day: "Fri", sales: 56, revenue: 38, date: "29 Dec, 2025", salesCount: "1,730", revValue: "$84,000", leftPct: "76.5%" },
  { day: "Sat", sales: 50, revenue: 35, date: "30 Dec, 2025", salesCount: "1,600", revValue: "$79,500", leftPct: "89.5%" },
];

const ordersList = [
  {
    id: "#11852",
    name: "Black Solid T-Shirt",
    extra: "+2 other products",
    customer: "Nowshad Khan",
    date: "25 Dec 2025",
    amount: "$300.00",
    status: "In Progress",
    statusType: "in-progress",
    img: "/tshirt.svg",
  },
  {
    id: "#11878",
    name: "Men's Sneakers",
    extra: "+2 other products",
    customer: "Khalid Rahman",
    date: "25 Dec 2025",
    amount: "$500.00",
    status: "In Progress",
    statusType: "in-progress",
    img: "/sneakers.svg",
  },
  {
    id: "#11868",
    name: "Men's Jogger",
    extra: null,
    customer: "Ashraf Ali",
    date: "24 Dec 2025",
    amount: "$200.00",
    status: "Pending",
    statusType: "pending",
    img: "/jogger.svg",
  },
  {
    id: "#11842",
    name: "Men's Sneakers",
    extra: null,
    customer: "Ratul Rezwan",
    date: "23 Dec 2025",
    amount: "$700.00",
    status: "Completed",
    statusType: "completed",
    img: "/sneakers.svg",
  },
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

function ProfileAvatar({ className = "avatar", user }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "JS"
    : "JS";
  const fullName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Jon Snow";

  if (imgFailed) {
    return <span className={`${className} avatar-fallback`}>{initials}</span>;
  }

  return (
    <img
      className={className}
      src="/avatar.svg"
      alt={fullName}
      onError={() => setImgFailed(true)}
    />
  );
}

function Sidebar({ currentPage, setCurrentPage }) {
  const [collapsed, setCollapsed] = useState(true);
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

  const moduleItems = (module, items) =>
    items.map((entry) => {
      if (Array.isArray(entry)) {
        return (
          <div className="cms-nested-group" key={entry[0]}>
            <div className="cms-group-label">{entry[0]}</div>
            {moduleItems(module, entry[1])}
          </div>
        );
      }
      const key = `MODULE|${module}|${entry}`;
      const SubmenuIcon = submenuIcons[entry] || FileText;
      return (
        <button
          className={`side-item master-subitem ${currentPage === key ? "active" : ""}`}
          key={key}
          onClick={() => setCurrentPage(key)}
          title={collapsed ? entry : undefined}
        >
          <SubmenuIcon size={13} strokeWidth={1.8} />
          <span>{entry}</span>
        </button>
      );
    });

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <Logo />
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={16} />
        </button>
      </div>

      {section("MAIN", main)}

      <button
        className={`side-item master-toggle ${masterOpen || currentPage.endsWith(" Master") ? "active" : ""}`}
        onClick={() => {
          if (collapsed) setCollapsed(false);
          setMasterOpen((open) => collapsed || !open);
        }}
      >
        <Tags size={17} strokeWidth={1.8} />
        <span>Master</span>
        <ChevronDown className={masterOpen ? "master-chevron open" : "master-chevron"} size={14} />
      </button>

      {masterOpen && (
        <div className="master-submenu">
          {masterItems.map(([Icon, label]) => (
            <button
              className={`side-item master-subitem ${currentPage === label ? "active" : ""}`}
              key={label}
              onClick={() => setCurrentPage(label)}
              title={collapsed ? label : undefined}
            >
              <Icon size={14} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="side-section">
        <div className="side-label">MODULES</div>
        {modules.map(([modName, modSub]) => (
          <div className="cms-group" key={modName}>
            <button
              className={`side-item master-toggle ${openModule === modName ? "active" : ""}`}
              onClick={() => {
                if (collapsed) setCollapsed(false);
                setOpenModule((current) => (current === modName ? null : modName));
              }}
              title={collapsed ? modName : undefined}
            >
              {React.createElement(moduleIcons[modName] || FolderOpen, { size: 17, strokeWidth: 1.8 })}
              <span>{modName}</span>
              <ChevronDown className={openModule === modName ? "master-chevron open" : "master-chevron"} size={14} />
            </button>
            {openModule === modName && (
              <div className="master-submenu">
                {moduleItems(modName, modSub)}
              </div>
            )}
          </div>
        ))}
      </div>

      {section("SETTINGS", settings)}
    </aside>
  );
}

function Topbar({
  currentPage,
  setCurrentPage,
  onLogout,
  unreadCount = 0,
  notifications = [],
  onMarkAllRead,
  onViewNotifications,
  user,
}) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : "Jon Snow";
  const displayRole = user?.role?.name || user?.role || "Super Admin";

  const navPills = [
    { label: "Dashboard", page: "Dashboard" },
    { label: "Products", page: "Products" },
    { label: "Orders", page: "Orders" },
    { label: "Customers", page: "Customers" },
    { label: "Attributes", page: "Attribute Master" },
  ];

  return (
    <header className="topbar">
      <nav className="topbar-nav" aria-label="Main Navigation">
        {navPills.map((pill) => (
          <button
            key={pill.page}
            className={`topbar-nav-pill ${currentPage === pill.page ? "active" : ""}`}
            onClick={() => setCurrentPage(pill.page)}
          >
            {pill.label}
          </button>
        ))}
      </nav>

      <div className="topbar-actions">
        <button
          className="topbar-round-btn"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => {
            setNotificationsOpen((open) => !open);
            setAccountOpen(false);
          }}
        >
          <Bell size={17} strokeWidth={1.8} />
          {unreadCount > 0 && <span>{unreadCount}</span>}
        </button>

        {notificationsOpen && (
          <NotificationPopover
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onViewAll={() => {
              setNotificationsOpen(false);
              onViewNotifications();
            }}
          />
        )}

        <button
          className={`profile ${accountOpen ? "open" : ""}`}
          onClick={() => {
            setAccountOpen((open) => !open);
            setNotificationsOpen(false);
          }}
          aria-expanded={accountOpen}
          aria-haspopup="menu"
        >
          <ProfileAvatar user={user} />
          <div className="profile-text">
            <strong>{displayName}</strong>
            <small>{displayRole}</small>
          </div>
          <ChevronDown size={14} className="profile-chevron" />
        </button>

        {accountOpen && (
          <div className="account-menu" role="menu">
            <button role="menuitem" onClick={() => setAccountOpen(false)}>
              <Users size={15} />
              <span>
                <strong>My Profile</strong>
                <small>View your profile</small>
              </span>
            </button>
            <button
              role="menuitem"
              onClick={() => {
                setCurrentPage("Settings");
                setAccountOpen(false);
              }}
            >
              <Settings size={15} />
              <span>
                <strong>Account Settings</strong>
                <small>Manage your account</small>
              </span>
            </button>
            <div className="account-menu-divider" />
            <button className="logout-item" role="menuitem" onClick={onLogout}>
              <XCircle size={15} />
              <span>
                <strong>Logout</strong>
                <small>End your current session</small>
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function KpiCard({ icon: Icon, title, value, change, down, delay = 0 }) {
  return (
    <div className="kpi card" style={{ animationDelay: `${delay}ms` }}>
      <div className="kpi-head">
        <span>{title}</span>
        <div className="kpi-icon-circle">
          <Icon size={16} strokeWidth={1.8} />
        </div>
      </div>

      <div className="kpi-value-wrap">
        <strong>
          <AnimatedNumber value={value} delay={delay} />
        </strong>
      </div>

      <div className="kpi-trend">
        <span className={down ? "trend-badge negative" : "trend-badge positive"}>
          <span className="trend-arrow">{down ? "▼" : "▲"}</span>
          {change}
        </span>
        <span className="trend-label">vs Last Week</span>
      </div>
    </div>
  );
}

function DateFilterDropdown({ selected = "Last 7 days", onSelect, onCustomClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const options = [
    { label: "Last 7 days", icon: Calendar },
    { label: "Last 30 days", icon: Calendar },
    { label: "Last 90 days", icon: Calendar },
    { label: "This year", icon: BarChart2 },
  ];

  const isCustom = !options.some((opt) => opt.label === selected);

  return (
    <div className="date-filter-dropdown-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className={`select-pill-bordered ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <Calendar size={14} className="pill-cal-icon" />
        <span>{selected}</span>
        <ChevronDown size={14} className={`pill-chevron ${open ? "rotate" : ""}`} />
      </button>

      {open && (
        <div className="date-filter-popover" role="menu">
          <div className="date-filter-list">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selected === opt.label;
              return (
                <button
                  type="button"
                  key={opt.label}
                  role="menuitem"
                  className={`date-filter-option ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    onSelect(opt.label);
                    setOpen(false);
                  }}
                >
                  <div className="date-filter-opt-left">
                    <Icon size={16} className="date-filter-opt-icon" />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && <Check size={16} className="date-filter-check" />}
                </button>
              );
            })}

            <div className="date-filter-divider" />

            <button
              type="button"
              role="menuitem"
              className={`date-filter-option ${isCustom ? "active" : ""}`}
              onClick={() => {
                setOpen(false);
                onCustomClick?.();
              }}
            >
              <div className="date-filter-opt-left">
                <Calendar size={16} className="date-filter-opt-icon" />
                <span>Custom date range</span>
              </div>
              {isCustom ? (
                <Check size={16} className="date-filter-check" />
              ) : (
                <ChevronRight size={15} className="date-filter-chevron-right" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfitChart({ onOpenCustomDate }) {
  const [activeIdx, setActiveIdx] = useState(1); // Default to Monday
  const [filterRange, setFilterRange] = useState("Last 7 days");
  const activeItem = salesData[activeIdx] || salesData[1];

  return (
    <div className="card profit-card">
      <div className="panel-head">
        <div className="profit-head-left">
          <h2>Total Profit</h2>
          <div className="profit-value-row">
            <span className="profit-num">
              <AnimatedNumber value="$230,760" delay={200} />
            </span>
            <span className="profit-pill-badge">
              +8.4% <ArrowUpRight size={13} strokeWidth={2.4} />
            </span>
          </div>
        </div>
        <DateFilterDropdown
          selected={filterRange}
          onSelect={(val) => setFilterRange(val)}
          onCustomClick={() => onOpenCustomDate?.((val) => setFilterRange(val))}
        />
      </div>

      <div className="profit-legend">
        <span>
          <i className="profit-dot dot-sales" />
          Total Sales
        </span>
        <span>
          <i className="profit-dot dot-rev" />
          Total Revenue
        </span>
      </div>

      <div className="profit-chart-container">
        {/* SVG Pattern Definition for diagonal hatched bars */}
        <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
          <defs>
            <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45 0 0)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#d5dbe9" strokeWidth="2" />
            </pattern>
          </defs>
        </svg>

        {/* Dynamic Highlighted Active Tooltip centered directly on the hovered bar */}
        <div 
          className="mon-active-tooltip interactive-chart-tooltip" 
          style={{ left: activeItem.leftPct }}
        >
          <span className="mon-tooltip-date">{activeItem.date}</span>
          <div className="mon-tooltip-line">
            <i className="legend-dot-sm sales-dot-sm" /> {activeItem.sales}
          </div>
          <div className="mon-tooltip-line">
            <i className="legend-dot-sm rev-dot-sm" /> <strong>{activeItem.revValue}</strong>
          </div>
          <div className="tooltip-stem-line" />
          <div className="tooltip-apex-pin" />
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={175}>
            <BarChart 
              data={salesData} 
              margin={{ top: 12, right: 8, left: -24, bottom: 0 }}
              onMouseMove={(state) => {
                if (state && typeof state.activeTooltipIndex === "number") {
                  setActiveIdx(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setActiveIdx(1)}
            >
              <CartesianGrid vertical={false} stroke="#edf0f7" strokeDasharray="3 3" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11, fontWeight: 500 }} dy={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(v) => `${v}K`} />
              <Bar 
                dataKey="revenue" 
                radius={[5, 5, 0, 0]} 
                barSize={26}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {salesData.map((entry, idx) => (
                  <Cell 
                    key={`rev-cell-${idx}`} 
                    fill={idx === activeIdx ? "#5850ec" : "url(#diagonalHatch)"}
                    className="profit-bar-cell"
                    style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
                    onMouseEnter={() => setActiveIdx(idx)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SuccessRate({ onOpenCustomDate }) {
  const [filterRange, setFilterRange] = useState("Last 7 days");
  const totalTicks = 22;
  const activeTicks = 16;

  return (
    <div className="card success-card">
      <div className="panel-head">
        <h2>Success Rate</h2>
        <DateFilterDropdown
          selected={filterRange}
          onSelect={(val) => setFilterRange(val)}
          onCustomClick={() => onOpenCustomDate?.((val) => setFilterRange(val))}
        />
      </div>

      <div className="gauge-section">
        <div className="gauge-arc-track">
          {Array.from({ length: totalTicks }).map((_, i) => {
            const angle = -85 + (i * 170) / (totalTicks - 1);
            const isOn = i < activeTicks;
            return (
              <i
                key={i}
                className={`arc-tick ${isOn ? "on" : ""}`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  "--tick-angle": `${angle}deg`,
                  "--tick-index": i,
                }}
              />
            );
          })}
          <div className="gauge-badge-pin">
            <span className="badge-dot" /> 78.6%
          </div>
        </div>

        <div className="gauge-center-stat">
          <strong>
            <AnimatedNumber value="78.6%" delay={250} />
          </strong>
          <span>Sales Growth</span>
        </div>
      </div>

      <div className="success-mini-row">
        <div className="success-mini-box">
          <div className="mini-box-top">
            <div className="mini-circle-icon"><ArrowUpRight size={13} strokeWidth={2.2} /></div>
            <span>Sales Number</span>
          </div>
          <div className="mini-box-bottom">
            <strong><AnimatedNumber value="2,550" delay={350} /></strong>
            <span className="mini-pill-badge green">+6.4% <ArrowUpRight size={10} strokeWidth={2.5} /></span>
          </div>
        </div>

        <div className="success-mini-box">
          <div className="mini-box-top">
            <div className="mini-circle-icon"><DollarSign size={13} strokeWidth={2.2} /></div>
            <span>Total Revenue</span>
          </div>
          <div className="mini-box-bottom">
            <strong><AnimatedNumber value="$68,760" delay={450} /></strong>
            <span className="mini-pill-badge orange">+4.4% <ArrowUpRight size={10} strokeWidth={2.5} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="card orders-card">
      <div className="panel-head orders-panel-head">
        <div>
          <h2>Recent Orders</h2>
          <p>Track the latest customer orders</p>
        </div>
        <div className="orders-actions">
          <div className="orders-search-pill">
            <Search size={14} />
            <input type="text" placeholder="Search" />
          </div>
          <button className="select-pill">
            Status <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="orders-styled-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((o) => (
              <tr key={o.id}>
                <td className="order-id">{o.id}</td>
                <td className="product-col">
                  <img src={o.img} alt={o.name} className="product-table-thumb" />
                  <div className="product-meta">
                    <strong>{o.name}</strong>
                    {o.extra && <small>{o.extra}</small>}
                  </div>
                </td>
                <td className="customer-col">{o.customer}</td>
                <td className="date-col">{o.date}</td>
                <td className="amount-col">{o.amount}</td>
                <td className="status-col">
                  <span className={`status-pill ${o.statusType}`}>
                    {o.status} <ChevronDown size={12} />
                  </span>
                </td>
                <td className="action-col">
                  <button className="eye-action-btn" title="View details">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SalesOverview({ onOpenCustomDate }) {
  const [filterRange, setFilterRange] = useState("Last 7 days");
  const greenBars = 24;
  const orangeBars = 16;
  const redBars = 10;
  const [activeCategory, setActiveCategory] = useState(null); // "green" | "orange" | "red" | null

  return (
    <div className="card sales-card">
      <div className="panel-head">
        <h2>Sales Overview</h2>
        <DateFilterDropdown
          selected={filterRange}
          onSelect={(val) => setFilterRange(val)}
          onCustomClick={() => onOpenCustomDate?.((val) => setFilterRange(val))}
        />
      </div>

      <div className="sales-stat-columns">
        <div 
          className={`sales-stat-col ${activeCategory === "green" ? "col-highlighted" : ""} ${activeCategory && activeCategory !== "green" ? "col-dimmed" : ""}`}
          onMouseEnter={() => setActiveCategory("green")}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <span className="sales-stat-title"><i className="color-dot green" /> Successful Sales</span>
          <strong className="sales-stat-number"><AnimatedNumber value="47.05%" delay={200} /></strong>
        </div>
        <div 
          className={`sales-stat-col ${activeCategory === "orange" ? "col-highlighted" : ""} ${activeCategory && activeCategory !== "orange" ? "col-dimmed" : ""}`}
          onMouseEnter={() => setActiveCategory("orange")}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <span className="sales-stat-title"><i className="color-dot orange" /> Pending</span>
          <strong className="sales-stat-number"><AnimatedNumber value="32.48%" delay={300} /></strong>
        </div>
        <div 
          className={`sales-stat-col ${activeCategory === "red" ? "col-highlighted" : ""} ${activeCategory && activeCategory !== "red" ? "col-dimmed" : ""}`}
          onMouseEnter={() => setActiveCategory("red")}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <span className="sales-stat-title"><i className="color-dot red" /> Cancelled</span>
          <strong className="sales-stat-number"><AnimatedNumber value="20.47%" delay={400} /></strong>
        </div>
      </div>

      <div 
        className={`matchstick-bar-row ${activeCategory ? `focus-${activeCategory}` : ""}`}
        onMouseLeave={() => setActiveCategory(null)}
      >
        <div 
          className={`matchstick-cluster green ${activeCategory === "green" ? "cluster-active" : ""}`}
          onMouseEnter={() => setActiveCategory("green")}
        >
          {Array.from({ length: greenBars }).map((_, i) => (
            <b key={`g-${i}`} style={{ "--bar-index": i }} />
          ))}
        </div>
        <div 
          className={`matchstick-cluster orange ${activeCategory === "orange" ? "cluster-active" : ""}`}
          onMouseEnter={() => setActiveCategory("orange")}
        >
          {Array.from({ length: orangeBars }).map((_, i) => (
            <b key={`o-${i}`} style={{ "--bar-index": greenBars + i }} />
          ))}
        </div>
        <div 
          className={`matchstick-cluster red ${activeCategory === "red" ? "cluster-active" : ""}`}
          onMouseEnter={() => setActiveCategory("red")}
        >
          {Array.from({ length: redBars }).map((_, i) => (
            <b key={`r-${i}`} style={{ "--bar-index": greenBars + orangeBars + i }} />
          ))}
        </div>
      </div>

      <div className="sales-products-section">
        <div className="sales-products-header">
          <span>Product Name</span>
          <span>Percent</span>
          <span>Earnings</span>
        </div>
        <div className="sales-products-list">
          <div className="sales-product-item">
            <div className="sales-product-info">
              <img src="/tshirt.svg" alt="T-Shirt" className="sales-product-thumb" />
              <span>Black Solid T-Shirt</span>
            </div>
            <span className="sales-product-pct">32%</span>
            <span className="sales-product-earnings">$40,000</span>
          </div>

          <div className="sales-product-item">
            <div className="sales-product-info">
              <img src="/jogger.svg" alt="Jogger" className="sales-product-thumb" />
              <span>Men's Jogger (Black)</span>
            </div>
            <span className="sales-product-pct">30%</span>
            <span className="sales-product-earnings">$26,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CmsOverview() {
  return (
    <div className="card cms-card">
      <div className="panel-head">
        <div>
          <h2>CMS Overview</h2>
          <p>Manage your store content, pages and media library</p>
        </div>
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
              <Icon size={20} />
              <span>{title}</span>
              <strong>
                <AnimatedNumber value={value} delay={150} />
              </strong>
            </div>
          ))}

          <div className="cms-pages">
            <h3>Top Performing Pages</h3>
            {[
              ["Home Page", "12,586", "8,560"],
              ["Shop Page", "8,425", "6,241"],
              ["Product Page", "6,254", "4,180"],
              ["About Us", "3,245", "2,154"],
              ["Contact Us", "1,254", "842"],
            ].map((r) => (
              <div className="page-row" key={r[0]}>
                <span>{r[0]}</span>
                <span>{r[1]} views</span>
                <span>{r[2]} unique</span>
                <em>Published</em>
              </div>
            ))}
          </div>

          <button className="manage-btn">
            Manage Pages <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="recent-posts">
          <div className="subhead">
            <h3>Recent Blog Posts</h3>
            <a>View All</a>
          </div>
          {posts.map(([title, date, initials]) => (
            <div className="post" key={title}>
              <div className="post-image">{initials}</div>
              <div>
                <strong>{title}</strong>
                <small>{date}</small>
              </div>
            </div>
          ))}
          <button className="manage-btn">
            Manage Blog Posts <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityPanel() {
  const items = [
    ["Ayush published a new page “Winter Collection”", "2 mins ago", FileText, true],
    ["Admin updated product “Black Solid T-Shirt”", "15 mins ago", Package, false],
    ["Sara commented on blog post “Top 10 Winter Fashion Trends”", "1 hour ago", MessageSquare, false],
    ["John Doe placed a new order #11852", "2 hours ago", ShoppingBag, false],
    ["Media file “banner-winter.jpg” uploaded", "3 hours ago", Upload, false],
    ["Menu “Main Menu” updated", "5 hours ago", Menu, false],
  ];

  return (
    <div className="card activity-card">
      <div className="subhead">
        <h3>Recent Activity</h3>
        <a>View All</a>
      </div>
      {items.map(([text, time, Icon, isNew]) => (
        <div className="activity-item" key={text}>
          <div className="activity-icon" title={isNew ? "Live event" : undefined}>
            <Icon size={13} />
          </div>
          <span>{text}</span>
          <time>{time}</time>
        </div>
      ))}
    </div>
  );
}

function DashboardPage({
  user,
  dateRange,
  onOpenDate,
  onOpenExport,
}) {
  return null;
}

export default function App() {
  const [auth, setAuth] = useState(getStoredAuth);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [productView, setProductView] = useState("list");
  const [exportReport, setExportReport] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerTarget, setDatePickerTarget] = useState(null);
  const [dateRange, setDateRange] = useState("12 Sept - 20 Sept");
  const [notifications, setNotifications] = useState(initialNotifications);

  const openDatePickerForTarget = (callback = null) => {
    setDatePickerTarget(() => callback);
    setDatePickerOpen(true);
  };

  const authenticated = Boolean(auth?.token && auth?.user);

  useEffect(() => {
    if (auth?.token && auth.token !== "demo_admin_token") {
      getMe(auth.token)
        .then((freshUser) => {
          setAuth((prev) => {
            if (!prev?.token) return prev;
            setStoredAuth(prev.token, freshUser);
            return { token: prev.token, user: freshUser };
          });
        })
        .catch((err) => {
          console.warn("Session expired or invalid:", err.message);
          clearStoredAuth();
          setAuth({ token: null, user: null });
        });
    }
  }, []);

  const handleLogin = (user, token) => {
    setStoredAuth(token, user);
    setAuth({ token, user });
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuth({ token: null, user: null });
    setCurrentPage("Dashboard");
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === "Products") setProductView("list");
  };

  if (!authenticated) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} setCurrentPage={navigateTo} />
      <main className="main">
        <Topbar
          currentPage={currentPage}
          setCurrentPage={navigateTo}
          onLogout={handleLogout}
          notifications={notifications}
          onMarkAllRead={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))}
          onViewNotifications={() => navigateTo("Notifications")}
          user={auth.user}
        />

        {currentPage === "Products" ? (
          productView === "add" ? (
            <AddProductPage onBack={() => setProductView("list")} />
          ) : (
            <ProductPage
              onAddProduct={() => setProductView("add")}
              onExport={() => setExportReport("Products")}
              onDateClick={() => setDatePickerOpen(true)}
              dateRange={dateRange}
            />
          )
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
          <CustomersPage
            onExport={() => setExportReport("Customers")}
            onDateClick={() => openDatePickerForTarget(null)}
            dateRange={dateRange}
          />
        ) : currentPage === "Orders" ? (
          <OrdersPage
            onExport={() => setExportReport("Orders")}
            onDateClick={() => openDatePickerForTarget(null)}
            onOpenCustomDate={openDatePickerForTarget}
            dateRange={dateRange}
          />
        ) : currentPage === "Notifications" ? (
          <NotificationsPage
            notifications={notifications}
            onMarkAllRead={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))}
          />
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
            <div className="welcome-row fade-in-section stagger-1">
              <div>
                <h1>
                  Welcome, {auth.user?.firstName ? `${auth.user.firstName} ${auth.user.lastName || ""}`.trim() : "Jon Snow"} <span>👋</span>
                </h1>
                <p>Manage products, orders, customers, and performance in one place.</p>
              </div>
              <div className="header-actions">
                <button className="date-btn" onClick={() => openDatePickerForTarget(null)}>
                  <CalendarDays size={15} />
                  {dateRange} <ChevronDown size={14} />
                </button>
                <button className="export-btn" onClick={() => setExportReport("Dashboard")}>
                  <Upload size={15} />
                  Export Report
                </button>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="kpi-grid fade-in-section stagger-2">
                <KpiCard icon={ArrowUpRight} title="Total Sales" value="12,485" change="+3.1%" delay={0} />
                <KpiCard icon={DollarSign} title="Total Revenue" value="$68,760" change="+2.4%" delay={60} />
                <KpiCard icon={User} title="Active Customers" value="4,220" change="+2.4%" delay={120} />
                <KpiCard icon={Receipt} title="Refund Request" value="250" change="-0.6%" down delay={180} />
              </div>

              <div className="fade-in-section stagger-3">
                <ProfitChart onOpenCustomDate={openDatePickerForTarget} />
              </div>

              <div className="fade-in-section stagger-4">
                <SuccessRate onOpenCustomDate={openDatePickerForTarget} />
              </div>

              <div className="fade-in-section stagger-5" style={{ gridColumn: "1 / span 2" }}>
                <OrdersTable />
              </div>

              <div className="fade-in-section stagger-6">
                <SalesOverview onOpenCustomDate={openDatePickerForTarget} />
              </div>
            </div>
          </section>
        )}
      </main>

      {exportReport && (
        <ExportModal
          reportName={exportReport}
          onClose={() => setExportReport(null)}
          onDateClick={() => openDatePickerForTarget(null)}
          dateRange={dateRange}
        />
      )}

      {datePickerOpen && (
        <DateRangeModal
          onClose={() => {
            setDatePickerOpen(false);
            setDatePickerTarget(null);
          }}
          onApply={(range) => {
            if (typeof datePickerTarget === "function") {
              datePickerTarget(range);
            } else {
              setDateRange(range);
            }
          }}
        />
      )}
    </div>
  );
}
