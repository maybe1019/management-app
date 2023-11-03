import * as React from 'react';

function SvgLogosJira(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M14.84 7.617L8.61 1.39 8 .783l-4.667 4.69L1.19 7.617a.567.567 0 000 .81l4.27 4.283L8 15.26l4.697-4.69.073-.073 2.07-2.07a.573.573 0 000-.81zM8 10.163l-2.133-2.14L8 5.883l2.14 2.14L8 10.163z"
        fill="#2684FF"
      />
      <path
        d="M8 5.883A3.607 3.607 0 018 .8L3.333 5.483l2.55 2.55L8 5.883z"
        fill="url(#LogosJira_svg__paint0_linear)"
      />
      <path
        d="M10.153 8.017L8 10.163a3.607 3.607 0 010 5.097l4.703-4.693-2.55-2.55z"
        fill="url(#LogosJira_svg__paint1_linear)"
      />
      <defs>
        <linearGradient
          id="LogosJira_svg__paint0_linear"
          x1={7.627}
          y1={3.717}
          x2={4.637}
          y2={6.707}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.18} stopColor="#0052CC" />
          <stop offset={1} stopColor="#2684FF" />
        </linearGradient>
        <linearGradient
          id="LogosJira_svg__paint1_linear"
          x1={202.013}
          y1={391.261}
          x2={261.233}
          y2={352.808}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.18} stopColor="#0052CC" />
          <stop offset={1} stopColor="#2684FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgLogosJira;
