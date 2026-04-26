import { Field } from "formik"
import css from './GenderSelect.module.css'

export const GENDER = [
    {value:'',label:'Оберіть стать'},
    { value: 'boy', label: 'Хлопчик' },
    { value: 'girl', label: 'Дівчинка' },
    { value: 'unknown', label: 'Ще не знаю' },
];

export default function GenderSelect() {
    return (
        <>
            <label className={css.label} htmlFor="gender">Стать дитини</label>
            <Field as="select" className={css.placeholder} id="gender" name="gender">{GENDER.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}</Field>
        </>
    )
}