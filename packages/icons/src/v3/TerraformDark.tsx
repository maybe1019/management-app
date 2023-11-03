import * as React from 'react';

function SvgTerraformDark(
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
        d="M15.788 8.595v7.17L22 12.182V5.004l-6.212 3.59zM8.894 5.004l6.212 3.59v7.171l-6.212-3.587V5.004zM2 1v7.174l6.212 3.587V4.587L2 1zm6.894 19.14l6.212 3.587v-7.174l-6.212-3.587v7.174z"
        fill="#fff"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTerraformDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
