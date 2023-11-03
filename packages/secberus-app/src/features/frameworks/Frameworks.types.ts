type Control = {
  description: string;
  id: string;
  identifier: string;
  ordinal: string;
  parent_id: string | null;
  children: any[];
};

type Requirement = {
  description: string;
  id: string;
  identifier: string;
  ordinal: string;
  compliance_id: string;
  controls: Control[];
};

export type Framework = {
  description: string;
  id: string;
  name: string;
  requirements: Requirement[];
};

export interface ToggleFrameworkProps {
  id: string;
  enabled: boolean;
}
