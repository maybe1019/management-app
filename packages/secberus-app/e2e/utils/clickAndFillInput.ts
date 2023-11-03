import { Payload } from '../types';

export const clickAndFillInput = async (
  page: any,
  { field, value }: Payload,
  position: number
) => {
  await Promise.all([
    page.click(`:nth-match([placeholder=${field}], ${position})`, {
      force: true,
    }),
    page.fill(`:nth-match([placeholder=${field}], ${position})`, value),
  ]);
};
