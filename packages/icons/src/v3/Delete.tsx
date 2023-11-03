import * as React from 'react';

function SvgDelete(
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
        d="M15 9l-6 6M9 9l6 6"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={12}
        cy={12}
        r={9}
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgDelete);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
