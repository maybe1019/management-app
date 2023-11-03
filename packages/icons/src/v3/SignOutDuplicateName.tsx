import * as React from 'react';

function SvgSignOutDuplicateName(
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
        d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4M12 14V4m0 0L8 8m4-4l4 4"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSignOutDuplicateName);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
