import * as React from 'react';

function SvgCategoryViewLight(
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
        d="M18 16a2 2 0 11-4 0 2 2 0 014 0zM10 16a2 2 0 11-4 0 2 2 0 014 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM10 8a2 2 0 11-4 0 2 2 0 014 0z"
        fill="#1E1E32"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCategoryViewLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
