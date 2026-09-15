import React, { useState, useEffect, useRef } from "react";
import { Calendar, BarChart2, Check, ChevronDown, ChevronRight } from "lucide-react";

export default function DateFilterDropdown({
  selected = "Last 7 days",
  onSelect,
  onCustomClick,
}) {
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
                    onSelect?.(opt.label);
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
