import React, { useEffect, useState, useRef } from "react";

// Check if user prefers reduced motion
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener?.("change", listener);
    return () => mediaQuery.removeEventListener?.("change", listener);
  }, []);

  return prefersReducedMotion;
}

// Ease out quart easing function
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

// Animate a number counting up from 0 to value
export function AnimatedNumber({ value, duration = 1000, delay = 0 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(() => prefersReducedMotion ? value : "0");
  const rafRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // Parse value for prefix (e.g. "$"), suffix (e.g. "%"), commas, and decimals
    const strVal = String(value);
    const prefixMatch = strVal.match(/^[^\d.-]+/);
    const prefix = prefixMatch ? prefixMatch[0] : "";
    const suffixMatch = strVal.match(/[^\d.-]+$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";

    const cleanNumStr = strVal.replace(/^[^\d.-]+/, "").replace(/[^\d.-]+$/, "").replace(/,/g, "");
    const targetNum = parseFloat(cleanNumStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = strVal.includes(",");
    const decimalMatch = cleanNumStr.match(/\.(\d+)/);
    const decimalPlaces = decimalMatch ? decimalMatch[1].length : 0;

    let startTimestamp = null;
    let timerId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentNum = targetNum * easedProgress;

      let formattedNum = currentNum.toFixed(decimalPlaces);
      if (hasComma) {
        const parts = formattedNum.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedNum = parts.join(".");
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(strVal);
      }
    };

    timerId = setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      if (timerId) clearTimeout(timerId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, delay, prefersReducedMotion]);

  return <>{displayValue}</>;
}

// Subtle miniature SVG sparkline for KPI cards
export function Sparkline({ trend = "up", color, width = 64, height = 24 }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isUp = trend === "up";
  const strokeColor = color || (isUp ? "#10b981" : "#f43f5e");
  const gradientId = `sparkline-grad-${trend}-${Math.random().toString(36).substr(2, 6)}`;

  // Realistic sample points for an upward or downward mini-trend
  const points = isUp
    ? [
        [0, 18],
        [10, 16],
        [22, 19],
        [34, 11],
        [46, 13],
        [54, 7],
        [64, 4],
      ]
    : [
        [0, 5],
        [10, 8],
        [22, 6],
        [34, 14],
        [46, 12],
        [54, 18],
        [64, 21],
      ];

  const pathD = points.reduce((acc, [x, y], i) => `${acc} ${i === 0 ? "M" : "L"} ${x} ${y}`, "");
  const fillD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="kpi-sparkline" aria-hidden="true" style={{ width, height, overflow: "hidden" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill={`url(#${gradientId})`} />
        <path
          d={pathD}
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={prefersReducedMotion ? "" : "sparkline-draw"}
        />
      </svg>
    </div>
  );
}
