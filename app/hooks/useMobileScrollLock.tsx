import { useEffect } from "react";

export const useMobileScrollLock = (lock: boolean) => {
  useEffect(() => {
    const body = document.body;
    if (!body) return;
    if (lock) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [lock]);
};
