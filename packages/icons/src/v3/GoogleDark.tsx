import * as React from 'react';

function SvgGoogleDark(
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
        d="M6.687 12c0-.99.273-1.92.748-2.714V5.915H4.063A9.924 9.924 0 002 12c0 2.23.725 4.348 2.063 6.085h3.372v-3.371A5.28 5.28 0 016.687 12zM12 17.312l-2.344 2.344L12 22c2.23 0 4.348-.725 6.085-2.064V16.57h-3.368a5.312 5.312 0 01-2.717.743z"
        fill="#fff"
      />
      <path
        d="M7.435 14.714l-3.372 3.371c.265.345.554.674.866.986A9.935 9.935 0 0012 22v-4.688a5.314 5.314 0 01-4.565-2.598zM22 12c0-.608-.055-1.218-.164-1.812l-.088-.48H12v4.687h4.744a5.288 5.288 0 01-2.027 2.174l3.368 3.367c.344-.264.674-.553.986-.865A9.935 9.935 0 0022 12zM15.757 8.243l.414.415 3.314-3.315-.414-.414A9.935 9.935 0 0012 2L9.656 4.344 12 6.687c1.419 0 2.753.553 3.757 1.556z"
        fill="#fff"
      />
      <path
        d="M12 6.688V2a9.935 9.935 0 00-7.071 2.929c-.312.312-.6.642-.866.986l3.372 3.371A5.315 5.315 0 0112 6.688z"
        fill="#fff"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgGoogleDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
