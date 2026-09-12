import { useId, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface AnimatedTab {
  /** Unique tab value. */
  value: string;
  /** Label shown in the tab bar. */
  label: string;
}

interface AnimatedTabsProps {
  tabs: readonly AnimatedTab[] | AnimatedTab[];
  value: string;
  onChange: (value: string) => void;
  /** Shared layoutId namespace so multiple tab bars can coexist. */
  id?: string;
  ariaLabel?: string;
}

/**
 * Professional animated tab bar: sliding active pill (layoutId),
 * horizontal scroll on mobile, full keyboard + screen-reader support.
 */
const AnimatedTabs = ({ tabs, value, onChange, id = "tabs", ariaLabel = "Tabs" }: AnimatedTabsProps) => {
  const reduceMotion = useReducedMotion();
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const listRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.value === value),
  );

  const focusTab = (index: number) => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-tab-index="${index}"]`);
    el?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    if (e.key === "Home") {
      onChange(tabs[0].value);
      focusTab(0);
    } else if (e.key === "End") {
      onChange(tabs[tabs.length - 1].value);
      focusTab(tabs.length - 1);
    } else {
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (activeIndex + dir + tabs.length) % tabs.length;
      onChange(tabs[next].value);
      focusTab(next);
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth-touch py-1.5 px-1.5 -mx-1 rounded-2xl glass-card"
    >
      {tabs.map((tab, index) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            data-tab-index={index}
            onClick={() => onChange(tab.value)}
            className={`relative shrink-0 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap cursor-pointer ${
              isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={`${id}-${baseId}-pill`}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 rounded-xl bg-primary shadow-lg shadow-primary/25"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

interface AnimatedTabPanelProps {
  /** Must match the active tab value to render. */
  tabValue: string;
  activeValue: string;
  id?: string;
  index?: number;
  children: React.ReactNode;
}

/** Content panel with a subtle fade+rise transition on tab switch. */
export const AnimatedTabPanel = ({ tabValue, activeValue, children }: AnimatedTabPanelProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      {tabValue === activeValue && (
        <motion.div
          key={tabValue}
          role="tabpanel"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTabs;
