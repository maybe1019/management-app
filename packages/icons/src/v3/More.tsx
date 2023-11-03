import * as React from 'react';

function SvgMore(
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
      <circle cx={12} cy={12} r={2} fill={props.color || '#1E1E32'} />
      <circle cx={4} cy={12} r={2} fill={props.color || '#1E1E32'} />
      <circle cx={20} cy={12} r={2} fill={props.color || '#1E1E32'} />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgMore);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
