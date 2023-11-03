import * as React from 'react';

function SvgViolationLight(
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
        clipRule="evenodd"
        d="M9.615 5.357c1.08-1.81 3.69-1.81 4.77 0L20.6 15.766C21.712 17.629 20.376 20 18.214 20H5.786c-2.162 0-3.498-2.37-2.385-4.234L9.615 5.357z"
        stroke="#1E1E32"
        strokeWidth={2}
      />
      <path
        d="M12 13V8"
        stroke="#1E1E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={12}
        cy={16}
        r={0.5}
        transform="rotate(-180 12 16)"
        stroke="#1E1E32"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgViolationLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
