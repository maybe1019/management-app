import * as React from 'react';

function SvgExpandAlt(
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
        d="M16 16l-4 4-4-4M8 8l4-4 4 4"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgExpandAlt);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;