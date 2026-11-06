export function Arrow({
  dir = "ne",
  size = 18,
}: {
  dir?: "ne" | "right" | "down" | "up";
  size?: number;
}) {
  const rotation = { ne: 0, right: 45, down: 135, up: -45 }[dir];
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: "rotate(" + rotation + "deg)" }}
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
export function Motif({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 104 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      {index === 0 ? (
        Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            d={`M${6 + i * 9} 44 Q${20 + i * 9} ${10 - i} ${43 + i * 9} 5`}
          />
        ))
      ) : index === 1 ? (
        <>
          <path d="M12 32h19l17-16h19l16 16h8" />
          {[
            [12, 32],
            [39, 24],
            [59, 16],
            [85, 32],
          ].map(([x, y]) => (
            <rect
              key={x}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              fill="#070e1b"
            />
          ))}
        </>
      ) : index === 2 ? (
        [0, 7, 14].map((n) => (
          <path
            key={n}
            d={`M16 ${19 + n} 53 ${5 + n} 90 ${17 + n} 53 ${31 + n}Z`}
          />
        ))
      ) : (
        Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${11 + i * 10} 41 V${8 + ((i * 7) % 25)}`} />
        ))
      )}
    </svg>
  );
}
