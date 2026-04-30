import * as Yup from 'yup';

export const FORTY_WEEKS = 40 * 7 * 24 * 60 * 60 * 1000;

export const validationSchema = Yup.object().shape({
    gender: Yup.string().oneOf(['boy', 'girl', 'unknown', ''], 'Невідоме значення'),
    dueDate: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Неправильний формат дати')
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