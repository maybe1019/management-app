import * as React from 'react';

function SvgTune(
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
        d="M3.75 18.95a.723.723 0 01-.534-.217.732.732 0 01-.216-.537.731.731 0 01.75-.746h4.675c.212 0 .39.072.534.217a.732.732 0 01.216.537.731.731 0 01-.75.746H3.75zm0-12.4a.724.724 0 01-.534-.217A.732.732 0 013 5.796a.731.731 0 01.75-.746h8.825c.213 0 .39.072.534.217a.732.732 0 01.216.537.731.731 0 01-.75.746H3.75zM11.42 21a.731.731 0 01-.746-.75v-4.125c.001-.213.073-.39.218-.534a.732.732 0 01.537-.216.731.731 0 01.746.75v1.325h8.075c.212 0 .39.072.534.217a.732.732 0 01.216.537.731.731 0 01-.75.746h-8.075v1.3c0 .212-.072.39-.217.534a.732.732 0 01-.537.216zm-3-6.2a.731.731 0 01-.746-.75v-1.3H3.751a.723.723 0 01-.534-.217.732.732 0 01-.216-.537.731.731 0 01.75-.746h3.925V9.9c0-.213.072-.39.217-.534a.732.732 0 01.537-.216.731.731 0 01.746.75v4.15c0 .212-.072.39-.217.534a.732.732 0 01-.537.216zm3.005-2.05a.724.724 0 01-.534-.217.732.732 0 01-.216-.537.731.731 0 01.75-.746h8.825c.212 0 .39.072.534.217a.732.732 0 01.216.537.731.731 0 01-.75.746h-8.825zm4.146-4.125a.731.731 0 01-.746-.75V3.75c0-.212.072-.39.217-.534A.732.732 0 0115.579 3a.731.731 0 01.746.75v1.3h3.925c.212 0 .39.072.534.217a.732.732 0 01.216.537.731.731 0 01-.75.746h-3.925v1.325c0 .213-.072.39-.217.534a.732.732 0 01-.537.216z"
        fill={props.color || '#1E1E32'}
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgTune);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
