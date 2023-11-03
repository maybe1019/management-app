import { setTimeout } from 'timers';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

const PrintStyle = createGlobalStyle`
  @page {
    size: a3;
  }
  body {
    min-width: 992px !important;
  }
  table {
    border-collapse: collapse;
  }
  @media print {
    *,
    *::before,
    *::after {
      text-shadow: none !important;
      box-shadow: none !important;
    }
    tr,
    img {
      page-break-inside: avoid;
    }
    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }
    h2,
    h3 {
      page-break-after: avoid;
    }
  }

`;

export interface ReportRendererProps {
  callback: () => void;
  reportRef: React.RefObject<HTMLDivElement>;
  className: string;
}

// eslint-disable-next-line react/prefer-stateless-function
class ClassWrapper extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/destructuring-assignment
    return <>{this.props.children}</>;
  }
}

export const ReportRenderer: React.FC<ReportRendererProps> = ({
  children,
  callback,
  reportRef,
  className,
}) => {
  React.useLayoutEffect(() => {
    setTimeout(() => {
      callback && callback();
    }, 2000);
  }, [callback]);

  return (
    <div ref={reportRef} className={className}>
      <PrintStyle />
      {/* react-to-print hasn't been updated to work with hooks */}
      <ClassWrapper>{children}</ClassWrapper>
    </div>
  );
};
