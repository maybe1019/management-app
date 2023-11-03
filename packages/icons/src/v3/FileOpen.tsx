import * as React from 'react';

function SvgFileOpen(
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
        d="M5.5 22c-.4 0-.75-.15-1.05-.45-.3-.3-.45-.65-.45-1.05v-17c0-.4.15-.75.45-1.05.3-.3.65-.45 1.05-.45h7.875c.207 0 .405.042.593.125.188.083.349.192.482.325l5.1 5.1c.133.133.242.294.325.482.083.188.125.386.125.593v6.125h-1.5V9h-4.75a.726.726 0 01-.534-.216A.726.726 0 0113 8.25V3.5H5.5v17h10.25V22H5.5zm15.9-.525l-2.65-2.65V21.2c0 .213-.072.39-.217.534a.732.732 0 01-.537.216.731.731 0 01-.746-.75V17c0-.212.072-.39.216-.534A.726.726 0 0118 16.25h4.2c.213 0 .39.072.534.217a.732.732 0 01.216.537.731.731 0 01-.75.746h-2.4l2.675 2.675c.15.15.225.326.225.529a.727.727 0 01-.215.525.773.773 0 01-1.085-.004z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgFileOpen);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
