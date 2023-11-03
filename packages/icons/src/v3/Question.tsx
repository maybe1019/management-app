import * as React from 'react';

function SvgQuestion(
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
      <circle
        cx={12}
        cy={12}
        r={9}
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
      <path
        d="M8.49 9.79c0 .462.07.742.07.742h1.68s-.07-.294-.07-.63c0-.882.56-1.526 1.498-1.526.924 0 1.456.56 1.456 1.414 0 1.526-2.464 2.044-2.464 4.172 0 .168.042.322.042.322h1.624s-.028-.084-.028-.308c0-1.302 2.52-1.932 2.52-4.27 0-1.568-1.12-2.856-3.15-2.856-1.918 0-3.178 1.302-3.178 2.94zm3.094 7.322c.63 0 1.092-.434 1.092-1.078 0-.63-.462-1.078-1.092-1.078-.644 0-1.092.448-1.092 1.078 0 .644.448 1.078 1.092 1.078z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgQuestion);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
