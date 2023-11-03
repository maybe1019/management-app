import * as React from 'react';

function SvgCaretRight(
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.926 15.899c-.56-.207-.926-.693-.926-1.232V9.333c0-.539.365-1.025.926-1.231.56-.207 1.206-.093 1.635.289l3 2.666c.585.52.585 1.365 0 1.886l-3 2.666c-.43.382-1.075.496-1.635.29z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCaretRight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
