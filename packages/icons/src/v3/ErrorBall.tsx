import * as React from 'react';

function SvgErrorBall(
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
        r={10}
        fill="url(#ErrorBall_svg__paint0_linear_2354_10381)"
      />
      <path
        d="M9 9l6 6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="ErrorBall_svg__paint0_linear_2354_10381"
          x1={12}
          y1={2}
          x2={12}
          y2={22}
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

const ForwardRef = React.forwardRef(SvgErrorBall);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
