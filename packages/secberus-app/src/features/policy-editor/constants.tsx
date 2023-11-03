import { Text } from '@secberus/components';

export const LABEL_MAP = {
  policy_category_id: 'Category',
  name: 'Name',
  logic: 'Policy logic',
  resources: 'Resource types',
};

export const EDITOR_ABOUT_TEXT = (
  <Text type="small-regular">
    Include a name, unique ID, category, and short description to help with
    policy identification.
  </Text>
);

export const EDITOR_CONFIG_TEXT = (
  <>
    <Text type="small-regular">
      Select the status to determine if the policy should be active.
    </Text>
    <Text type="small-regular">
      Choose the severity to indicate a priority for resolving resulting policy
      violations.
    </Text>
    <Text type="small-regular">
      Map this policy to a framework control to include it in compliance audits
      (optional).
    </Text>
  </>
);

export const EDITOR_REMEDIATION_TEXT = (
  <Text type="small-regular">
    Describe the steps needed to resolve violations of this policy.
  </Text>
);

export const EDITOR_RATIONALE_TEXT = (
  <Text type="small-regular">
    Describe the reason for this policy and include any other relevant
    information (optional).
  </Text>
);
