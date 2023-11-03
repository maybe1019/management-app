import * as React from 'react';

function SvgFolderOpen(
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
        d="M3.5 20c-.383 0-.73-.154-1.038-.462C2.155 19.229 2 18.883 2 18.5v-13c0-.383.154-.73.462-1.037C2.772 4.154 3.117 4 3.5 4h6.4c.207 0 .405.042.593.125.188.083.35.192.484.327L12.025 5.5H20.5c.383 0 .73.154 1.038.463.308.308.462.654.462 1.037H11.375l-1.5-1.5H3.5v13l2.25-8.875c.083-.333.265-.604.546-.813.28-.208.59-.312.929-.312H21.55c.483 0 .883.192 1.2.575.317.383.408.817.275 1.3l-2.2 8.475c-.1.4-.283.692-.55.875-.267.183-.608.275-1.025.275H3.5zm1.575-1.5h14.3l2.1-8.5h-14.3l-2.1 8.5z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFolderOpen);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
