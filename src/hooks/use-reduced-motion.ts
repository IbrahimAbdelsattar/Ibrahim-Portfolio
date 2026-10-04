import { useMediaQuery } from "./use-media-query";
export const useReducedMotionPreference = () => useMediaQuery("(prefers-reduced-motion: reduce)", true);
