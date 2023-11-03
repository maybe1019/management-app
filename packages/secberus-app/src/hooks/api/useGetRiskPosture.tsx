import { secberusApiGW, RiskPostureParams } from '@secberus/services';
import { pickBy, isNotEmptyOrUndefinedPredicate } from '@secberus/utils';
import { useDeepEffect } from '../useDeepEffect';

export const useGetRiskPosture = (queryParams: RiskPostureParams) => {
  const [getRiskPosture, { data: postureData, isLoading, isUninitialized }] =
    secberusApiGW.useGetRiskPostureMutation();

  const filterEmptyParams = pickBy(queryParams, isNotEmptyOrUndefinedPredicate);

  useDeepEffect(() => {
    getRiskPosture({ riskPostureParams: filterEmptyParams });
  }, [filterEmptyParams, getRiskPosture]);

  return {
    postureData,
    isPostureLoading: isLoading,
    isPostureUninitialized: isUninitialized,
  };
};
