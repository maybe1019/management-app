import * as React from 'react';

function SvgServiceError(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.536-4.879L5.879 4.464 4.464 5.88l5.657 5.657 1.415-1.415z"
        fill="#D92D0B"
      />
    </svg>
  );
}

export default SvgServiceError;
