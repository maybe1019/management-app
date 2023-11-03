import * as React from 'react';

function SvgFedRampLight(
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
      <g clipPath="url(#FedRampLight_svg__clip0_1217_49)">
        <path
          d="M2.568 17.062c7.65-.438 13.598-4.52 19.416-8.898L20.603 5.27C15.493 10.95 9.898 16.195 2.568 17.062zm.458 1.136c7.364.665 13.761-1.801 19.968-5.126l-.664-2.593c-5.854 4.765-12.044 7.93-19.304 7.72z"
          fill="url(#FedRampLight_svg__paint0_radial_1217_49)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.562 5.32C7.277 1.155 13.706.65 18.055 4.128c-2.94 3.822-6.356 7.635-10.554 9.736-1.954.977-3.796 1.349-5.873 1.618A9.98 9.98 0 013.562 5.32zM19.79 18.107c-.15.195-.309.386-.476.574-3.782 4.24-10.377 4.688-14.727 1l-.143-.123c5.354 1.17 10.37.16 15.346-1.451z"
          fill="url(#FedRampLight_svg__paint1_radial_1217_49)"
        />
      </g>
      <defs>
        <radialGradient
          id="FedRampLight_svg__paint0_radial_1217_49"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(8.63313 0 0 8.41769 12.781 11.789)"
        >
          <stop stopColor="#D41F38" />
          <stop offset={1} stopColor="#B9292F" />
        </radialGradient>
        <radialGradient
          id="FedRampLight_svg__paint1_radial_1217_49"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(5.96713 -.62142 1.28132 12.30376 22.542 7.736)"
        >
          <stop stopColor="#1C3E74" />
          <stop offset={1} stopColor="#0D2043" />
        </radialGradient>
        <clipPath id="FedRampLight_svg__clip0_1217_49">
          <path fill="#fff" transform="translate(1 1)" d="M0 0h22v22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFedRampLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
