"use client";
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import "./scene.css";
const Orbit = lazy(() => import("./OrbitCanvas"));
const stops = [
  [74, 54, 1, 1],
  [21, 52, 0.64, 0.37],
  [82, 54, 0.5, 0.25],
  [78, 58, 0.58, 0.29],
  [50, 78, 0.82, 0.28],
  [50, 94, 1.05, 0],
];
const keys = [
  "hero",
  "services",
  "automation",
  "scenarios",
  "process",
  "contact",
];
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function Scene() {
  const host = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false),
    [active, setActive] = useState(true),
    [ready, setReady] = useState(false);
  const failed = useRef(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback((reason = "scene-error") => {
    failed.current = true;
    if (host.current) host.current.dataset.fallback = reason;
    setCapable(false);
    setReady(false);
  }, []);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const media = matchMedia("(max-width:680px)"),
      reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const blocks = keys.map((id) => document.getElementById(id));
    let anchors: number[] = [],
      frame = 0,
      idle = 0,
      enabled = false,
      priorVisible = true,
      dead = false;
    const data = (
      navigator as Navigator & { connection?: { saveData: boolean } }
    ).connection?.saveData;
    const place = () => {
      frame = 0;
      const y = scrollY;
      let i = 0;
      while (i < anchors.length - 2 && y >= anchors[i + 1]) i++;
      const d = Math.max(1, anchors[i + 1] - anchors[i]);
      let f = Math.max(0, Math.min(1, (y - anchors[i]) / d));
      f = f * f * (3 - 2 * f);
      const a = stops[i],
        b = stops[i + 1];
      const v = a.map((n, j) => n + (b[j] - n) * f);
      el.dataset.pose = String(i + f);
      el.style.setProperty(
        "--poster-turn",
        Math.sin((i + f) * 0.9) * 13 + "deg",
      );
      if (!media.matches && enabled) {
        el.style.setProperty("--ox", v[0] + "vw");
        el.style.setProperty("--oy", v[1] + "vh");
        el.style.setProperty("--os", String(v[2]));
        el.style.setProperty("--oa", String(v[3]));
      } else {
        for (const k of ["--ox", "--oy", "--os", "--oa"])
          el.style.removeProperty(k);
      }
      const visible = y < (anchors.at(-1) ?? 0) - 2;
      if (priorVisible !== visible) {
        priorVisible = visible;
        setActive(visible);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    const measure = () => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - innerHeight,
      );
      anchors = blocks.map((s, i) =>
        i === 0
          ? 0
          : Math.min(
              max,
              Math.max(
                0,
                ((s?.querySelector("h2") || s)?.getBoundingClientRect().top ??
                  0) +
                  scrollY -
                  innerHeight * 0.35,
              ),
            ),
      );
      place();
    };
    const sync = () => {
      enabled =
        !reduce.matches &&
        document.documentElement.dataset.motion !== "off" &&
        !data &&
        !media.matches;
      el.classList.toggle("orbit-still", !enabled);
      el.parentElement?.classList.toggle("orbit-travel", enabled);
      cancelAnimationFrame(idle);
      if (!enabled) {
        setCapable(false);
        setReady(false);
      } else if (!failed.current) {
        idle = requestAnimationFrame(() => setCapable(true));
      }
      measure();
    };
    const hero = document.getElementById("hero");
    let heroVisible = false;
    const updatePosterMotion = () => {
      el.dataset.heroVisible = String(heroVisible && !document.hidden);
    };
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updatePosterMotion();
    });
    if (hero) heroObserver.observe(hero);
    document.addEventListener("visibilitychange", updatePosterMotion);
    const observer = new ResizeObserver(measure);
    for (const block of blocks) if (block) observer.observe(block);
    sync();
    document.fonts.ready.then(() => {
      if (!dead) measure();
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("skyx-motion", sync);
    window.addEventListener("hashchange", schedule);
    media.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(idle);
      observer.disconnect();
      heroObserver.disconnect();
      document.removeEventListener("visibilitychange", updatePosterMotion);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", sync);
      window.removeEventListener("skyx-motion", sync);
      window.removeEventListener("hashchange", schedule);
      media.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div className="orbit-window">
      <div
        ref={host}
        className={"orbit-stage" + (ready ? " is-ready" : "")}
        aria-hidden="true"
      >
        <img
          className="orbit-poster"
          src="/brand/orbit.svg"
          alt=""
          width="1152"
          height="880"
          fetchPriority="high"
        />
        {capable && (
          <div className="orbit-gl">
            <SceneBoundary onError={onFailure}>
              <Suspense fallback={null}>
                <Orbit
                  visible={active}
                  onReady={onReady}
                  onFailure={onFailure}
                />
              </Suspense>
            </SceneBoundary>
          </div>
        )}
      </div>
    </div>
  );
}
