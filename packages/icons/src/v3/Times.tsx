import * as React from 'react';

function SvgTimes(
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
        d="M16.95 7.05L12 12m-4.95 4.95L12 12m0 0L7.05 7.05l9.9 9.9"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTimes);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
