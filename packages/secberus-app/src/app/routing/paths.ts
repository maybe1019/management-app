import i18n from '../../i18n';
import { RouteGateProps } from './definitions';

const routing = i18n.t('routing', { returnObjects: true }) as any;
const details = i18n.t('details');

export const orgPrefix = '/(org)?/:orgId?' as const;

// BE VERY SURE YOU NEED TO MODIFY THIS FILE

export const policyDetailsPath =
  `${orgPrefix}/:base/:resources*/policy/${details}/:id` as NonNullable<
    RouteGateProps['path']
  >;
export const violationDetailsPath =
  `${orgPrefix}/:base/:resources*/violation/:id` as NonNullable<
    RouteGateProps['path']
  >;
export const categoryDetailsPath =
  `${orgPrefix}/:base/:resources*/category/${details}/:id` as NonNullable<
    RouteGateProps['path']
  >;
export const requirementDetailsPath =
  `${orgPrefix}/${routing.compliances}/details/:frameworkId/requirement/details/:id` as NonNullable<
    RouteGateProps['path']
  >;
export const subrequirementDetailsPath =
  `${orgPrefix}/${routing.compliances}/details/:frameworkId/:resources*/subrequirement/${details}/:id` as NonNullable<
    RouteGateProps['path']
  >;
export const policyViolationManagementPath =
  `${orgPrefix}/:base/:resources*/policy/:id/${routing.exceptions}` as NonNullable<
    RouteGateProps['path']
  >;
