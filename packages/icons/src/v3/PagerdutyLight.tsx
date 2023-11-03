import * as React from 'react';

function SvgPagerdutyLight(
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
        d="M8.608 16.207H6V21h2.608v-4.793zM15.794 3.885C14.404 3.123 13.429 3 11.146 3H6v10.913h5.125c2.03 0 3.553-.123 4.892-1.028 1.462-.978 2.223-2.613 2.223-4.506 0-2.036-.934-3.672-2.446-4.494zm-4.07 7.745H8.608V5.335l2.944-.02c2.679-.021 4.019.925 4.019 3.095 0 2.335-1.665 3.22-3.847 3.22z"
        fill="#06AC38"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPagerdutyLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
