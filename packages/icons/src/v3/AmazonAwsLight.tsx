import * as React from 'react';

function SvgAmazonAwsLight(
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
        d="M7.636 11.358c0 .247.027.447.073.594.06.165.13.326.213.48a.29.29 0 01.047.154c0 .067-.04.134-.127.2l-.419.28c-.06.04-.12.06-.173.06-.066 0-.133-.033-.2-.093a2.067 2.067 0 01-.239-.313 5.14 5.14 0 01-.206-.394c-.519.614-1.17.92-1.955.92-.56 0-1.005-.16-1.33-.48-.327-.32-.493-.747-.493-1.281 0-.567.2-1.028.605-1.375.406-.347.945-.52 1.63-.52.226 0 .459.02.705.053.246.033.499.087.765.147v-.487c0-.508-.106-.861-.313-1.068-.212-.207-.572-.307-1.084-.307-.233 0-.472.026-.718.086s-.486.134-.719.227a1.91 1.91 0 01-.232.087.405.405 0 01-.107.02c-.093 0-.14-.067-.14-.207v-.327c0-.107.014-.187.047-.233a.498.498 0 01.186-.14c.233-.12.512-.22.838-.3a4.021 4.021 0 011.038-.128c.792 0 1.37.18 1.743.541.366.36.552.908.552 1.642v2.162h.013zm-2.7 1.015c.22 0 .445-.04.685-.12.24-.08.452-.228.632-.428.106-.126.186-.267.226-.427.04-.16.066-.354.066-.58v-.28a5.55 5.55 0 00-.612-.114 5.008 5.008 0 00-.625-.04c-.446 0-.772.086-.991.267-.22.18-.326.434-.326.767 0 .314.08.548.246.708.16.167.393.247.699.247zm5.341.72c-.12 0-.2-.02-.253-.066-.053-.04-.1-.134-.14-.26l-1.563-5.16c-.04-.133-.06-.22-.06-.267 0-.106.054-.167.16-.167h.652c.126 0 .213.02.26.067.053.04.093.134.132.26l1.118 4.419L11.62 7.5c.033-.134.073-.22.126-.26a.457.457 0 01.266-.067h.532c.127 0 .213.02.266.066.054.04.1.134.127.26l1.05 4.472 1.151-4.471c.04-.134.087-.22.133-.26a.433.433 0 01.26-.067h.618c.107 0 .167.053.167.166 0 .034-.007.067-.014.107a.947.947 0 01-.046.167l-1.603 5.159c-.04.134-.087.22-.14.26a.424.424 0 01-.253.067h-.572c-.126 0-.213-.02-.266-.067-.053-.046-.1-.133-.126-.267l-1.031-4.304-1.025 4.298c-.033.133-.073.22-.126.267-.053.046-.146.066-.266.066h-.572zm8.548.18c-.346 0-.692-.04-1.025-.12-.332-.08-.592-.166-.765-.266-.106-.06-.18-.127-.206-.187a.472.472 0 01-.04-.187v-.34c0-.14.053-.207.153-.207.04 0 .081.006.12.02.04.013.1.04.166.066.235.104.48.182.732.234.26.053.525.08.791.08.42 0 .745-.073.972-.22a.72.72 0 00.346-.634c0-.187-.06-.34-.18-.468-.12-.126-.346-.24-.672-.347l-.964-.3c-.486-.153-.845-.38-1.065-.68a1.594 1.594 0 01-.332-.968c0-.28.06-.528.18-.741.119-.214.279-.4.478-.547.2-.154.426-.267.692-.348A2.89 2.89 0 0119.044 7c.146 0 .3.007.446.027.153.02.292.046.432.073.133.033.26.067.38.107.119.04.212.08.279.12.093.053.16.107.2.167a.36.36 0 01.06.22v.314c0 .14-.054.213-.154.213a.69.69 0 01-.253-.08 3.035 3.035 0 00-1.277-.26c-.379 0-.678.06-.885.187-.206.127-.312.32-.312.594 0 .187.066.347.2.474.132.126.378.253.731.367l.945.3c.479.154.824.367 1.03.64.207.275.307.588.307.935 0 .287-.06.547-.173.774-.12.227-.28.428-.486.588a2.141 2.141 0 01-.738.373c-.3.094-.612.14-.951.14z"
        fill="#252F3E"
      />
      <path
        d="M20.082 16.517C17.893 18.14 14.714 19 11.98 19c-3.832 0-7.284-1.422-9.891-3.784-.207-.187-.02-.44.226-.294 2.82 1.642 6.299 2.636 9.898 2.636 2.428 0 5.095-.507 7.55-1.548.365-.167.678.24.319.507zm.911-1.04c-.28-.361-1.85-.174-2.56-.088-.214.027-.247-.16-.054-.3 1.25-.88 3.306-.627 3.545-.334.24.3-.066 2.363-1.237 3.35-.18.154-.353.074-.273-.126.266-.66.858-2.15.579-2.503z"
        fill="#F90"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgAmazonAwsLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;