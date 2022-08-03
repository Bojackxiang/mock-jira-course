import { useRef, useEffect } from "react";

// 关注组建的挂在状态，如果组建还在，那就 return true, 反之，false
export const useMountedHook = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
