import * as React from 'react';

function SvgAzureDark(
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
        d="M8.965 3.427h5.41L8.76 20.064a.863.863 0 01-.818.587h-4.21a.861.861 0 01-.815-1.136L8.148 4.014a.862.862 0 01.817-.587z"
        fill="url(#AzureDark_svg__paint0_linear_2905_2433)"
      />
      <path
        d="M16.826 14.586H8.248a.397.397 0 00-.27.688l5.511 5.144c.16.15.372.233.591.233h4.857l-2.111-6.065z"
        fill="#0078D4"
      />
      <path
        d="M8.965 3.427a.856.856 0 00-.819.598L2.923 19.5a.86.86 0 00.812 1.151h4.318a.924.924 0 00.709-.603l1.041-3.07 3.721 3.471a.88.88 0 00.554.202h4.839l-2.123-6.065-6.186.002 3.786-11.161H8.965z"
        fill="#6A6A88"
      />
      <path
        d="M15.874 4.013a.861.861 0 00-.816-.586H9.03a.861.861 0 01.816.586l5.232 15.501a.86.86 0 01-.816 1.137h6.028a.862.862 0 00.816-1.137L15.874 4.013z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="AzureDark_svg__paint0_linear_2905_2433"
          x1={10.937}
          y1={4.703}
          x2={5.319}
          y2={21.299}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#114A8B" />
          <stop offset={1} stopColor="#0669BC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgAzureDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;