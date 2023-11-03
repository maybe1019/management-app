import * as React from 'react';

function SvgServiceDisabled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.667 15h12.666a1 1 0 00.883-1.47L8.882 1.653a1 1 0 00-1.764 0L.784 13.53A1 1 0 001.667 15zM7 7a1 1 0 112 0v2a1 1 0 11-2 0V7zm1 6a1 1 0 100-2 1 1 0 000 2z"
        fill="#606468"
      />
    </svg>
  );
}

export default SvgServiceDisabled;
