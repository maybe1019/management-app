const getTitleWithOrdinal = (ordinal: string, identifier: string) =>
  `${ordinal.replace(/\.$/, '')}. ${identifier}`;

export default getTitleWithOrdinal;
