import * as React from 'react';

function SvgCaution(
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
        d="M12 17c.283 0 .52-.096.713-.288A.968.968 0 0013 16a.968.968 0 00-.287-.713A.968.968 0 0012 15a.968.968 0 00-.713.287A.968.968 0 0011 16c0 .283.096.52.287.712.192.192.43.288.713.288zm0-4c.283 0 .52-.096.713-.287A.968.968 0 0013 12V8a.967.967 0 00-.287-.713A.968.968 0 0012 7a.968.968 0 00-.713.287A.967.967 0 0011 8v4c0 .283.096.52.287.713.192.191.43.287.713.287zm0 9a9.738 9.738 0 01-3.9-.788 10.099 10.099 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 012 12c0-1.383.263-2.683.788-3.9a10.099 10.099 0 012.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0112 2c1.383 0 2.683.263 3.9.788a10.098 10.098 0 013.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0122 12a9.738 9.738 0 01-.788 3.9 10.098 10.098 0 01-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0112 22z"
        fill="url(#Caution_svg__paint0_linear_28274_129095)"
      />
      <defs>
        <linearGradient
          id="Caution_svg__paint0_linear_28274_129095"
          x1={12}
          y1={22}
          x2={12}
          y2={2}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC385" />
          <stop offset={0.5} stopColor="#F49B3E" />
          <stop offset={1} stopColor="#F1853B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCaution);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
