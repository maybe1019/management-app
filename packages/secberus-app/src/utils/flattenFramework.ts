import {
  ComplianceControl,
  ComplianceControlAugmented,
  ComplianceFramework,
  ComplianceFrameworkAugmented,
} from '@secberus/services';

type Tracking = { depth: number; groupId: string };

export type ComplianceControlWithTracking = ComplianceControl & Tracking;
export type ComplianceFrameworkWithTracking = ComplianceFramework & Tracking;

export type ComplianceControlAugmentedWithTracking =
  ComplianceControlAugmented & Tracking;
export type ComplianceFrameworkAugmentedWithTracking =
  ComplianceFrameworkAugmented & Tracking;

export type MaybeComplianceControlOrFramework =
  | ComplianceControl
  | ComplianceFramework;

export type MaybeComplianceControlOrFrameworkAugmented =
  | ComplianceControlAugmented
  | ComplianceFrameworkAugmented;

export type MaybeComplianceControlOrFrameworkWithTracking =
  | ComplianceFrameworkWithTracking
  | ComplianceControlWithTracking;

export type MaybeComplianceControlOrFrameworkAugmentedWithTracking =
  | ComplianceFrameworkAugmentedWithTracking
  | ComplianceControlAugmentedWithTracking;

export const flattenFramework = (
  item: MaybeComplianceControlOrFramework,
  maxDepth = 10,
  out: MaybeComplianceControlOrFrameworkWithTracking[] = [],
  depth = 0,
  groupId: string | null = null
) => {
  const id = groupId ?? item.id!;
  out.push({ ...item, depth, groupId: id });
  const children = item.children;
  if (depth < maxDepth && children) {
    children.forEach((child, idx) =>
      flattenFramework(child, maxDepth, out, depth + 1, id)
    );
  }
  return out;
};

export const flattenFrameworks = (
  frameworks: MaybeComplianceControlOrFramework[]
) =>
  frameworks
    .map(f => flattenFramework(f))
    .reduce((acc = [], curr) => acc.concat(...curr), []);

// control type guard
export const isControl = (
  thing: MaybeComplianceControlOrFrameworkWithTracking
): thing is ComplianceControlWithTracking => {
  return 'identifier' in thing;
};
