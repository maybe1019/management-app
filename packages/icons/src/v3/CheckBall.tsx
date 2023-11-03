import * as React from 'react';

function SvgCheckBall(
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
        fill="url(#CheckBall_svg__paint0_linear_2354_9841)"
      />
      <path
        d="M8 13l2 2 6-6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="CheckBall_svg__paint0_linear_2354_9841"
          x1={12}
          y1={22}
          x2={12}
          y2={2}
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

const ForwardRef = React.forwardRef(SvgCheckBall);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
