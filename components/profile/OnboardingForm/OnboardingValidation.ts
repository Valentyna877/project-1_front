import * as Yup from 'yup';

export const FORTY_WEEKS = 40 * 7 * 24 * 60 * 60 * 1000;

export const validationSchema = Yup.object({
    gender: Yup.string().oneOf(['boy', 'girl', ''], 'Невідоме значення'),
    dueDate: Yup.date().min(new Date(), 'Дата не може бути в минулому').max(new Date(Date.now()+FORTY_WEEKS), 'Дата не може перевищувати 40 тижнів').required('Оберіть планову дату пологів'),
});