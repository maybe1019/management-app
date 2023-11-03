import * as React from 'react';

function SvgPolicyLight(
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
        d="M4 7.169v6.239c0 4.409 4.505 5.514 7.115 7.322.52.36 1.25.36 1.77 0C15.495 18.922 20 17.817 20 13.408v-6.24c0-1.323-1.106-2.353-2.412-2.478a14.64 14.64 0 01-.341-.036C15.483 4.444 13.76 3.912 12 3c-1.76.912-3.482 1.444-5.247 1.654l-.34.036C5.105 4.815 4 5.845 4 7.17z"
        stroke="#1E1E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.4l1.714 1.6L15 10"
        stroke="#1E1E32"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPolicyLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
