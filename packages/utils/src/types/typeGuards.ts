type UpperCaseLetters =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

export type CamelCase<S extends string> = S extends `${infer P1}${infer P2}`
  ? P1 extends '_' | '-' | ' '
    ? false
    : P1 extends UpperCaseLetters
    ? true
    : CamelCase<P2>
  : false;

export type SnakeCase = `${string}_${string}${string}`;
export type KebabCase = `${string}-${string}${string}`;
