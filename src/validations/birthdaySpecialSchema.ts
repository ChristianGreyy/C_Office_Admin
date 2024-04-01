import * as yup from 'yup';

export const BirthdaySpecialFormSchema = yup.object().shape({
  point: yup.string(),
  rebate: yup.string(),
  coupon: yup.string(),
});
