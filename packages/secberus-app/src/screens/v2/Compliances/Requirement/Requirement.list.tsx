import React from 'react';
import { LoadingOverlay } from '@secberus/components';
import { ComplianceControlAugmented, secberusApiGW } from '@secberus/services';
import { PolicyRow, ViolationRow } from './Requirement.rows';

const RequirementList: React.FC<{
  items: ComplianceControlAugmented[];
  view: 'policies' | 'violations';
}> = ({ items, view }) => {
  const { data: resources, isLoading: isGetResourcesLoading } =
    secberusApiGW.useListResourcesQuery({});

  const dataWithResources = items.map(item => ({
    ...item,
    resources,
  }));

  if (isGetResourcesLoading) return <LoadingOverlay />;

  return (
    <>
      {dataWithResources.map((d, idx) =>
        view === 'policies' ? (
          // @ts-expect-error not typed properly
          <PolicyRow data={dataWithResources} index={idx} />
        ) : (
          // @ts-expect-error not typed properly
          <ViolationRow data={dataWithResources} index={idx} />
        )
      )}
    </>
  );
};

export default RequirementList;
