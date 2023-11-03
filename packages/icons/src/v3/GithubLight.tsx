import * as React from 'react';

function SvgGithubLight(
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
      <ellipse cx={12} cy={11.912} rx={10} ry={9.912} fill="#fff" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.475 2 2 6.428 2 11.895c0 4.374 2.867 8.079 6.839 9.391.497.091.68-.213.68-.48 0-.237-.005-.856-.011-1.682-2.781.595-3.37-1.325-3.37-1.325-.455-1.142-1.112-1.451-1.112-1.451-.908-.614.068-.602.068-.602 1 .073 1.535 1.02 1.535 1.02.89 1.513 2.338 1.076 2.91.82.091-.637.35-1.074.632-1.323-2.216-.243-4.55-1.094-4.55-4.884 0-1.081.388-1.962 1.032-2.655-.104-.255-.448-1.257.092-2.618 0 0 .841-.267 2.75 1.015A9.8 9.8 0 0112 6.787a9.837 9.837 0 012.505.334c1.909-1.282 2.75-1.015 2.75-1.015.546 1.36.202 2.37.098 2.618.638.693 1.025 1.574 1.025 2.655 0 3.802-2.339 4.635-4.567 4.884.356.303.681.91.681 1.834 0 1.324-.012 2.387-.012 2.715 0 .268.178.571.688.474C19.139 19.974 22 16.27 22 11.901 22 6.428 17.525 2 12 2z"
        fill="#191717"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgGithubLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
