interface TokenProvider {
  keywords?: string[];
  operators?: string[];
  tokenizer: {
    root: { include: string }[];
    common: Common;
  };
}

type Common = (
  | [RegExp, string]
  | [RegExp, { cases: { '@keywords': string; '@default': string } }]
  | [RegExp, { cases: { '@operators': string; '@default': string } }]
)[];

export type { TokenProvider };
