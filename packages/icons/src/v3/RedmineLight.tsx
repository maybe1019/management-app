import * as React from 'react';

function SvgRedmineLight(
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
        d="M1.739 19h4.454l.319-3.818-4.137-.955L1.74 19zM2.534 13.59l3.978.955.954-3.34-3.34-1.75-1.592 4.136zM4.443 8.818l3.182 1.75 2.546-1.75-2.387-2.704-3.34 2.704zM22.261 19h-4.454l-.319-3.818 4.137-.955.636 4.773zM21.466 13.59l-3.978.955-.954-3.34 3.34-1.75 1.592 4.136zM19.557 8.818l-3.182 1.75-2.545-1.75 2.386-2.704 3.34 2.704zM8.58 5.636L10.966 8.5h2.227l2.069-2.864L13.192 5H10.91l-2.33.636z"
        fill="#4C4C4C"
      />
      <path d="M1.739 19h4.454l.319-3.818-4.137-.955L1.74 19z" fill="#9C0000" />
      <path
        d="M2.534 13.59l3.978.955.954-3.34-3.34-1.75-1.592 4.136z"
        fill="#B50808"
      />
      <path
        d="M4.443 8.818l3.182 1.75 2.546-1.75-2.387-2.704-3.34 2.704z"
        fill="#C61818"
      />
      <path
        d="M22.261 19h-4.454l-.319-3.818 4.137-.955.636 4.773z"
        fill="#9C0000"
      />
      <path
        d="M21.466 13.59l-3.978.955-.954-3.34 3.34-1.75 1.592 4.136z"
        fill="#B50808"
      />
      <path
        d="M19.557 8.818l-3.182 1.75-2.545-1.75 2.386-2.704 3.34 2.704z"
        fill="#C61818"
      />
      <path
        d="M8.58 5.636L10.966 8.5h2.227l2.069-2.864L13.192 5H10.91l-2.33.636z"
        fill="#CE3129"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgRedmineLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
