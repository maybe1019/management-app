import * as React from 'react';

function SvgGitlabLight(
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
        d="M21.963 12.93l-1.12-3.246-2.217-6.437a.363.363 0 00-.14-.179.4.4 0 00-.448 0 .363.363 0 00-.14.179L15.683 9.68H8.316L6.099 3.247a.363.363 0 00-.14-.179.399.399 0 00-.447 0 .363.363 0 00-.14.179L3.16 9.68l-1.12 3.25a.68.68 0 000 .443c.049.144.146.27.276.36L12 20.365l9.683-6.632a.724.724 0 00.278-.36.68.68 0 00.002-.444z"
        fill="#FC6D26"
      />
      <path d="M12 20.36l3.683-10.68H8.319L12 20.36z" fill="#E24329" />
      <path d="M12 20.36L8.316 9.68H3.162L12 20.36z" fill="#FC6D26" />
      <path
        d="M3.158 9.683l-1.12 3.245a.68.68 0 000 .444c.049.145.145.27.275.36L12 20.366 3.158 9.683z"
        fill="#FCA326"
      />
      <path
        d="M3.16 9.683h5.16L6.1 3.25a.364.364 0 00-.14-.179.4.4 0 00-.448 0 .364.364 0 00-.14.179L3.16 9.683z"
        fill="#E24329"
      />
      <path d="M12 20.36l3.683-10.68h5.163L12 20.36z" fill="#FC6D26" />
      <path
        d="M20.842 9.683l1.12 3.245c.05.145.05.3 0 .444a.721.721 0 01-.276.36L12 20.36l8.84-10.677h.002z"
        fill="#FCA326"
      />
      <path
        d="M20.844 9.683h-5.16l2.217-6.433a.363.363 0 01.14-.179.399.399 0 01.447 0 .363.363 0 01.14.18l2.216 6.432z"
        fill="#E24329"
      />
    </svg>
  );
}

const ForwardRef = React.forwardRef(SvgGitlabLight);
const MemoForwardRef = React.memo(ForwardRef);
export default MemoForwardRef;
