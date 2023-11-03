import * as React from 'react';

function SvgReportDark(
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
        d="M17 17v-6m-8 6v-2m4 2v-4M7 2h7.276a2 2 0 011.28.464L20.28 6.4A2 2 0 0121 7.937V20a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgReportDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
