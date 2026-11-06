/** Small vector studies for the studio's four disciplines. All coordinates are deterministic. */
export default function Diagram({
  kind,
  inset = false,
}: {
  kind: string;
  inset?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 240"
      className={inset ? "ip-diagram ip-diagram-small" : "ip-diagram"}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {!inset && (
        <g stroke="#7997c8" strokeWidth="0.8" opacity=".48">
          <path d="M11 17v-6h6m366 0h6v6M11 223v6h6m366 0h6v-6" />
          <path d="M11 120h8m362 0h8M200 11v7m0 204v7" />
        </g>
      )}
      {kind === "digital-marketing" && (
        <g transform="rotate(-30 200 120)">
          {Array.from({ length: 13 }, (_, i) => (
            <path
              key={i}
              d={`M${97 + i * 3} ${139 + i * 3} C ${108 + i} ${93 - i * 6}, ${170 + i * 6} ${79 - i * 5}, ${209 + i * 8} ${123 + i}`}
              stroke={
                i === 12 ? "#a9daff" : i % 4 === 0 ? "#639dff" : "#3472c5"
              }
              strokeWidth={i === 12 ? 2.2 : 1.4}
            />
          ))}
          <circle cx="97" cy="139" r="5" fill="#a6d8ff" />
        </g>
      )}
      {kind === "ai-automation" && (
        <g stroke="#4276b9" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M69 152h57l45-63h58l41 48h66" />
          <path d="M69 161h63l45-63h48m-49 10h44l41 47h75" opacity=".44" />
          <path
            d="M133 145l32-46m71-2 28 33"
            stroke="#9bd4ff"
            strokeWidth="3"
          />
          {[
            [69, 152],
            [171, 89],
            [229, 89],
            [270, 137],
            [336, 137],
          ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="13" fill="#05152e" />
              <circle cx={x} cy={y} r="5" fill="#80c4ff" stroke="none" />
            </g>
          ))}
        </g>
      )}
      {kind === "ai-architecture" && (
        <g strokeLinejoin="round">
          {Array.from({ length: 7 }, (_, i) => {
            const y = 135 - 13 * i;
            return (
              <path
                key={i}
                d={`M71 ${y + 20}l114 -39 144 36 -115 46z`}
                fill={i === 6 ? "#102e57" : "#06152d"}
                stroke={i === 6 ? "#9dcfff" : "#3b71ae"}
                strokeWidth={i === 6 ? 1.8 : 1.1}
              />
            );
          })}
          <path
            d="M117 83l74-26 90 24 -72 28z"
            stroke="#568ed1"
            strokeDasharray="3 5"
          />
        </g>
      )}
      {kind === "data-analytics" && (
        <g transform="translate(48,49)" strokeLinecap="round">
          {Array.from({ length: 18 }, (_, i) => {
            const y = 12 + i * 7.2;
            return (
              <path
                key={i}
                d={`M11 ${y}h${57 + i * 1.9} c28 0 24 -19 50 -19 h${39 - i} c31 0 26 23 56 23 h${78 - i}`}
                stroke={i % 6 === 0 ? "#a0d1ff" : "#3e7cc7"}
                strokeWidth={i % 6 === 0 ? 1.8 : 1.1}
              />
            );
          })}
        </g>
      )}
      {![
        "digital-marketing",
        "ai-automation",
        "ai-architecture",
        "data-analytics",
      ].includes(kind) && (
        <g>
          <path
            d="M26 160c100-22 231-26 347-38"
            stroke="#3b74b9"
            strokeWidth=".8"
            strokeDasharray="2 5"
          />
          {Array.from({ length: 7 }, (_, i) => (
            <ellipse
              key={i}
              cx="201"
              cy="120"
              rx={130 - i * 1.2}
              ry={42 + i * 1.8}
              transform="rotate(-28 201 120)"
              stroke={i === 0 ? "#b1dafe" : "#446f9d"}
              strokeWidth={i === 0 ? 1.7 : 0.9}
            />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse
              key={i}
              cx="201"
              cy="120"
              rx={115 - i * 1.7}
              ry={25 + i * 2}
              transform="rotate(31 201 120)"
              stroke={i === 0 ? "#73b5ff" : "#2566ab"}
              strokeWidth={i === 0 ? 1.6 : 0.9}
            />
          ))}
          <path
            d="M95 178a141 53 -28 0 0 186-79"
            stroke="#c1e4ff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
