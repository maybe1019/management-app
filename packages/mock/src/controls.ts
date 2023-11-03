import faker from 'faker';
import { generateRule, IRule } from './rules';
import { generateAlert, IAlert } from './alerts';

export interface IControl {
  id: string;
  compliance_id: string;
  status: boolean;
  rules: IRule[];
  alerts: IAlert[];
  identifier: string;
  description: string;
  parent_id: string | undefined;
  children: IControl[];
}

export const generateControl = (
  nestingLevel: number,
  idx = 0,
  parentId?: string
): IControl => {
  const id = faker.random.uuid();
  const control = {
    id,
    compliance_id: faker.random.uuid(),
    status: faker.random.boolean(),
    rules: Array(Math.floor(Math.random() * 42) + 1)
      .fill(0)
      .map(() => generateRule()),
    alerts: Array(Math.floor(Math.random() * 3))
      .fill(0)
      .map(() => generateAlert()),
    identifier: faker.lorem.words(),
    description: faker.lorem.sentence(),
    parent_id: parentId,
    children:
      nestingLevel === idx
        ? []
        : Array(Math.floor(Math.random() * 3) + 1).fill(
            generateControl(nestingLevel, idx + 1, id)
          ),
  };
  return control;
};

export const controlsData = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => generateControl(3));
