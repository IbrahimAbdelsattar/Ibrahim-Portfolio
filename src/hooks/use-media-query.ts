import { useSyncExternalStore } from "react";

/** Share one native media listener across every card using the same query. */
const stores = new Map<string, { media: MediaQueryList; listeners: Set<() => void>; notify: () => void }>();
const getStore = (query: string) => {
  let store = stores.get(query);
  if (!store) {
    const listeners = new Set<() => void>();
    store = { media: window.matchMedia(query), listeners, notify: () => listeners.forEach(fn => fn()) };
    stores.set(query, store);
  }
  return store;
};
const subscriptions = new Map<string, (listener: () => void) => () => void>();
const subscribeFor = (query: string) => {
  let subscribe = subscriptions.get(query);
  if (!subscribe) {
    subscribe = listener => {
      const store = getStore(query);
      if (store.listeners.size === 0) store.media.addEventListener("change", store.notify);
      store.listeners.add(listener);
      return () => { store.listeners.delete(listener); if (store.listeners.size === 0) store.media.removeEventListener("change", store.notify); };
    };
    subscriptions.set(query, subscribe);
  }
  return subscribe;
};
export const useMediaQuery = (query: string, serverValue = false) =>
  useSyncExternalStore(subscribeFor(query), () => getStore(query).media.matches, () => serverValue);
