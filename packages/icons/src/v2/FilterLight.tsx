import * as React from 'react';

function SvgFilterLight(
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
      <path
        d="M14 18v-7l5-4V5H5v2l5 4v5"
        stroke="#1E1E32"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFilterLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
