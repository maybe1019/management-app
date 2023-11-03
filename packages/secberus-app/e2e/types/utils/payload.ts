export interface Payload {
  [key: string]: string;
  field: 'Key' | 'Value';
  value: string;
}
