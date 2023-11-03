import * as React from 'react';

function SvgGoogleCloudPlatformLight(
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
      <g clipPath="url(#GoogleCloudPlatformLight_svg__clip0_942_109)">
        <path
          d="M14.69 8.43h.61l1.74-1.738.085-.737a7.817 7.817 0 00-12.712 3.81.947.947 0 01.61-.037L8.5 9.155s.176-.293.268-.274a4.339 4.339 0 015.935-.451h-.012z"
          fill="#EA4335"
        />
        <path
          d="M19.516 9.765a7.827 7.827 0 00-2.36-3.805L14.715 8.4a4.333 4.333 0 011.592 3.439v.433a2.17 2.17 0 110 4.34h-4.344l-.433.44v2.603l.433.433h4.344a5.65 5.65 0 005.438-3.97 5.647 5.647 0 00-2.23-6.352z"
          fill="#4285F4"
        />
        <path
          d="M7.615 20.063h4.344v-3.475H7.615c-.31 0-.615-.066-.897-.195l-.61.188-1.75 1.738-.153.61a5.624 5.624 0 003.41 1.134z"
          fill="#34A853"
        />
        <path
          d="M7.615 8.79a5.645 5.645 0 00-3.41 10.12l2.52-2.518a2.17 2.17 0 111.788-3.956c.481.218.867.603 1.085 1.084l2.519-2.518A5.647 5.647 0 007.615 8.79z"
          fill="#FBBC05"
        />
      </g>
      <defs>
        <clipPath id="GoogleCloudPlatformLight_svg__clip0_942_109">
          <path fill="#fff" transform="translate(2 4)" d="M0 0h20v16.087H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgGoogleCloudPlatformLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
