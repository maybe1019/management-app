import * as React from 'react';

function SvgSeverityDotHigh(
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
        fill="url(#SeverityDotHigh_svg__paint0_linear_2955_2136)"
      />
      <defs>
        <linearGradient
          id="SeverityDotHigh_svg__paint0_linear_2955_2136"
          x1={12}
          y1={7}
          x2={12}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB1B2E" />
          <stop offset={0.5} stopColor="#DC3545" />
          <stop offset={1} stopColor="#FF8087" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSeverityDotHigh);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
