import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal({ stagger = false, y = 40, duration = 0.8 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger && el.children.length > 0 ? el.children : el;

    gsap.set(targets, { opacity: 0, y });

    const anim = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration,
      ease: "power2.out",
      stagger: stagger ? 0.12 : 0,
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => anim.play(),
    });

    return () => {
      trigger.kill();
      anim.kill();
    };
  }, [stagger, y, duration]);

  return ref;
}
