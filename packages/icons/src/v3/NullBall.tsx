import * as React from 'react';

function SvgNullBall(
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
      <circle cx={12} cy={12} r={10} fill="#DFE7EF" />
      <path
        d="M7.757 12h8.486"
        stroke="#6A6A88"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgNullBall);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
