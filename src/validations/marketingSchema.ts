import i18next from 'i18next';
import * as yup from 'yup';

export const BannerFormSchema = yup.object().shape({
  name: yup.string().required(i18next.t('error:field_required')),
  description: yup.string(),
  image: yup.string(),
});
