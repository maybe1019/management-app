import * as React from 'react';

function SvgData(
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
        d="M19 8c0 1.657-3.134 3-7 3S5 9.657 5 8m14 0c0-1.657-3.134-3-7-3S5 6.343 5 8m14 0v4M5 8v4m14 0c0 1.657-3.134 3-7 3s-7-1.343-7-3m14 0v4c0 1.657-3.134 3-7 3s-7-1.343-7-3v-4"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgData);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
