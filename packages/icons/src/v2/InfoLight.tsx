import * as React from 'react';

function SvgInfoLight(
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
      <circle cx={12} cy={12} r={9} stroke="#1E1E32" strokeWidth={2} />
      <path
        d="M12 11v5"
        stroke="#1E1E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={12} cy={8} r={0.5} stroke="#1E1E32" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgInfoLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
