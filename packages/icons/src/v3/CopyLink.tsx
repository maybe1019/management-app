import * as React from 'react';

function SvgCopyLink(
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
        d="M15 6h1a6 6 0 016 6v0a6 6 0 01-6 6h-1M9 6H8a6 6 0 00-6 6v0a6 6 0 006 6h1M9 12h6"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCopyLink);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
