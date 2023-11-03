import * as React from 'react';

function SvgServicenowLight(
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
        d="M12.06 3a10.104 10.104 0 00-9.34 6.337A10.104 10.104 0 005.107 20.37c.71.678 1.807.735 2.583.135a7.2 7.2 0 018.578 0 1.99 1.99 0 002.623-.135A10.09 10.09 0 0022 13.086C22 7.608 17.538 3.08 12.06 3zm-.056 15.089a4.668 4.668 0 01-.159.002c-2.68 0-4.885-2.205-4.885-4.885 0-.042 0-.084.002-.126a5.015 5.015 0 1110.023 0 4.879 4.879 0 01-5.009 5.009"
        fill="#81B5A1"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgServicenowLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
