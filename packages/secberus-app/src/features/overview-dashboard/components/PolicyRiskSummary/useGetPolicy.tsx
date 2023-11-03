import React from 'react';

const FAKED_COMPLIANCE = () => {
  return [
    {
      id: '1tPC7R05mD8O',
      name: 'FISC 9th Edition',
      compliance_summary: 90.0,
    },
    {
      id: '7vZgec9Zjr8c',
      name: 'HITRUST CSF v9.3.1 Level 1',
      compliance_summary: 38.3,
    },
    {
      id: '1tDs22ffD8O',
      name: 'Coleman 4th Edition',
      compliance_summary: 64.0,
    },
    {
      id: '4j5h12iid02',
      name: 'Security Be Good (SBG) v2.2',
      compliance_summary: 22.69,
    },
  ];
};
export const useGetComplianceSummary = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [setIsLoading]);
  const complianceSummary = React.useMemo(() => FAKED_COMPLIANCE(), []);
  return {
    data: complianceSummary,
    isLoading,
    isFetching: false,
    isUninitialized: false,
  };
};
