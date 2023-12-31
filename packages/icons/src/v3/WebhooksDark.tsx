import * as React from 'react';

function SvgWebhooksDark(
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
        d="M11.538 10.931c-.832 1.422-1.63 2.798-2.444 4.164-.21.35-.313.637-.146 1.082.461 1.232-.19 2.43-1.412 2.756-1.153.306-2.277-.463-2.506-1.717-.203-1.11.645-2.198 1.85-2.372.101-.014.204-.016.374-.029l1.833-3.121C7.934 10.53 7.248 9.169 7.4 7.484c.107-1.193.569-2.223 1.412-3.067 1.616-1.617 4.081-1.879 5.984-.638 1.827 1.192 2.664 3.514 1.95 5.501l-1.674-.461c.224-1.105.058-2.097-.676-2.947-.485-.561-1.107-.855-1.814-.964-1.418-.217-2.81.708-3.224 2.121-.469 1.605.24 2.915 2.18 3.902z"
        fill="#C73A63"
      />
      <path
        d="M13.73 9.314l1.775 3.178c2.988-.938 5.24.74 6.05 2.538.976 2.171.308 4.743-1.61 6.083-1.967 1.375-4.456 1.14-6.2-.626l1.368-1.162c1.723 1.132 3.229 1.079 4.347-.262a3.077 3.077 0 00-.048-3.969c-1.133-1.292-2.65-1.332-4.483-.091-.76-1.37-1.534-2.728-2.27-4.108-.249-.465-.523-.734-1.083-.833-.935-.164-1.538-.98-1.574-1.892-.036-.903.488-1.719 1.307-2.037a2.02 2.02 0 012.309.64c.446.572.588 1.216.353 1.921-.065.197-.15.387-.241.62z"
        fill="#4B4B4B"
      />
      <path
        d="M15.075 17.858h-3.568c-.342 1.494-1.081 2.7-2.354 3.467a4.524 4.524 0 01-3.191.603c-2.09-.358-3.8-2.355-3.95-4.605-.17-2.549 1.48-4.814 3.678-5.323l.457 1.76c-2.017 1.093-2.715 2.47-2.15 4.193.496 1.515 1.908 2.346 3.441 2.024 1.566-.328 2.355-1.71 2.259-3.927 1.484 0 2.97-.016 4.454.008.58.01 1.027-.054 1.463-.596.72-.893 2.042-.813 2.816.03.792.863.754 2.249-.084 3.074a1.936 1.936 0 01-2.84-.104c-.155-.177-.277-.387-.43-.604z"
        fill="#4A4A4A"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgWebhooksDark);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
