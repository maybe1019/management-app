import * as yup from 'yup';
import { CreateReportSchedule } from '@secberus/services';

const requiredMessage = 'This is required';

export function useFormSchema(step: string) {
  const createUpdateReportSchema: yup.SchemaOf<
    Pick<CreateReportSchedule, 'name'>
  > = yup.object({
    name: yup.string().required(requiredMessage),
    emails: yup.mixed().when('name', (_arg: any, schema: any) =>
      step === 'configure'
        ? yup
            .array()
            .min(1, requiredMessage)
            .transform(function (value: any, originalValue: any, ctx: any) {
              if (ctx.isType(value) && value !== null) {
                return value;
              }
              return originalValue ? originalValue.split(/[\s,]+/) : [];
            })
            .of(
              yup.string().email(({ value }) => `${value} is not a valid email`)
            )
        : schema
    ),
  });
  return createUpdateReportSchema;
}
