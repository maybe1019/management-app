import * as React from 'react';

function SvgSwitchOff(
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
      <rect
        x={2}
        y={6}
        width={20}
        height={12}
        rx={6}
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
      <rect x={5} y={9} width={6} height={6} rx={3} fill="#DC3545" />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSwitchOff);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
