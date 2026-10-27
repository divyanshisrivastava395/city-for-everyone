
type CityMapProps = {
  playerX: number;
  playerY: number;
};

export default function CityMap({
  playerX,
  playerY,
}: CityMapProps) {
  return (
    <svg
      className="city-map"
      viewBox="0 0 800 560"
      role="img"
      aria-label="City map with roads, buildings, trees and a player"
    >
      <rect width="800" height="560" fill="#ffe5b2" />

      {/* City ground */}
      <path
        d="M40 220 L400 40 L760 220 L400 430 Z"
        fill="#a9d47c"
      />

      {/* Grass tiles */}
      {Array.from({ length: 9 }, (_, i) =>
        Array.from({ length: 8 }, (_, j) => (
          <path
            key={`${i}-${j}`}
            d={`M${40 + i * 40 - j * 40} ${220 + i * 20 + j * 20}
                l40 -20 l40 20 l-40 20 Z`}
            fill={(i + j) % 2 === 0 ? "#b6dc87" : "#9bc96c"}
            opacity=".55"
          />
        ))
      )}

      {/* Main roads */}
      <path
        d="M40 220 L400 400 L760 220 L760 275 L400 455 L40 275 Z"
        fill="#686a75"
      />
      <path
        d="M245 330 L500 75 L545 98 L290 353 Z"
        fill="#686a75"
      />

      {/* Road markings */}
      <g
        stroke="#ffe28a"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M105 254 L126 265" />
        <path d="M170 286 L191 297" />
        <path d="M620 289 L642 278" />
        <path d="M682 258 L704 247" />
        <path d="M354 236 L367 223" />
        <path d="M408 182 L421 169" />
      </g>

      {/* Zebra crossing */}
      <g transform="translate(395 310) rotate(-27)">
        {Array.from({ length: 7 }, (_, i) => (
          <rect
            key={i}
            x={-42 + i * 13}
            y="-20"
            width="8"
            height="40"
            rx="1"
            fill="#fff8e8"
          />
        ))}
      </g>

      {/* Curb ramp */}
      <path
        d="M305 335 L347 314 L369 325 L327 347 Z"
        fill="#ffbf35"
      />

      {/* Library */}
      <g>
        <path d="M275 155 L355 115 L435 155 L355 195 Z" fill="#92533c" />
        <path d="M275 155 L355 195 L355 248 L275 208 Z" fill="#b66d4b" />
        <path d="M355 195 L435 155 L435 208 L355 248 Z" fill="#714230" />
        <path d="M275 155 L355 115 L435 155 L355 195 Z" fill="#92533c" />

        <path d="M294 172 L313 182 L313 207 L294 197 Z" fill="#ffedb7" />
        <path d="M325 188 L346 199 L346 224 L325 213 Z" fill="#ffedb7" />
        <path d="M367 201 L386 191 L386 224 L367 234 Z" fill="#55392b" />

        <rect x="320" y="98" width="72" height="23" rx="4" fill="#624535" />
        <text
          x="356"
          y="114"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          fill="white"
        >
          LIBRARY
        </text>
      </g>

      {/* House */}
      <g>
        <path d="M470 250 L530 220 L590 250 L530 280 Z" fill="#78577f" />
        <path d="M470 250 L530 280 L530 314 L470 284 Z" fill="#e6b79e" />
        <path d="M530 280 L590 250 L590 284 L530 314 Z" fill="#bd9078" />
        <path d="M470 250 L530 220 L590 250 L530 280 Z" fill="#78577f" />
        <path d="M481 258 L498 267 L498 283 L481 274 Z" fill="#fff0bc" />
        <path d="M543 279 L566 267 L566 283 L543 295 Z" fill="#b9e7f1" />
      </g>

      {/* Park */}
      <path d="M610 300 L690 260 L750 290 L670 330 Z" fill="#8fc36b" />
      <path d="M673 310 L725 284 L755 299 L703 325 Z" fill="#8ac8d5" />

      {/* Trees */}
      {[
        [130, 230],
        [215, 330],
        [475, 350],
        [625, 255],
        [690, 275],
        [570, 350],
      ].map(([x, y], i) => (
        <g key={i}>
          <ellipse
            cx={x}
            cy={y + 12}
            rx="21"
            ry="7"
            fill="#557340"
            opacity=".25"
          />
          <path
            d={`M${x} ${y - 5} v25`}
            stroke="#755139"
            strokeWidth="8"
          />
          <circle cx={x} cy={y - 15} r="23" fill="#66a94c" />
          <circle cx={x - 7} cy={y - 21} r="16" fill="#83c65c" />
          <circle cx={x - 11} cy={y - 26} r="7" fill="#a7d87c" />
        </g>
      ))}

      {/* Accessibility warning */}
      <g transform="translate(300 260)">
        <circle r="15" fill="#f28b27" stroke="#fff5df" strokeWidth="3" />
        <text
          y="6"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="white"
        >
          !
        </text>
      </g>

      {/* Bus stop marker */}
      <g transform="translate(425 365)">
        <rect width="32" height="27" rx="4" fill="#ffcc28" />
        <path d="M7 8 H25 M7 15 H21" stroke="#423c28" strokeWidth="3" />
        <path d="M16 27 V44" stroke="#65503a" strokeWidth="4" />
      </g>

      {/* Player character */}
      <g transform={`translate(${playerX} ${playerY})`}>
        <ellipse
          cx="0"
          cy="20"
          rx="12"
          ry="5"
          fill="#45372c"
          opacity=".25"
        />
        <circle cx="0" cy="-8" r="9" fill="#f0b78a" />
        <path
          d="M-9 -10 Q-9 -21 0 -20 Q9 -20 9 -10 L4 -15 L-5 -14 Z"
          fill="#3b3029"
        />
        <path
          d="M-8 2 Q0 -2 8 2 L9 18 L-9 18 Z"
          fill="#e99b37"
        />
        <path
          d="M-5 18 L-6 30 M5 18 L6 30"
          stroke="#60483a"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M-7 4 L-13 14 M7 4 L13 13"
          stroke="#f0b78a"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
