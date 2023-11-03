import faker from 'faker';
import { generateRandomKeyValues as backendsNeverendingInconsistency } from './randomKeyValues';

export type Log = {
  id: string;
  time: number;
  type: string;
  source: string;
  sid: string;
  org: string;
  data: {
    message: string;
    event_type: string;
    [key: string]: any;
  };
};

export type Logs = Array<Log>;

export const generateLogs = (): Log => {
  const logData = {
    id: faker.random.uuid(),
    time: faker.date.recent().getTime(),
    type: faker.company.bs().split(' ').join('.'),
    source: faker.company.catchPhraseDescriptor(),
    sid: faker.company.bs().split(' ').join('-'),
    org: faker.company.bs().split(' ').join('-'),
    data: {
      message: faker.lorem.paragraphs(3),
      event_type: faker.company.bs().split(' ').join('.'),
    },
  };
  const randomVals = backendsNeverendingInconsistency(
    Math.floor(Math.random() * 5) + 1
  );
  Object.assign(logData.data, randomVals);
  return logData;
};

export const generateManyLogs = (length: number): Logs =>
  Array(length)
    .fill(0)
    .map(() => generateLogs());
