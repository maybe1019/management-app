import * as React from 'react';

function SvgExceptionLight(
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
        d="M15.244 4.845c-1.468-2.46-5.02-2.46-6.488 0L2.542 15.253C1.036 17.776 2.84 21 5.786 21h4.969a7.995 7.995 0 01-1.173-2H5.786C4.41 19 3.54 17.483 4.26 16.279l6.214-10.41a1.775 1.775 0 013.054 0l1.429 2.395A8.013 8.013 0 0117.128 8l-1.884-3.156zM13 9.07V8a1 1 0 10-2 0v2.708a8.037 8.037 0 012-1.638z"
        fill="#1E1E32"
      />
      <circle cx={17} cy={16} r={6} fill="#1E1E32" />
      <path
        d="M15 15.8l1.429 1.2L19 15"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgExceptionLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
