import * as Yup from 'yup';
import { GenderValue } from '@/components/common/GenderSelect/gender-select.types';

export const FORTY_WEEKS = 40 * 7 * 24 * 60 * 60 * 1000;

export const profileSchema = Yup.object().shape({
  name: Yup.string().max(32, 'Імʼя не може перевищувати 32 символи'),
  gender: Yup.mixed<GenderValue>()
    .oneOf(['boy', 'girl', 'unknown'], 'Невідоме значення')
    .nullable(),

  dueDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Неправильний формат дати',
      excludeEmptyString: true,
    })
    .test('is-future-date', 'Дата не може бути в минулому', (value) => {
      if (!value) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(value) >= today;
    })
    .test('is-max-date', 'Дата не може перевищувати 40 тижнів', (value) => {
      if (!value) return true;
      return new Date(value) <= new Date(Date.now() + FORTY_WEEKS);
    }),
});
