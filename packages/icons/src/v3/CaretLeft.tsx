import * as React from 'react';

function SvgCaretLeft(
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.074 8.102c.56.206.926.692.926 1.231v5.334c0 .539-.366 1.025-.926 1.232-.56.206-1.206.092-1.635-.29l-3-2.666c-.585-.52-.585-1.365 0-1.886l3-2.666c.43-.382 1.075-.496 1.635-.29z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCaretLeft);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
