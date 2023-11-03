import * as React from 'react';

function SvgRectangle488(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 1280 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      ref={svgRef}
      {...props}
    >
      <rect width={1280} height={4} rx={2} fill="#DFE7EF" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgRectangle488);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
