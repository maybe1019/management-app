import * as React from 'react';

function SvgCopy(
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
      <mask id="Copy_svg__a" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 5h10.727v1.273H8.273a2 2 0 00-2 2v7.454H5V5zm1.273 12.727H5a2 2 0 01-2-2V5a2 2 0 012-2h10.727a2 2 0 012 2v1.273H19a2 2 0 012 2V19a2 2 0 01-2 2H8.273a2 2 0 01-2-2v-1.273z"
        />
      </mask>
      <path
        d="M15.727 5h2V3h-2v2zM5 5V3H3v2h2zm10.727 1.273v2h2v-2h-2zm-9.454 9.454v2h2v-2h-2zm-1.273 0H3v2h2v-2zm1.273 2h2v-2h-2v2zM17.727 6.273h-2v2h2v-2zm-2-3.273H5v4h10.727V3zm2 3.273V5h-4v1.273h4zm-9.454 2h7.454v-4H8.273v4zm0 0v-4a4 4 0 00-4 4h4zm0 7.454V8.273h-4v7.454h4zm-3.273 2h1.273v-4H5v4zM3 5v10.727h4V5H3zm2 14.727h1.273v-4H5v4zm-4-4a4 4 0 004 4v-4H1zM1 5v10.727h4V5H1zm4-4a4 4 0 00-4 4h4V1zm10.727 0H5v4h10.727V1zm4 4a4 4 0 00-4-4v4h4zm0 1.273V5h-4v1.273h4zm-2 2H19v-4h-1.273v4zm1.273 0h4a4 4 0 00-4-4v4zm0 0V19h4V8.273h-4zM19 19v4a4 4 0 004-4h-4zm0 0H8.273v4H19v-4zM8.273 19h-4a4 4 0 004 4v-4zm0 0v-1.273h-4V19h4z"
        fill={props.color || '#1E1E32'}
        mask="url(#Copy_svg__a)"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCopy);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
