import * as React from 'react';

function SvgCaretDownLight(
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
        d="M8.102 9.926C8.308 9.366 8.794 9 9.333 9h5.334c.539 0 1.025.365 1.232.926.206.56.092 1.206-.29 1.635l-2.666 3c-.52.585-1.365.585-1.886 0l-2.666-3c-.382-.43-.496-1.075-.29-1.635z"
        fill="#1E1E32"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCaretDownLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
