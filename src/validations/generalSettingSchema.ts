import i18next from 'i18next';
import * as yup from 'yup';

export const CompanyInfoFormSchema = yup.object().shape({
  businessType: yup.string(),
  phone: yup.string().required(i18next.t('error:phone_required')),
  workPhone: yup.string().required(i18next.t('error:work_phone_required')),
  peopleAmount: yup.string(),
  workMail: yup.string().required(i18next.t('error:work_email_required')),
});
