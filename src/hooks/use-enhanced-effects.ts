import { useSyncExternalStore } from "react";
import { useMediaQuery } from "./use-media-query";
import { useReducedMotionPreference } from "./use-reduced-motion";

type DeviceNavigator = Navigator & {
  deviceMemory?: number;
  connection?: EventTarget & { saveData?: boolean };
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());
const subscribe = (listener: () => void) => {
  const connection = (navigator as DeviceNavigator).connection;
  if (listeners.size === 0) connection?.addEventListener("change", notify);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) connection?.removeEventListener("change", notify);
  };
};
const hasCapacity = () => {
  const device = navigator as DeviceNavigator;
  return !device.connection?.saveData &&
    !(device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4) &&
    !(device.deviceMemory && device.deviceMemory <= 4);
};

/** Keep short UI transitions everywhere; reserve ambient motion and 3D for capable pointers. */
export const useEnhancedEffects = () => {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useReducedMotionPreference();
  const capacity = useSyncExternalStore(subscribe, hasCapacity, () => false);
  return finePointer && !reducedMotion && capacity;
};
