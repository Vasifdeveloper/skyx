"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { WorkflowCopy } from "./copy";
import { Symbol, stepIcons } from "./Symbols";

type Status = "idle" | "running" | "paused" | "complete";
const STEP_MS = 1400;

export default function Workflow({ copy }: { copy: WorkflowCopy }) {
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState(0);
  const [run, setRun] = useState({ offset: 0, started: 0 });
  const [still, setStill] = useState({ manual: false, system: false });
  const [elapsed, setElapsed] = useState(0);
  const duration = copy.steps.length * STEP_MS;
  const step = copy.steps[selected];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      setStill({
        manual: document.documentElement.dataset.motion === "off",
        system: media.matches,
      });
    media.addEventListener("change", sync);
    window.addEventListener("skyx-motion", sync);
    sync();
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("skyx-motion", sync);
    };
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    let timer = 0;
    const now = () =>
      Math.min(duration, run.offset + performance.now() - run.started);
    const tick = () => {
      const ms = now();
      if (ms >= duration) {
        setElapsed(duration);
        setSelected(copy.steps.length - 1);
        setStatus("complete");
        return;
      }
      const index = Math.floor(ms / STEP_MS);
      setSelected(index);
      timer = window.setTimeout(tick, (index + 1) * STEP_MS - ms);
    };
    const onVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(timer);
        setElapsed(now());
        setStatus("paused");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (document.hidden) onVisibility();
    else tick();
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [status, run, duration, copy.steps.length]);

  function start(offset: number) {
    setElapsed(offset);
    setSelected(Math.min(Math.floor(offset / STEP_MS), copy.steps.length - 1));
    setRun({ offset, started: performance.now() });
    setStatus("running");
  }
  function pause() {
    setElapsed(
      Math.min(duration, run.offset + performance.now() - run.started),
    );
    setStatus("paused");
  }
  function inspect(index: number) {
    setElapsed(index * STEP_MS);
    setSelected(index);
    setStatus("paused");
  }

  const pulseStyle = {
    "--pulse-delay": "-" + run.offset + "ms",
    "--pulse-position":
      Math.min(100, (elapsed / (duration - STEP_MS)) * 100) + "%",
    "--pulse-duration": duration + "ms",
  } as CSSProperties;

  return (
    <>
      <div className="dm-workflow dm-js-workflow" data-state={status}>
        <ol
          className="dm-nodes"
          aria-label={copy.steps.map((item) => item.title).join(" → ")}
        >
          {copy.steps.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                className="dm-node"
                aria-pressed={selected === index}
                onClick={() => inspect(index)}
              >
                <span className="dm-node-icon">
                  <Symbol name={stepIcons[index]} />
                </span>
                <span className="dm-node-label">
                  <small aria-hidden="true">0{index + 1}</small>
                  {item.title}
                </span>
              </button>
            </li>
          ))}
          <li className="dm-connection" aria-hidden="true" role="presentation">
            <svg
              className="dm-wire-horizontal"
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              focusable="false"
            >
              <path d="M0 1H1000" vectorEffect="non-scaling-stroke" />
            </svg>
            <svg
              className="dm-wire-vertical"
              viewBox="0 0 2 1000"
              preserveAspectRatio="none"
              focusable="false"
            >
              <path d="M1 0V1000" vectorEffect="non-scaling-stroke" />
            </svg>
            {status !== "idle" && !still.manual && !still.system && (
              <i key={run.started} className="dm-pulse" style={pulseStyle} />
            )}
          </li>
        </ol>
        <div className="dm-readout" aria-live="polite" aria-atomic="true">
          <div className="dm-readout-title">
            <span className="dm-tag">
              <i />0{selected + 1} / 0{copy.steps.length}
            </span>
            <h3>{step.heading}</h3>
          </div>
          <div>
            <p className="dm-message">{step.description}</p>
            {step.fields && (
              <dl className="dm-fields">
                {step.fields.map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
        <div className="dm-transport">
          <div className="dm-actions">
            <button
              className="dm-primary"
              type="button"
              onClick={
                status === "running"
                  ? pause
                  : () => start(status === "paused" ? elapsed : 0)
              }
            >
              <Symbol
                name={
                  status === "running"
                    ? "pause"
                    : status === "complete"
                      ? "replay"
                      : "play"
                }
                size={18}
              />
              {status === "running"
                ? copy.pause
                : status === "paused"
                  ? copy.resume
                  : status === "complete"
                    ? copy.replay
                    : copy.play}
            </button>
            {(status === "running" || status === "paused") && (
              <button
                type="button"
                className="dm-replay"
                onClick={() => start(0)}
              >
                <Symbol name="replay" size={17} />
                {copy.replay}
              </button>
            )}
          </div>
          <span className="dm-status" role="status">
            <i />
            {copy[status]}
          </span>
        </div>
      </div>
      <noscript>
        <style>{".dm-js-workflow{display:none!important}"}</style>
        <ol className="dm-text-fallback">
          {copy.steps.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              {item.fields?.map(([key, value]) => (
                <p key={key}>
                  {key} — {value}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </noscript>
    </>
  );
}
