import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const presets = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "This Month", "Last Month", "Custom Range"];

function Month({ month, year, start, end, onDayClick, onPrevious, onNext }) {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const numbers = Array.from({ length: offset + totalDays }, (_, index) => index < offset ? null : index - offset + 1);
  const isSelected = (day) => day && ((start?.year === year && start.month === month && start.day === day) || (end?.year === year && end.month === month && end.day === day));
  const isInRange = (day) => { if (!day || !start || !end) return false; const value = new Date(year, month, day); const from = new Date(start.year, start.month, start.day); const to = new Date(end.year, end.month, end.day); return value > from && value < to; };
  return <div className="calendar-month"><div className="calendar-month-title"><button onClick={onPrevious} aria-label="Previous month"><ChevronLeft size={15} /></button><strong>{new Date(year, month).toLocaleString("en-US", { month: "long" })} {year}</strong><button onClick={onNext} aria-label="Next month"><ChevronRight size={15} /></button></div><div className="calendar-weekdays">{days.map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{numbers.map((day, index) => <button className={`${day && isSelected(day) ? "selected" : ""} ${isInRange(day) ? "in-range" : ""}`} key={`${year}-${month}-${index}`} disabled={!day} onClick={() => day && onDayClick({ year, month, day })}>{day}</button>)}</div></div>;
}

export default function DateRangeModal({ onClose, onApply }) {
  const [preset, setPreset] = useState("Last 7 days");
  const [start, setStart] = useState({ year: 2025, month: 8, day: 12 });
  const [end, setEnd] = useState({ year: 2025, month: 8, day: 20 });
  const [leftMonth, setLeftMonth] = useState(8);
  const [leftYear, setLeftYear] = useState(2025);
  const shiftMonth = (amount) => { const next = new Date(leftYear, leftMonth + amount); setLeftMonth(next.getMonth()); setLeftYear(next.getFullYear()); };
  const selectPreset = (item) => { setPreset(item); if (item === "Today") { setStart({ year: 2025, month: 8, day: 2 }); setEnd({ year: 2025, month: 8, day: 2 }); } if (item === "Yesterday") { setStart({ year: 2025, month: 8, day: 1 }); setEnd({ year: 2025, month: 8, day: 1 }); } if (item === "Last 7 days") { setStart({ year: 2025, month: 8, day: 12 }); setEnd({ year: 2025, month: 8, day: 20 }); } if (item === "Last 30 days") { setStart({ year: 2025, month: 7, day: 21 }); setEnd({ year: 2025, month: 8, day: 20 }); } if (item === "This Month") { setStart({ year: 2025, month: 8, day: 1 }); setEnd({ year: 2025, month: 8, day: 30 }); } if (item === "Last Month") { setStart({ year: 2025, month: 7, day: 1 }); setEnd({ year: 2025, month: 7, day: 31 }); } };
  const selectDay = (date) => { setPreset("Custom Range"); if (!start || end) { setStart(date); setEnd(null); } else if (new Date(date.year, date.month, date.day) < new Date(start.year, start.month, start.day)) { setStart(date); setEnd(start); } else setEnd(date); };
  const displayDate = () => { const format = (date) => date ? `${date.day} ${new Date(date.year, date.month).toLocaleString("en-US", { month: "short" })}` : "Select date"; return end && start ? `${format(start)} - ${format(end)}` : format(start); };
  return <div className="date-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="date-modal" role="dialog" aria-modal="true" aria-labelledby="date-title"><div className="date-sidebar">{presets.map((item) => <button className={preset === item ? "active" : ""} key={item} onClick={() => selectPreset(item)}>{item}</button>)}</div><div className="date-calendar-area"><div className="date-modal-title"><h2 id="date-title">Select Date Range</h2><button onClick={onClose} aria-label="Close date picker"><X size={17} /></button></div><div className="calendar-months"><Month month={leftMonth} year={leftYear} start={start} end={end} onDayClick={selectDay} onPrevious={() => shiftMonth(-1)} onNext={() => shiftMonth(1)} /><Month month={(leftMonth + 1) % 12} year={leftMonth === 11 ? leftYear + 1 : leftYear} start={start} end={end} onDayClick={selectDay} onPrevious={() => shiftMonth(-1)} onNext={() => shiftMonth(1)} /></div><div className="date-modal-footer"><strong>{displayDate()}</strong><div><button className="secondary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" onClick={() => { onApply?.(displayDate()); onClose(); }}>Apply</button></div></div></div></section></div>;
}
