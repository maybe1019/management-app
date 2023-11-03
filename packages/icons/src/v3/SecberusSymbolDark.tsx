import * as React from 'react';

function SvgSecberusSymbolDark(
  props: React.SVGProps<SVGSVGElement>,
  svgRef?: React.Ref<SVGSVGElement>
) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.524 15.019v2.052c1.438.283 2.476 1.556 2.476 3.066a3.114 3.114 0 01-2.5 3.066v2.028a6.891 6.891 0 01-5.448 6.745A57.659 57.659 0 0120 33.274c-4.033 0-8.066-.449-12.052-1.298A6.891 6.891 0 012.5 25.231v-2.028A3.138 3.138 0 010 20.137a3.135 3.135 0 012.524-3.066v-2.052a6.891 6.891 0 015.448-6.745 57.636 57.636 0 0124.104 0 6.891 6.891 0 015.448 6.745zm-3.75 10.189V15.042a3.155 3.155 0 00-2.5-3.09A53.55 53.55 0 0020 10.75c-3.774 0-7.547.4-11.274 1.203-1.462.33-2.5 1.604-2.5 3.09V25.207a3.155 3.155 0 002.5 3.09c3.727.802 7.5 1.227 11.274 1.227 3.774 0 7.57-.425 11.274-1.227 1.462-.33 2.5-1.604 2.5-3.09zm-13.257-8.175a3.137 3.137 0 11-1.005 6.193 3.137 3.137 0 011.005-6.193zm-8.132.006a3.137 3.137 0 11-1.005 6.193 3.137 3.137 0 011.005-6.193zm18.895 3.176a3.137 3.137 0 10-6.272-.137 3.137 3.137 0 006.272.137z"
        fill="#fff"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgSecberusSymbolDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
