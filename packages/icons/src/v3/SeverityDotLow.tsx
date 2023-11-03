import * as React from 'react';

function SvgSeverityDotLow(
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
        fill="url(#SeverityDotLow_svg__paint0_linear_2955_2134)"
      />
      <defs>
        <linearGradient
          id="SeverityDotLow_svg__paint0_linear_2955_2134"
          x1={12}
          y1={17}
          x2={12}
          y2={7}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#35B589" />
          <stop offset={0.494} stopColor="#39B68B" />
          <stop offset={1} stopColor="#10857E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSeverityDotLow);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
