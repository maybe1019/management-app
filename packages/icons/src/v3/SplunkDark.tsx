import * as React from 'react';

function SvgSplunkDark(
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
        d="M19.778 10.33v3.394L4.222 22v-3.651L16.277 12 4.222 5.737V2l15.556 8.33z"
        fill="#fff"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSplunkDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
