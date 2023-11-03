import * as React from 'react';

function SvgSort(
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
        d="M15.899 10.074c-.207.56-.693.926-1.232.926H9.333c-.539 0-1.025-.366-1.231-.926-.207-.56-.093-1.206.289-1.635l2.666-3c.52-.585 1.365-.585 1.886 0l2.666 3c.382.43.496 1.075.29 1.635zM8.102 13.926c.206-.56.692-.926 1.231-.926h5.334c.539 0 1.025.366 1.232.926.206.56.092 1.206-.29 1.635l-2.666 3c-.52.585-1.365.585-1.886 0l-2.666-3c-.382-.43-.496-1.075-.29-1.635z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSort);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
