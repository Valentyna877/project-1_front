import { useField } from "formik";
import Select from "react-select";
import css from "./GenderSelect.module.css";

export const GENDER = [
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
  { value: "unknown", label: "Ще не знаю" },
];

export default function GenderSelect() {
    const [field, , helpers] = useField('gender');
    return (
        <div className={css.genderWrapper}>
            <label className={css.label} htmlFor='gender'>Стать дитини</label>
            <Select
                unstyled
                instanceId='gender-select'
                inputId='gender'
                classNames={{
                    control: ({ selectProps }) => selectProps.menuIsOpen ? css.controlOpen : css.control,
                    option: ({ isFocused }) => isFocused ? css.optionFocused : css.option,
                    menu: () => css.menu,
                    indicatorSeparator: () => css.indicatorSeparator,
                    dropdownIndicator: ({ selectProps }) => selectProps.menuIsOpen ? css.arrowUp : css.arrowDown,
                    input: () => css.input,
                    menuList: () => css.menuList,
                    singleValue: () => css.singleValue,
                    placeholder: ({ selectProps }) => selectProps.menuIsOpen ? css.placeholderOpen : css.placeholder,
                }}
                options={GENDER}
                placeholder='Оберіть стать'
                onChange={(option) => helpers.setValue(option?.value ?? '')}
                value={GENDER.find(g => g.value === field.value) ?? null}
            />
        </div>
    );
    }
