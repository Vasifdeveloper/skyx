"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/i18n/site";
export function NavigationBehavior() {
  useEffect(() => {
    const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
    const lang = document.querySelector<HTMLDetailsElement>(".lang-switch");
    const summary = menu?.querySelector("summary");
    let previousOverflow = "";
    const lock = () => {
      if (!menu) return;
      if (menu.open) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        lang?.removeAttribute("open");
        menu.querySelector<HTMLElement>("nav a")?.focus();
      } else {
        document.body.style.overflow = previousOverflow;
        summary?.focus();
      }
    };
    const localize = () => {
      const url = new URL(location.href);
      document
        .querySelectorAll<HTMLAnchorElement>("a[data-switch-lang]")
        .forEach((link) => {
          const target = new URL(link.href);
          target.search = "";
          const service = url.searchParams.get("service");
          if (service && [...services, "other"].includes(service))
            target.searchParams.set("service", service);
          target.hash = url.hash;
          link.href = target.href;
        });
    };
    const click = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a[data-switch-lang]")) localize();
      if (lang?.open && !lang.contains(el)) lang.open = false;
      if (
        menu?.open &&
        (el.closest("a, [data-menu-close]") || !menu.contains(el))
      )
        menu.open = false;
    };
    const keys = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menu?.open) menu.open = false;
        if (lang?.open) {
          lang.open = false;
          lang.querySelector("summary")?.focus();
        }
      }
      if (e.key === "Tab" && menu?.open) {
        const all = Array.from(
          menu.querySelectorAll<HTMLElement>("summary,a,button"),
        );
        const first = all[0],
          last = all.at(-1);
        if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault();
          first?.focus();
        } else if (document.activeElement === first && e.shiftKey) {
          e.preventDefault();
          last?.focus();
        }
      }
    };
    const size = () => {
      if (menu?.open && getComputedStyle(menu).display === "none")
        menu.open = false;
    };
    localize();
    menu?.addEventListener("toggle", lock);
    document.addEventListener("click", click, true);
    document.addEventListener("keydown", keys);
    window.addEventListener("hashchange", localize);
    window.addEventListener("resize", size);
    return () => {
      menu?.removeEventListener("toggle", lock);
      document.removeEventListener("click", click, true);
      document.removeEventListener("keydown", keys);
      window.removeEventListener("hashchange", localize);
      window.removeEventListener("resize", size);
      if (menu?.open) document.body.style.overflow = previousOverflow;
    };
  }, []);
  return null;
}
export function MotionControl({
  label,
  onLabel,
  offLabel,
}: {
  label: string;
  onLabel: string;
  offLabel: string;
}) {
  const [enabled, setEnabled] = useState(true);
  const pref = useRef("on");
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      pref.current = localStorage.getItem("skyx-motion") || "on";
    } catch {}
    const sync = () => {
      const on = !media.matches && pref.current !== "off";
      document.documentElement.dataset.motion = on ? "on" : "off";
      setEnabled(on);
      window.dispatchEvent(new Event("skyx-motion"));
    };
    const id = requestAnimationFrame(sync);
    media.addEventListener("change", sync);
    window.addEventListener("skyx-preference", sync);
    return () => {
      cancelAnimationFrame(id);
      media.removeEventListener("change", sync);
      window.removeEventListener("skyx-preference", sync);
    };
  }, []);
  return (
    <button
      id="motion-preference"
      className="motion-switch"
      type="button"
      aria-pressed={enabled}
      onClick={() => {
        pref.current = enabled ? "off" : "on";
        try {
          localStorage.setItem("skyx-motion", pref.current);
        } catch {}
        window.dispatchEvent(new Event("skyx-preference"));
      }}
    >
      {label} <b>{enabled ? onLabel : offLabel}</b>
    </button>
  );
}
