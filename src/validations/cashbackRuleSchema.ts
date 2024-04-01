import i18next from 'i18next';
import * as yup from 'yup';

export const RuleFormSchema = yup.object().shape({
  name: yup.string().required(i18next.t('error:company_required')),
  ruleType: yup.string(),
  startTime: yup.string(),
  endTime: yup.string(),
  startDate: yup.string().required(i18next.t('error:duaration_required')),
  // endDate: yup.string().required('Duration is required'),
  endDate: yup.string(),
  rewardType: yup.string(),
  spent: yup.string().required(i18next.t('error:spent_required')),
  rebate: yup.string().required(i18next.t('error:rebate_required')),
  fullsum: yup.boolean(),
});
