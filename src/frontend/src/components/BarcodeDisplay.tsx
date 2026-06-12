/**
 * BarcodeDisplay — Code128B inline SVG barcode, zero npm dependencies.
 * Encodes printable ASCII (0x20–0x7E) using Code 128 standard.
 */

// ─── Code128B encoding tables ─────────────────────────────────────────────────
// Each entry: [bar1, sp1, bar2, sp2, bar3, sp3] widths (modules)
const CODE128_PATTERNS: number[][] = [
  [2, 1, 2, 2, 2, 2],
  [2, 2, 2, 1, 2, 2],
  [2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 2, 3],
  [1, 2, 1, 3, 2, 2],
  [1, 3, 1, 2, 2, 2],
  [1, 2, 2, 2, 1, 3],
  [1, 2, 2, 3, 1, 2],
  [1, 3, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 3],
  [2, 2, 1, 3, 1, 2],
  [2, 3, 1, 2, 1, 2],
  [1, 1, 2, 2, 3, 2],
  [1, 2, 2, 1, 3, 2],
  [1, 2, 2, 2, 3, 1],
  [1, 1, 3, 2, 2, 2],
  [1, 2, 3, 1, 2, 2],
  [1, 2, 3, 2, 2, 1],
  [2, 2, 3, 2, 1, 1],
  [2, 2, 1, 1, 3, 2],
  [2, 2, 1, 2, 3, 1],
  [2, 1, 3, 2, 1, 2],
  [2, 2, 3, 1, 1, 2],
  [3, 1, 2, 1, 3, 1],
  [3, 1, 1, 2, 2, 2],
  [3, 2, 1, 1, 2, 2],
  [3, 2, 1, 2, 2, 1],
  [3, 1, 2, 2, 1, 2],
  [3, 2, 2, 1, 1, 2],
  [3, 2, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 3],
  [2, 1, 2, 3, 2, 1],
  [2, 3, 2, 1, 2, 1],
  [1, 1, 1, 3, 2, 3],
  [1, 3, 1, 1, 2, 3],
  [1, 3, 1, 3, 2, 1],
  [1, 1, 2, 3, 1, 3],
  [1, 3, 2, 1, 1, 3],
  [1, 3, 2, 3, 1, 1],
  [2, 1, 1, 3, 1, 3],
  [2, 3, 1, 1, 1, 3],
  [2, 3, 1, 3, 1, 1],
  [1, 1, 2, 1, 3, 3],
  [1, 1, 2, 3, 3, 1],
  [1, 3, 2, 1, 3, 1],
  [1, 1, 3, 1, 2, 3],
  [1, 1, 3, 3, 2, 1],
  [1, 3, 3, 1, 2, 1],
  [3, 1, 3, 1, 2, 1],
  [2, 1, 1, 3, 3, 1],
  [2, 3, 1, 1, 3, 1],
  [2, 1, 3, 1, 1, 3],
  [2, 1, 3, 3, 1, 1],
  [2, 1, 3, 1, 3, 1],
  [3, 1, 1, 1, 2, 3],
  [3, 1, 1, 3, 2, 1],
  [3, 3, 1, 1, 2, 1],
  [3, 1, 2, 1, 1, 3],
  [3, 1, 2, 3, 1, 1],
  [3, 3, 2, 1, 1, 1],
  [3, 1, 4, 1, 1, 1],
  [2, 2, 1, 4, 1, 1],
  [4, 3, 1, 1, 1, 1],
  [1, 1, 1, 2, 2, 4],
  [1, 1, 1, 4, 2, 2],
  [1, 2, 1, 1, 2, 4],
  [1, 2, 1, 4, 2, 1],
  [1, 4, 1, 1, 2, 2],
  [1, 4, 1, 2, 2, 1],
  [1, 1, 2, 2, 1, 4],
  [1, 1, 2, 4, 1, 2],
  [1, 2, 2, 1, 1, 4],
  [1, 2, 2, 4, 1, 1],
  [1, 4, 2, 1, 1, 2],
  [1, 4, 2, 2, 1, 1],
  [2, 4, 1, 2, 1, 1],
  [2, 2, 1, 1, 1, 4],
  [4, 1, 3, 1, 1, 1],
  [2, 4, 1, 1, 1, 2],
  [1, 3, 4, 1, 1, 1],
  [1, 1, 1, 2, 4, 2],
  [1, 2, 1, 1, 4, 2],
  [1, 2, 1, 2, 4, 1],
  [1, 1, 4, 2, 1, 2],
  [1, 2, 4, 1, 1, 2],
  [1, 2, 4, 2, 1, 1],
  [4, 1, 1, 2, 1, 2],
  [4, 2, 1, 1, 1, 2],
  [4, 2, 1, 2, 1, 1],
  [2, 1, 2, 1, 4, 1],
  [2, 1, 4, 1, 2, 1],
  [4, 1, 2, 1, 2, 1],
  [1, 1, 1, 1, 4, 3],
  [1, 1, 1, 3, 4, 1],
  [1, 3, 1, 1, 4, 1],
  [1, 1, 4, 1, 1, 3],
  [1, 1, 4, 3, 1, 1],
  [4, 1, 1, 1, 1, 3],
  [4, 1, 1, 3, 1, 1],
  [1, 1, 3, 1, 4, 1],
  [1, 1, 4, 1, 3, 1],
  [3, 1, 1, 1, 4, 1],
  [4, 1, 1, 1, 3, 1],
  [2, 1, 1, 4, 1, 2],
  [2, 1, 1, 2, 1, 4],
  [2, 1, 1, 2, 3, 2],
  [2, 3, 3, 1, 1, 1],
  [1, 1, 2, 1, 2, 1], // stop pattern (index 106)
];

const START_B = 104; // Code128 Start Code B value
const STOP = 106; // Code128 Stop Code value

// Code B: value = ASCII_code − 32  (chars 0x20-0x7E → codes 0-94)
function charToCode128B(char: string): number {
  const code = char.charCodeAt(0) - 32;
  if (code < 0 || code > 94) return 0; // fallback to space
  return code;
}

function buildModules(value: string): boolean[] {
  const codes: number[] = [START_B];
  for (const ch of value) codes.push(charToCode128B(ch));

  // Checksum
  let check = START_B;
  value.split("").forEach((ch, i) => {
    check += charToCode128B(ch) * (i + 1);
  });
  codes.push(check % 103);
  codes.push(STOP);

  const modules: boolean[] = [];
  for (const code of codes) {
    const pattern = CODE128_PATTERNS[code] ?? CODE128_PATTERNS[0];
    for (let i = 0; i < pattern.length; i++) {
      const isBar = i % 2 === 0;
      for (let w = 0; w < pattern[i]; w++) modules.push(isBar);
    }
    // After stop code add the 2-module termination bar
    if (code === STOP) {
      modules.push(true);
      modules.push(true);
    }
  }
  // quiet zones: 10 modules each side
  return [
    ...Array<boolean>(10).fill(false),
    ...modules,
    ...Array<boolean>(10).fill(false),
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BarcodeDisplayProps {
  value: string;
  width?: number;
  height?: number;
  showText?: boolean;
  className?: string;
}

export default function BarcodeDisplay({
  value,
  width = 200,
  height = 60,
  showText = true,
  className = "",
}: BarcodeDisplayProps) {
  if (!value) return null;

  const modules = buildModules(value);
  const totalModules = modules.length;
  const textHeight = showText ? 14 : 0;
  const barcodeHeight = height - textHeight;
  const moduleWidth = width / totalModules;

  const rects: React.ReactNode[] = [];
  let i = 0;
  while (i < modules.length) {
    if (!modules[i]) {
      i++;
      continue;
    }
    let j = i;
    while (j < modules.length && modules[j]) j++;
    rects.push(
      <rect
        key={i}
        x={i * moduleWidth}
        y={0}
        width={(j - i) * moduleWidth}
        height={barcodeHeight}
        fill="currentColor"
      />,
    );
    i = j;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={`text-foreground ${className}`}
      role="img"
      aria-label={`Barcode: ${value}`}
    >
      {rects}
      {showText && (
        <text
          x={width / 2}
          y={height - 2}
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {value}
        </text>
      )}
    </svg>
  );
}
