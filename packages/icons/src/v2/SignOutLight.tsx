import * as React from 'react';

function SvgSignOutLight(
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
        d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4M10 12h10m0 0l-4-4m4 4l-4 4"
        stroke="#1E1E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSignOutLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
