import * as React from 'react';

function SvgOktaLight(
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
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-5a5 5 0 100-10 5 5 0 000 10z"
        fill="#007DC1"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgOktaLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
