import _ from 'lodash';
import {
  MaybeComplianceControlOrFrameworkAugmentedWithTracking,
  ComplianceControlAugmentedWithTracking,
  ComplianceFrameworkAugmentedWithTracking,
} from '../../../utils/flattenFramework';

export const isPassing = (violations: number) => violations < 1;

///Handle Sort For Nested Table///

export const isChildControl = (
  item: MaybeComplianceControlOrFrameworkAugmentedWithTracking
) => item.depth > 2;

export const nestedSort = (
  data: MaybeComplianceControlOrFrameworkAugmentedWithTracking[],
  id:
    | string
    | [(val: MaybeComplianceControlOrFrameworkAugmentedWithTracking) => any],
  dir: 'asc' | 'desc' | ['asc' | 'desc']
) => {
  if (dir && id) {
    const { childArr, parentArr } = separateNested(data);
    const sortedFramweworks = _.orderBy(parentArr, id, dir);

    return sortedFramweworks
      .map(x => [x, ...childArr.filter(c => matchByGroupID(c, x))])
      .flat();
  }
  return data;
};

const separateNested = (
  data: MaybeComplianceControlOrFrameworkAugmentedWithTracking[]
) => {
  const [childArr, parentArr] = data.reduce(
    (acc, curr) => {
      isChildControl(curr) ? acc[0].push(curr) : acc[1].push(curr);
      return acc;
    },
    [[], []] as [
      ComplianceControlAugmentedWithTracking[],
      ComplianceFrameworkAugmentedWithTracking[]
    ]
  );

  return {
    childArr,
    parentArr,
  };
};

const matchByGroupID = (
  control: ComplianceControlAugmentedWithTracking,
  framework: ComplianceFrameworkAugmentedWithTracking
) => control.groupId === framework.id;
