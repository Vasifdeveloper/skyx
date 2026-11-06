"use client";

import { useEffect } from "react";
import "./motion.css";

type NavigationTransition = {
  skipTransition: () => void;
  finished: Promise<void>;
};

/** Progressive enhancement: server-rendered content is always fully visible. */
export default function MotionExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const transitions = new Set<NavigationTransition>();
    const seen = new WeakSet<Element>();
    const allowed = () =>
      !media.matches && root.dataset.motion !== "off" && !document.hidden;

    const stop = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      transitions.forEach((transition) => transition.skipTransition());
      transitions.clear();
    };
    const sync = () => {
      root.dataset.motionVisibility = document.hidden ? "hidden" : "visible";
      if (!allowed()) stop();
    };
    const navigation = (event: Event) => {
      const transition = (event as Event & {
        viewTransition?: NavigationTransition;
      }).viewTransition;
      if (!transition) return;
      if (!allowed()) {
        transition.skipTransition();
        return;
      }
      transitions.add(transition);
      const clear = () => transitions.delete(transition);
      void transition.finished.then(clear, clear);
    };

    // Only animate text and service rows. Interactive demos and the scene own
    // their own transforms; CTAs are immediately available without a delay.
    const targets = document.querySelectorAll<HTMLElement>(
      "main h1, main h2, main .section-code, main .service-row, .hero-kicker, .hero-intro",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          observer.unobserve(entry.target);
          if (!allowed()) return;
          const element = entry.target as HTMLElement;
          const hero = Boolean(element.closest(".hero-copy"));
          const animation = element.animate(
            [
              { opacity: 0.2, transform: "translateY(20px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: hero ? 700 : 560,
              delay: Math.min(stagger++ * 55, 165),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              // No retained styles: cancel, failure and completion reveal the
              // same readable server-rendered content, without layout changes.
              fill: "backwards",
            },
          );
          animations.add(animation);
          const clear = () => animations.delete(animation);
          void animation.finished.then(clear, clear);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    targets.forEach((element) => observer.observe(element));
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("skyx-motion", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pageswap", navigation);
    window.addEventListener("pagereveal", navigation);
    return () => {
      observer.disconnect();
      stop();
      media.removeEventListener("change", sync);
      window.removeEventListener("skyx-motion", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pageswap", navigation);
      window.removeEventListener("pagereveal", navigation);
      delete root.dataset.motionVisibility;
    };
  }, []);

  return null;
}
