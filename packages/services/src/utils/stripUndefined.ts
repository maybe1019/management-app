import { isPlainObject } from '@reduxjs/toolkit';

export function stripUndefined(obj: any) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  const copy: Record<string, any> = { ...obj };
  for (const [k, v] of Object.entries(copy)) {
    if (typeof v === 'undefined') delete copy[k];
  }
  return copy;
}
