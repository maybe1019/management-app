import * as React from 'react';

function SvgPolicyView(
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
        d="M8 9a2 2 0 11-4 0 2 2 0 014 0zM8 15a2 2 0 11-4 0 2 2 0 014 0z"
        fill={props.color || '#1E1E32'}
      />
      <path
        d="M11 9h8M11 15h8"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPolicyView);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
