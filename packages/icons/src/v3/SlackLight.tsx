import * as React from 'react';

function SvgSlackLight(
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
        d="M6.217 14.643a2.1 2.1 0 11-4.2 0c0-1.162.938-2.102 2.1-2.102h2.1v2.102zm1.05 0a2.099 2.099 0 114.2 0v5.255a2.1 2.1 0 11-4.2 0v-5.255z"
        fill="#E01E5A"
      />
      <path
        d="M9.367 6.204a2.1 2.1 0 01-2.1-2.102 2.1 2.1 0 114.2 0v2.102h-2.1zm0 1.067c1.161 0 2.1.94 2.1 2.102a2.1 2.1 0 01-2.1 2.101H4.1A2.1 2.1 0 012 9.372c0-1.162.939-2.101 2.1-2.101h5.267z"
        fill="#36C5F0"
      />
      <path
        d="M17.784 9.373a2.1 2.1 0 114.2 0 2.1 2.1 0 01-2.1 2.101h-2.1V9.372zm-1.05 0a2.1 2.1 0 11-4.2 0V4.101a2.099 2.099 0 114.2 0v5.27z"
        fill="#2EB67D"
      />
      <path
        d="M14.633 17.796a2.1 2.1 0 012.1 2.102 2.1 2.1 0 11-4.2 0v-2.102h2.1zm0-1.05a2.1 2.1 0 01-2.1-2.103c0-1.162.939-2.102 2.1-2.102H19.9a2.1 2.1 0 012.1 2.102 2.1 2.1 0 01-2.1 2.102h-5.267z"
        fill="#ECB22E"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSlackLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
