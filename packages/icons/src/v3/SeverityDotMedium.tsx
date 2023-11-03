import * as React from 'react';

function SvgSeverityDotMedium(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      ref={svgRef}
      {...props}
    >
      <circle
        cx={12}
        cy={12}
        r={5}
        fill="url(#SeverityDotMedium_svg__paint0_linear_2955_2135)"
      />
      <defs>
        <linearGradient
          id="SeverityDotMedium_svg__paint0_linear_2955_2135"
          x1={12}
          y1={17}
          x2={12}
          y2={7}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC385" />
          <stop offset={0.5} stopColor="#F49B3E" />
          <stop offset={1} stopColor="#F1853B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSeverityDotMedium);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
