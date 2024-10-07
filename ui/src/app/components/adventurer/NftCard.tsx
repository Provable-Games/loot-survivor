interface NftCardProps {
  name: string;
  weapon: string;
}

const NftCard = ({ name, weapon }: NftCardProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
      <style>{`text{text-transform: uppercase;font-family: Courier, monospace;fill: #3DEC00;}g{fill: #3DEC00;}`}</style>
      <rect
        x="0.5"
        y="0.5"
        width="599"
        height="899"
        rx="27.5"
        fill="black"
        stroke="#3DEC00"
      />
      <g transform="translate(25,25) scale(4)">
        <path d="M1 2V0h8v2h1v10H7v4H3v-4H0V2zm1 4v4h2v2h2v-2h2V6H6v4H4V6z" />
      </g>
      <text
        x="30"
        y="117"
        font-size="20"
        text-anchor="left"
        dominant-baseline="middle"
      >
        {name}
      </text>
      <text
        x="123"
        y="61"
        font-size="24"
        text-anchor="left"
        dominant-baseline="middle"
      >
        #1
      </text>
      <text
        x="30"
        y="150"
        font-size="20"
        text-anchor="left"
        dominant-baseline="middle"
      >
        XP: 0
      </text>
      <text
        x="300"
        y="150"
        font-size="20"
        text-anchor="end"
        dominant-baseline="middle"
      >
        LVL: 1
      </text>
      <text
        x="570"
        y="58"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        100 / 100 HP
      </text>
      <text
        x="570"
        y="93"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        25 GOLD
      </text>
      <text
        x="570"
        y="128"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        ? STR
      </text>
      <text
        x="570"
        y="163"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        ? DEX
      </text>
      <text
        x="570"
        y="198"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        ? INT
      </text>
      <text
        x="570"
        y="233"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        ? VIT
      </text>
      <text
        x="570"
        y="268"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        ? WIS
      </text>
      <text
        x="570"
        y="303"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        ? CHA
      </text>
      <text
        x="570"
        y="338"
        font-size="20"
        text-anchor="end"
        dominant-baseline="right"
      >
        2 LUCK
      </text>
      <text
        x="30"
        y="200"
        font-size="32"
        text-anchor="right"
        dominant-baseline="middle"
      >
        Equipped
      </text>
      <text
        x="30"
        y="580"
        font-size="32"
        text-anchor="right"
        dominant-baseline="middle"
      >
        Bag
      </text>
      <g transform="translate(25,240) scale(1.5)">
        <path d="M8 4V3H6V2H5V1H3v2H2v2H1v1h2V5h2v2H4v2H3v2H2v2H1v2H0v2h2v-2h1v-2h1v-2h1V9h1V7h2v5h2v-2h1V8h1V6h1V4H8Z" />
      </g>
      <text
        x="60"
        y="253"
        font-size="16"
        text-anchor="start"
        dominant-baseline="middle"
      >
        G1 {weapon}
      </text>
      <g transform="translate(24,280) scale(1.5)">
        <path d="M0 8h2V7H0v1Zm3-3V2H2v1H1v2H0v1h4V5H3Zm2-4H4v4h1V1Zm6 0v4h1V1h-1Zm4 4V3h-1V2h-1v3h-1v1h4V5h-1Zm-1 3h2V7h-2v1ZM9 7H7V6H4v1H3v4h4v-1h2v1h4V7h-1V6H9v1Zm1 6v1h1v2h1v-2h1v-2H9v1h1Zm-3-1h2v-1H7v1Zm0 1v-1H3v2h1v2h1v-2h1v-1h1Zm2 0H7v1H6v2h4v-2H9v-1Z" />
      </g>
      <text
        x="60"
        y="292"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <g transform="translate(25,320) scale(1.5)">
        <path d="M12 2h-1V1h-1V0H6v1H5v1H4v1H3v8h1v1h2V8H5V7H4V5h3v4h2V5h3v2h-1v1h-1v4h2v-1h1V3h-1V2ZM2 2V1H1V0H0v2h1v2h1v1-2h1V2H2Zm13-2v1h-1v1h-1v1h1v2-1h1V2h1V0h-1Z" />
      </g>
      <text
        x="60"
        y="331"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <g transform="translate(25,360) scale(1.5)">
        <path d="M0 13h2v-1H0v1Zm0-2h3v-1H0v1Zm1-7H0v5h3V8h2V3H1v1Zm0-2h4V0H1v2Zm5 0h1V1h1v1h1V0H6v2Zm8-2h-4v2h4V0Zm0 4V3h-4v5h2v1h3V4h-1Zm-2 7h3v-1h-3v1Zm1 2h2v-1h-2v1ZM6 9h1v1h1V9h1V3H6v6Z" />
      </g>
      <text
        x="60"
        y="370"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <g transform="translate(25,400) scale(1.5)">
        <path d="M4 1V0H0v2h5V1H4Zm2-1H5v1h1V0Zm0 2H5v1h1V2Zm0 2V3H5v1h1Zm0 2V5H5v1h1Zm0 2V7H5v1h1Zm5 0V7H9v1h2Zm0-2V5H9v1h2Zm0-2V3H9v1h2Zm0-2H9v1h2V2Zm0-2H9v1h2V0ZM8 1V0H7v2h2V1H8Zm0 6h1V6H8V5h1V4H8V3h1-2v5h1V7ZM6 9V8H4V7h1V6H4V5h1V4H4V3h1-5v8h5V9h1Zm5 0h-1V8H7v1H6v2H5v1h6V9ZM0 13h5v-1H0v1Zm11 0v-1H5v1h6Zm1 0h4v-1h-4v1Zm3-3V9h-1V8h-2v1h-1v1h1v2h4v-2h-1Zm-4-2v1-1Z" />
      </g>
      <text
        x="60"
        y="409"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <g transform="translate(27,435) scale(1.5)">
        <path d="M9 8v1H8v3H4v-1h3V2H6v7H5V1H4v8H3V2H2v8H1V5H0v10h1v2h5v-1h2v-1h1v-2h1V8H9Z" />
      </g>
      <text
        x="60"
        y="448"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <g transform="translate(25,475) scale(1.5)">
        <path d="M14 8V6h-1V5h-1V4h-1V3h-1V2H8V1H2v1H1v1H0v8h1v1h1v1h4v-1h1v-1H3v-1H2V4h1V3h4v1h2v1h1v1h1v1h1v1h1v1h-2v1h1v1h2v-1h1V8h-1Zm-6 3v1h1v-1H8Zm1 0h2v-1H9v1Zm4 3v-2h-1v2h1Zm-6-2v2h1v-2H7Zm2 4h2v-1H9v1Zm-1-2v1h1v-1H8Zm3 1h1v-1h-1v1Zm0-3h1v-1h-1v1Zm-2 2h2v-2H9v2Z" />
      </g>
      <text
        x="60"
        y="487"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <g transform="translate(25,515) scale(1.5)">
        <path d="M13 3V2h-1V1h-2v1h1v3h-1v2H9v1H8v1H7v1H6v1H4v1H1v-1H0v2h1v1h1v1h4v-1h2v-1h1v-1h1v-1h1v-1h1V9h1V7h1V3h-1ZM3 9h1V8h1V7h1V6h1V5h1V4h2V2H9V1H8v1H6v1H5v1H4v1H3v1H2v1H1v2H0v1h1v1h2V9Z" />
      </g>
      <text
        x="60"
        y="526"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        None Equipped
      </text>
      <text
        x="30"
        y="624"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        1. Empty
      </text>
      <text
        x="30"
        y="658"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        2. Empty
      </text>
      <text
        x="30"
        y="692"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        3. Empty
      </text>
      <text
        x="30"
        y="726"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        4. Empty
      </text>
      <text
        x="30"
        y="760"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        5. Empty
      </text>
      <text
        x="30"
        y="794"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        6. Empty
      </text>
      <text
        x="30"
        y="828"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        7. Empty
      </text>
      <text
        x="30"
        y="862"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        8. Empty
      </text>
      <text
        x="321"
        y="624"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        9. Empty
      </text>
      <text
        x="311"
        y="658"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        10. Empty
      </text>
      <text
        x="311"
        y="692"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        11. Empty
      </text>
      <text
        x="311"
        y="726"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        12. Empty
      </text>
      <text
        x="311"
        y="760"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        13. Empty
      </text>
      <text
        x="311"
        y="794"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        14. Empty
      </text>
      <text
        x="311"
        y="828"
        font-size="16"
        text-anchor="left"
        dominant-baseline="middle"
      >
        15. Empty
      </text>
    </svg>
  );
};

export default NftCard;
