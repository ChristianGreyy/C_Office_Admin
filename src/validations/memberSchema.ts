import * as yup from 'yup';

export const MemberFormScheme = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  gender: yup.string(),
  date_of_birth: yup.string(),
  address: yup.string(),
  postal_code: yup.string(),
  status: yup.string(),
});
