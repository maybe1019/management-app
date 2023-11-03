import * as React from 'react';

function SvgMsTeamsLight(
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
        d="M15.95 9.977h5.166c.488 0 .884.396.884.883v4.706a3.248 3.248 0 01-3.248 3.248h-.015a3.248 3.248 0 01-3.249-3.247v-5.128c0-.255.207-.462.462-.462zM19.442 9.046a2.093 2.093 0 100-4.186 2.093 2.093 0 000 4.186z"
        fill="#5059C9"
      />
      <path
        d="M12.93 9.047a3.023 3.023 0 100-6.047 3.023 3.023 0 000 6.047zM16.961 9.977H8.434a.874.874 0 00-.853.894v5.367a5.246 5.246 0 005.117 5.367 5.246 5.246 0 005.116-5.367v-5.367a.874.874 0 00-.853-.894z"
        fill="#7B83EB"
      />
      <path
        opacity={0.1}
        d="M13.163 9.977v7.52a.856.856 0 01-.851.852H7.99a5.665 5.665 0 01-.41-2.112V10.87a.873.873 0 01.852-.893h4.73z"
        fill="#000"
      />
      <path
        opacity={0.2}
        d="M12.698 9.977v7.986a.856.856 0 01-.851.851H8.209a6.04 6.04 0 01-.218-.465 5.665 5.665 0 01-.41-2.112V10.87a.873.873 0 01.852-.893h4.265z"
        fill="#000"
      />
      <path
        opacity={0.2}
        d="M12.698 9.977v7.056a.858.858 0 01-.851.85h-4.02a5.664 5.664 0 01-.246-1.646V10.87a.873.873 0 01.852-.893h4.265z"
        fill="#000"
      />
      <path
        opacity={0.2}
        d="M12.232 9.977v7.056a.858.858 0 01-.85.85H7.827a5.664 5.664 0 01-.247-1.646V10.87a.873.873 0 01.852-.893h3.8z"
        fill="#000"
      />
      <path
        opacity={0.1}
        d="M13.163 7.572v1.465c-.08.005-.154.01-.233.01-.079 0-.153-.005-.232-.01a2.555 2.555 0 01-.466-.074 3.023 3.023 0 01-2.092-1.777 2.583 2.583 0 01-.15-.465h2.322c.469.002.849.382.85.851z"
        fill="#000"
      />
      <path
        opacity={0.2}
        d="M12.698 8.037v1a2.553 2.553 0 01-.465-.074 3.023 3.023 0 01-2.094-1.777h1.708c.469.002.849.382.85.851z"
        fill="#000"
      />
      <path
        opacity={0.2}
        d="M12.698 8.037v1a2.553 2.553 0 01-.465-.074 3.023 3.023 0 01-2.094-1.777h1.708c.469.002.849.382.85.851z"
        fill="#000"
      />
      <path
        opacity={0.2}
        d="M12.233 8.037v.926a3.023 3.023 0 01-2.094-1.777h1.242c.47.002.85.382.852.851z"
        fill="#000"
      />
      <path
        d="M2.853 7.186h8.527c.47 0 .852.382.852.853v8.527c0 .47-.381.853-.852.853H2.853A.853.853 0 012 16.566V8.039c0-.471.382-.853.853-.853z"
        fill="url(#MsTeamsLight_svg__paint0_linear_1206_673)"
      />
      <path
        d="M9.36 10.432H7.655v4.642H6.57v-4.642H4.873v-.9H9.36v.9z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="MsTeamsLight_svg__paint0_linear_1206_673"
          x1={3.778}
          y1={6.52}
          x2={10.455}
          y2={18.085}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5A62C3" />
          <stop offset={0.5} stopColor="#4D55BD" />
          <stop offset={1} stopColor="#3940AB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgMsTeamsLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
