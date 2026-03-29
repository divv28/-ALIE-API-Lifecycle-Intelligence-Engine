import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  target: number;
  duration?: number;
}

export function CountUp({ target, duration = 1200 }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    setDisplay(0);
    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{display}</>;
}
