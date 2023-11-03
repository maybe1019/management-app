import * as React from 'react';

function SvgSeverityDotCritical(
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
      <circle
        cx={12}
        cy={12}
        r={5}
        fill="url(#SeverityDotCritical_svg__paint0_linear_931_2096)"
      />
      <defs>
        <linearGradient
          id="SeverityDotCritical_svg__paint0_linear_931_2096"
          x1={12}
          y1={7}
          x2={12}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8E01B0" />
          <stop offset={0.5} stopColor="#B41EFF" />
          <stop offset={1} stopColor="#CE6DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSeverityDotCritical);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
