"use client";

import { useState } from "react";
import type { ArchitectureCopy } from "./copy";
import { Symbol } from "./Symbols";

function DataLines({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className="dm-plate-traces"
    >
      <path
        d="M12 33V12h21m54 0h21v21m0 54v21H87m-54 0H12V87"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((line) => {
        const center = 34 + 13 * line + index;
        return (
          <path
            key={line}
            d={`M24 ${center}H${center + 8}l16 16H96`}
            fill="none"
            stroke="currentColor"
            opacity={0.65 - line * 0.12}
          />
        );
      })}
      <circle cx="24" cy={34 + index} r="2.5" fill="currentColor" />
      <circle cx="96" cy={76 + index} r="2.5" fill="currentColor" />
    </svg>
  );
}

function LayerInfo({ copy, index }: { copy: ArchitectureCopy; index: number }) {
  const layer = copy.layers[index];
  return (
    <>
      <p className="dm-layer-purpose">{layer.purpose}</p>
      <dl className="dm-layer-ports">
        <div>
          <dt>{copy.input}</dt>
          <dd>{layer.input}</dd>
        </div>
        <div>
          <dt>{copy.output}</dt>
          <dd>{layer.output}</dd>
        </div>
      </dl>
    </>
  );
}

export default function Architecture({ copy }: { copy: ArchitectureCopy }) {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="dm-architecture-board">
        <div className="dm-stack">
          <svg
            viewBox="0 0 160 320"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="dm-stack-wires"
          >
            <path
              d="M25 30v238l53 30 53-30V30M78 62v236"
              fill="none"
              stroke="currentColor"
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {copy.layers.map((layer, index) => (
            <button
              key={layer.name}
              type="button"
              className="dm-stack-layer"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span className="dm-plate-slot" aria-hidden="true">
                <span className="dm-plate">
                  <DataLines index={index} />
                </span>
              </span>
              <span className="dm-layer-number">0{index + 1}</span>
              <span className="dm-layer-label">{layer.name}</span>
            </button>
          ))}
        </div>
        <div className="dm-layer-readout" aria-live="polite" aria-atomic="true">
          <span className="dm-tag">
            <i />0{selected + 1} / 0{copy.layers.length}
          </span>
          <h3>{copy.layers[selected].name}</h3>
          <LayerInfo copy={copy} index={selected} />
        </div>
      </div>
      <div className="dm-layer-accordion">
        {copy.layers.map((layer, index) => (
          <details key={layer.name} name="skyx-architecture" open={index === 0}>
            <summary>
              <span className="dm-layer-number">0{index + 1}</span>
              <span>{layer.name}</span>
              <Symbol name="plus" size={18} />
            </summary>
            <div className="dm-mobile-layer">
              <LayerInfo copy={copy} index={index} />
            </div>
          </details>
        ))}
      </div>
      <noscript>
        <style>
          {
            ".dm-architecture-board{display:none!important}.dm-layer-accordion{display:block!important}"
          }
        </style>
      </noscript>
    </>
  );
}
