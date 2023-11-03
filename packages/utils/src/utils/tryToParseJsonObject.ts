import { tryParseJson } from './tryParseJson';

export const tryParsingJsonObject = <T>(jsonString: string): T | undefined => {
  const o = tryParseJson(jsonString);
  if (o && typeof o === 'object') {
    return o;
  }
  return undefined;
};
