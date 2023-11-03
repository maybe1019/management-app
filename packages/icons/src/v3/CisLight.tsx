import * as React from 'react';

function SvgCisLight(
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
        d="M16.172 15.288c-.52 0-1.155-.049-1.606-.196v-.166c0-.46-.02-.802-.039-1.086h.196c.04.293.166.538.372.695.264.215.627.313.969.313 1.262 0 1.272-.842 1.272-1.038 0-.655-.411-.87-.94-1.213l-.548-.352c-.675-.44-1.164-.91-1.164-1.801 0-.45.235-1.713 2.27-1.713.89 0 1.273.088 1.498.108-.03.127-.02.509-.02.528 0 .392.02.588.02.695h-.206a.915.915 0 00-.264-.587c-.255-.254-.685-.313-.998-.313-1.008 0-1.126.587-1.126.92 0 .509.294.753.822 1.076l.627.382c.783.48 1.272.89 1.272 1.879 0 1.252-.979 1.869-2.407 1.869zm-3.024-6.126c-.166.186-.186.46-.186 1.302v3.366c0 .616.03.832.127.978.02.03.147.216.5.245v.176a30.468 30.468 0 00-2.632 0v-.176a.66.66 0 00.478-.215c.166-.186.176-.46.176-1.302V10.17c0-.617-.019-.832-.117-.979-.02-.029-.147-.215-.509-.244V8.77a30.444 30.444 0 002.633 0v.177a.655.655 0 00-.47.215zm-3.327.9a.703.703 0 00-.264-.567c-.303-.264-.822-.313-1.125-.313-.862 0-2.183.185-2.183 2.847 0 1.634.558 2.77 2.212 2.77.352 0 .832-.05 1.096-.362.127-.137.205-.333.205-.597h.196c-.02.284-.04.587-.04 1.047v.166c-.44.147-1.144.215-1.653.215-1.233 0-2.26-.352-2.867-1.105-.391-.49-.617-1.165-.617-2.016 0-1.693.96-2.76 2.212-3.21.499-.176 1.116-.215 1.488-.215.753 0 1.448.107 1.536.107-.02.186-.02.411-.02.607 0 .254.01.499.02.626H9.82z"
        fill="#003A5D"
      />
      <path
        d="M19.798 14.561h.023c.102 0 .143-.02.143-.08 0-.054-.041-.067-.143-.067h-.023v.147zm-.166-.284h.22c.157 0 .285.038.285.195 0 .076-.041.14-.125.153v.007a.112.112 0 01.07.066l.113.246h-.192l-.087-.204c-.018-.038-.032-.054-.099-.054h-.019v.258h-.166v-.668zm-.227.345c0 .262.211.473.47.473s.47-.211.47-.476a.47.47 0 00-.94.003zm1.032 0a.563.563 0 11-1.124.005.563.563 0 011.125-.005z"
        fill="#0083C1"
      />
      <path
        d="M0 12c0 6.614 5.381 11.996 11.995 11.996.424 0 .849-.014 1.26-.067l-.054-.556c-.397.04-.795.066-1.206.066C5.686 23.439.557 18.323.557 12 .557 5.678 5.687.562 11.995.562c.411 0 .809.026 1.206.066l.053-.557a9.89 9.89 0 00-1.259-.066C5.381.005 0 5.386 0 12z"
        fill="url(#CisLight_svg__paint0_linear_1212_99)"
      />
      <path
        d="M2.253 12a9.542 9.542 0 00.588 3.335l.529-.193a9.141 9.141 0 01-.554-3.146c.002-5.068 4.115-9.185 9.183-9.182a9.171 9.171 0 017.038 3.283l.431-.362a9.726 9.726 0 00-7.466-3.488c-5.386.002-9.75 4.368-9.749 9.754z"
        fill="url(#CisLight_svg__paint1_linear_1212_99)"
      />
      <defs>
        <linearGradient
          id="CisLight_svg__paint0_linear_1212_99"
          x1={0}
          y1={12}
          x2={13.254}
          y2={12}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.505} stopColor="#0083C1" />
          <stop offset={1} stopColor="#0083C1" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="CisLight_svg__paint1_linear_1212_99"
          x1={7.125}
          y1={3.556}
          x2={11.204}
          y2={10.619}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.24} stopColor="#0083C1" />
          <stop offset={0.505} stopColor="#0083C1" />
          <stop offset={1} stopColor="#0083C1" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgCisLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
