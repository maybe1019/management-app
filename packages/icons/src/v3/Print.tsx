import * as React from 'react';

function SvgPrint(
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
      <g
        clipPath="url(#Print_svg__clip0_18281_107351)"
        fill={props.color || '#1E1E32'}
      >
        <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
        <path d="M18 12.5a1 1 0 100-2 1 1 0 000 2z" />
      </g>
      <defs>
        <clipPath id="Print_svg__clip0_18281_107351">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgPrint);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
