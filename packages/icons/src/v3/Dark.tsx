import * as React from 'react';

function SvgDark(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 1440 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      ref={svgRef}
      {...props}
    >
      <path fill={props.color || '#1E1E32'} d="M0 0h1440v512H0z" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
