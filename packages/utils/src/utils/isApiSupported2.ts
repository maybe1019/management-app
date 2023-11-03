/**
 * Exports a boolean value reporting whether the given API is supported or not
 */
export const isApiSupported = (api: string) => !!window && api in window;
