import * as React from 'react';

function SvgBolt(
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
        d="M14.949 9.64l3.97-5.9a.474.474 0 00-.39-.74H9.266a.942.942 0 00-.887.63c-.607 1.714-2.312 6.501-3.308 9.025-.263.667.241 1.455.953 1.455H8.51l-1.163 5.748c-.185.914.913 1.52 1.578.87l9.673-9.458c.607-.593.19-1.63-.655-1.63h-2.995z"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgBolt);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
