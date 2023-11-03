import * as React from 'react';

function DeleteKeyValueSearch(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      ref={svgRef}
      {...props}
    >
      <path
        d="M8.29983 1.70016L5 4.99999M1.70017 8.29982L5 4.99999M5 4.99999L1.70017 1.70016L8.29983 8.29982"
        stroke="#1E1E32"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(DeleteKeyValueSearch);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
