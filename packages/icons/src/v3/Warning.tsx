import * as React from 'react';

function SvgWarning(
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
        d="M2.725 21a.973.973 0 01-.85-.5 1.098 1.098 0 01-.138-.488.898.898 0 01.138-.512l9.25-16c.1-.167.23-.292.387-.375.159-.083.321-.125.488-.125.167 0 .33.042.488.125a.983.983 0 01.387.375l9.25 16c.1.167.146.337.137.512a1.099 1.099 0 01-.137.488.974.974 0 01-.85.5H2.725zM12 18c.283 0 .52-.096.713-.288A.968.968 0 0013 17a.968.968 0 00-.287-.712A.968.968 0 0012 16a.967.967 0 00-.713.288A.968.968 0 0011 17c0 .283.096.52.287.712.192.192.43.288.713.288zm0-3c.283 0 .52-.096.713-.287A.968.968 0 0013 14v-3a.968.968 0 00-.287-.713A.968.968 0 0012 10a.967.967 0 00-.713.287A.968.968 0 0011 11v3c0 .283.096.52.287.713.192.191.43.287.713.287z"
        fill="url(#Warning_svg__paint0_linear_28274_129094)"
      />
      <defs>
        <linearGradient
          id="Warning_svg__paint0_linear_28274_129094"
          x1={12}
          y1={3}
          x2={12}
          y2={21}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB1B2E" />
          <stop offset={0.5} stopColor="#DC3545" />
          <stop offset={1} stopColor="#FF8087" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgWarning);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
