import { ComplianceFramework } from '@secberus/services';

export const filterAlreadySelected = (
  frameworks: ComplianceFramework[],
  selectedFrameworks: ComplianceFramework[]
) => {
  const selectedFrameworksMap = selectedFrameworks.reduce((acc, curr) => {
    acc[curr.id!] = curr;
    return acc;
  }, {} as Record<string, ComplianceFramework>);

  return frameworks.filter(f => {
    const isFrameworkSelected = !!selectedFrameworksMap[f.id!];
    if (isFrameworkSelected) return false;
    else if (!f.children) return true;
    else {
      const areAllChildrenSelected = !!f.children.filter(
        f_ => !selectedFrameworksMap[f_.id!]
      ).length;
      return areAllChildrenSelected;
    }
  });
};

export const removeTopLevelFramework = (frameworks: ComplianceFramework[]) =>
  frameworks.slice(1, frameworks.length);
