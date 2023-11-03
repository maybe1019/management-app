import * as React from 'react';

function SvgSettings(
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
        clipRule="evenodd"
        d="M14 4c0 .084-.005.167-.015.248a7.992 7.992 0 013.735 2.158 2 2 0 111.986 3.437c.192.686.294 1.41.294 2.157 0 .747-.102 1.471-.294 2.157a2 2 0 11-1.986 3.436 7.992 7.992 0 01-3.735 2.159 2 2 0 11-3.97 0 7.992 7.992 0 01-3.734-2.158 2 2 0 11-1.986-3.436A8.007 8.007 0 014 12c0-.747.102-1.47.294-2.157A2 2 0 116.28 6.406a7.992 7.992 0 013.735-2.158A2 2 0 1114 4zm-2 12a4 4 0 100-8 4 4 0 000 8z"
        stroke={props.color || '#1E1E32'}
        strokeWidth={2}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSettings);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
