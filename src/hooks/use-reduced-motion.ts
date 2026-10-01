import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const getSnapshot = () => window.matchMedia(query).matches;
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/** Reacts to preference changes while the app is running, as well as on load. */
export const useReducedMotionPreference = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => true);
