import * as React from 'react';

function SvgHierarchy(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      ref={svgRef}
      {...props}
    >
      <rect
        x={5.394}
        y={4}
        width={10.303}
        height={5}
        rx={1}
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
      <rect
        x={1.629}
        y={15.75}
        width={4.652}
        height={4.5}
        rx={1.25}
        stroke={props.color || '#1E1E32'}
        strokeWidth={1.5}
      />
      <rect
        x={14.811}
        y={15.75}
        width={4.652}
        height={4.5}
        rx={1.25}
        stroke={props.color || '#1E1E32'}
        strokeWidth={1.5}
      />
      <rect
        x={8.22}
        y={15.75}
        width={4.652}
        height={4.5}
        rx={1.25}
        stroke={props.color || '#1E1E32'}
        strokeWidth={1.5}
      />
      <path
        d="M3.515 13a1 1 0 011-1h12.06a1 1 0 011 1H3.516zM3.515 13h.879v2h-.879z"
        fill={props.color || '#1E1E32'}
      />
      <path
        fill={props.color || '#1E1E32'}
        d="M10.106 10h.879v5h-.879zM16.697 13h.879v2h-.879z"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgHierarchy);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
