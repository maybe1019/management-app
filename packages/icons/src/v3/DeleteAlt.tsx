import * as React from 'react';

function SvgDeleteAlt(
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
        d="M16 9l-6 6M10 9l6 6"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.712 5.504l-3.428 6a1 1 0 000 .992l3.428 6A1 1 0 006.58 19H20a1 1 0 001-1V6a1 1 0 00-1-1H6.58a1 1 0 00-.868.504z"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgDeleteAlt);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
