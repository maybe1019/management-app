import * as React from 'react';

function SvgJiraDark(
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
        d="M21.76 11.421l-8.898-8.898L12 1.66l-9.76 9.76a.819.819 0 000 1.157l6.12 6.12L12 22.339l9.76-9.76a.819.819 0 000-1.158zM12 15.057L8.943 12 12 8.943 15.057 12 12 15.056z"
        fill="#fff"
      />
      <path
        d="M12 8.943a5.148 5.148 0 01-.022-7.258l-6.69 6.687 3.642 3.641L12 8.943z"
        fill="url(#JiraDark_svg__paint0_linear_2905_2438)"
      />
      <path
        d="M15.065 11.992L12 15.056a5.148 5.148 0 010 7.283l6.706-6.706-3.64-3.641z"
        fill="url(#JiraDark_svg__paint1_linear_2905_2438)"
      />
      <defs>
        <linearGradient
          id="JiraDark_svg__paint0_linear_2905_2438"
          x1={10.686}
          y1={6.619}
          x2={7.185}
          y2={10.118}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9D9DB1" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id="JiraDark_svg__paint1_linear_2905_2438"
          x1={13.351}
          y1={17.347}
          x2={16.845}
          y2={13.854}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9D9DB1" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgJiraDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
