import * as React from 'react';

function SvgUpdate(
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
        d="M13 11.6l2.5 2.5a.948.948 0 01.275.7.948.948 0 01-.275.7.948.948 0 01-.7.275.948.948 0 01-.7-.275l-2.8-2.8a1.03 1.03 0 01-.3-.725V8c0-.283.096-.521.288-.713A.967.967 0 0112 7a.97.97 0 01.713.287A.97.97 0 0113 8v3.6zM12 21c-1.25 0-2.42-.237-3.512-.712a9.142 9.142 0 01-2.85-1.926 9.143 9.143 0 01-1.926-2.85A8.709 8.709 0 013 12c0-1.25.237-2.421.712-3.513a9.159 9.159 0 011.926-2.85 9.152 9.152 0 012.85-1.925A8.709 8.709 0 0112 3c1.367 0 2.663.292 3.888.875A8.733 8.733 0 0119 6.35V5c0-.283.096-.521.288-.713A.967.967 0 0120 4c.283 0 .52.096.712.287.192.192.288.43.288.713v4c0 .283-.096.52-.288.712A.965.965 0 0120 10h-4a.965.965 0 01-.712-.288A.965.965 0 0115 9c0-.283.096-.521.288-.713A.967.967 0 0116 8h1.75a7.431 7.431 0 00-2.525-2.2A6.75 6.75 0 0012 5c-1.95 0-3.604.679-4.962 2.037C5.679 8.396 5 10.05 5 12c0 1.95.68 3.604 2.038 4.962C8.396 18.321 10.05 19 12 19c1.533 0 2.921-.45 4.163-1.35a6.573 6.573 0 002.512-3.55c.083-.283.238-.521.463-.713a.825.825 0 01.762-.187c.3.067.52.233.662.5.142.267.171.55.088.85-.55 1.917-1.625 3.47-3.225 4.662C15.825 20.404 14.017 21 12 21z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgUpdate);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;