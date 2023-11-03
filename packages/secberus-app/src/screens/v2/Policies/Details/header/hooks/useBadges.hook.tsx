import React from 'react';
import {
  BaseBadge,
  ViolationsBadge,
  RiskBadge,
  SeverityBadge,
  Switch,
  OccurrenceBadge,
  BadgeIcon,
} from '@secberus/components';
import { useIsLoading } from '@secberus/utils';
import { ExceptionLight } from '@secberus/icons';
import type { Policy, Resource } from '@secberus/services';
import { PolicyCategory } from '@secberus/services';
import { HeaderBadge } from '../components/HeaderBadge.component';
import { useSubscribePolicy, useUnsubscribePolicy } from './requestHooks';

export type PolicyDetailHeaderBadge =
  | 'severity'
  | 'risk'
  | 'violations'
  | 'exception'
  | 'statusSwitch'
  | 'resources'
  | 'occurrence'
  | 'author'
  | 'category'
  | 'type'
  | 'compliance';

type UseBadgesArgs = {
  badgeTypes: PolicyDetailHeaderBadge[];
  props: {
    policy: Policy;
    isPropsLoading: boolean;
    category?: PolicyCategory;
    exceptionCount?: number;
    resourceData?: Resource;
  };
};

type UseBadges = (args: UseBadgesArgs) => [JSX.Element[], boolean];

export const useBadges: UseBadges = ({
  badgeTypes,
  props: { policy, isPropsLoading, category, exceptionCount, resourceData },
}) => {
  const { handleSubscribe } = useSubscribePolicy({
    id: policy.id!,
    name: policy.name,
  });
  const { handleUnsubscribe } = useUnsubscribePolicy({
    id: policy.id!,
    name: policy.name,
  });

  const isLoading = useIsLoading([isPropsLoading]);

  const badgeMap = React.useMemo(() => {
    const handleSubscription = (
      e: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
    ) => {
      checked ? handleSubscribe() : handleUnsubscribe();
    };
    return {
      severity: <SeverityBadge full priorityNum={policy.severity} />,
      risk: <RiskBadge light icon riskScore={policy.score!} />,
      violations: (
        <ViolationsBadge
          light
          withViolations
          violations={policy.violation_count}
        />
      ),
      occurrence: (
        <OccurrenceBadge
          light
          withViolations
          violations={policy.violation_count}
        />
      ),
      exception: (
        <BaseBadge light className="has-exceptions">
          <ExceptionLight /> {exceptionCount}{' '}
          {exceptionCount === 1 ? 'exception' : 'exceptions'}
        </BaseBadge>
      ),
      statusSwitch: (
        <HeaderBadge label="Status">
          <Switch
            // @ts-expect-error mis-matched types giving trouble
            onChange={handleSubscription}
            initialChecked={!!policy.subscribed}
          />
        </HeaderBadge>
      ),
      type: (
        <HeaderBadge label="Policy type" badgeText={category?.category_type} />
      ),
      resources: (
        <HeaderBadge label="Resource type">
          <BaseBadge
            light
            label={resourceData?.description}
            icon={
              policy.datasource_types &&
              (policy.datasource_types[0] as BadgeIcon)
            }
          />
        </HeaderBadge>
      ),
      author: (
        <HeaderBadge
          label="Author"
          badgeText={policy.secberus_managed ? 'Secberus' : 'Custom'}
        />
      ),
      category: <HeaderBadge label="Category" badgeText={category?.name} />,
    };
  }, [
    policy.severity,
    policy.score,
    policy.violation_count,
    policy.subscribed,
    policy.datasource_types,
    policy.secberus_managed,
    exceptionCount,
    category?.category_type,
    category?.name,
    resourceData?.description,
    handleSubscribe,
    handleUnsubscribe,
  ]) as Record<PolicyDetailHeaderBadge, JSX.Element>;

  const selectedBadges = React.useMemo(
    () => badgeTypes.map(badge => badgeMap[badge]),
    [badgeMap, badgeTypes]
  );

  return [selectedBadges, isLoading];
};
