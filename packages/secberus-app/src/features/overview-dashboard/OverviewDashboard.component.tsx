import React from 'react';
import { PageHeader } from '@secberus/components';
import { ErrorBoundary } from '../../utils/wrappers/ErrorBoundaries';
import {
  DashboardColumn,
  DashboardContainer,
} from './OverviewDashboard.styled';
import { DataSourceSummary } from './components/DataSourceSummary/DataSourceSummary.component';
import { ComplianceRiskSummary } from './components/ComplianceRiskSummary/ComplianceRiskSummary.component';
import { PolicyRiskSummary } from './components/PolicyRiskSummary/PolicyRiskSummary.component';
import { DataSourceRiskSummary } from './components/DataSourceRiskSummary/DataSourceRiskSummary.component';
import { MetricIndicatorGridList } from './components/MetricBlockIndicators/components/MetricIndicatorGridList/MetricIndicatorGridList.component';

const OverviewDashboardInternal = () => {
  return (
    <>
      <PageHeader title="Overview dashboard" />
      <DashboardContainer>
        <DashboardColumn>
          <MetricIndicatorGridList />
          <DataSourceRiskSummary />
        </DashboardColumn>
        <DashboardColumn>
          <DataSourceSummary />
          <ComplianceRiskSummary />
          <PolicyRiskSummary />
        </DashboardColumn>
      </DashboardContainer>
    </>
  );
};

export const OverviewDashboard = () => (
  <ErrorBoundary>
    <OverviewDashboardInternal />
  </ErrorBoundary>
);
