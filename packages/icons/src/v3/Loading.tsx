import * as React from 'react';

function SvgLoading(
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
        d="M21 12a9 9 0 11-9-9"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgLoading);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
