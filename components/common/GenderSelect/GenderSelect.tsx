// import { Field } from "formik"
// import css from './GenderSelect.module.css'

// export const GENDER = [
//     { value: '', label: 'Оберіть стать' },
//     { value: 'boy', label: 'Хлопчик' },
//     { value: 'girl', label: 'Дівчинка' },
//     { value: 'unknown', label: 'Ще не знаю' },
// ];

// export default function GenderSelect() {
//     return (
//         <div className={css.genderWrapper}>
//             <label className={css.label} htmlFor="gender">Стать дитини</label>
//             <Field as="select" className={css.placeholder} id="gender" name="gender">{GENDER.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}</Field>
//         </div>
//     )
// }

import { useField } from 'formik';
import Select from 'react-select';
import css from './GenderSelect.module.css'

export const GENDER = [
    { value: 'boy', label: 'Хлопчик' },
    { value: 'girl', label: 'Дівчинка' },
    { value: 'unknown', label: 'Ще не знаю' },
];

export default function GenderSelect() {
    const [field, , helpers] = useField('gender');
    return (
        <div className={css.genderWrapper}>
            <label className={css.label} htmlFor='gender'>Стать дитини</label>
            <Select instanceId='gender-select'
                inputId='gender'
                classNames={{
                control: () => css.control,
                placeholder: () => css.placeholder,
                option: () => css.option,
                menu: () => css.menu,
                indicatorSeparator:()=>css.indicatorSeparator,
            }}
                options={GENDER}
                placeholder='Оберіть стать'
                    onChange={(option) => helpers.setValue(option?.value ?? '')}
                value={GENDER.find(g => g.value === field.value) ?? null}
                />
            </div>
        );
    }
