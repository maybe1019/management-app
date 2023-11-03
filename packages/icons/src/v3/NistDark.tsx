import * as React from 'react';

function SvgNistDark(
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
        d="M0 10.681a1.674 1.674 0 012.857-1.183L6.76 13.78c.034.034.08.055.131.055.1 0 .183-.08.186-.179V9h1.488v4.65a1.674 1.674 0 01-2.857 1.182L1.805 10.55a.185.185 0 00-.138-.055h-.012a.187.187 0 00-.167.186v1.557L1.5 15.33H.013L0 10.68zM9.309 13.65V9h1.488v4.65c0 .102.083.185.185.185h6.323c.207-.012.372-.215.372-.465s-.165-.453-.372-.465h-4.09a1.953 1.953 0 010-3.9V9H24v1.488h-2.604v4.835H19.91v-4.835h-6.695c-.207.011-.372.215-.372.465s.165.453.372.465h4.091v.005a1.953 1.953 0 010 3.9h-6.322c-.924 0-1.674-.75-1.674-1.674z"
        fill="#fff"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgNistDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
