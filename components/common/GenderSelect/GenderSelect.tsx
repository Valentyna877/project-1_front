// import { useField } from "formik";
// import Select from "react-select";
// import css from "./GenderSelect.module.css";

// export const GENDER = [
//     { value: "boy", label: "Хлопчик" },
//     { value: "girl", label: "Дівчинка" },
//     { value: "unknown", label: "Ще не знаю" },
// ];

// export default function GenderSelect() {
//     const [field, , helpers] = useField('gender');
//     return (
//         <div className={css.genderWrapper}>
//             <label className={css.label} htmlFor='gender'>Стать дитини</label>
//             <Select
//                 unstyled
//                 instanceId='gender-select'
//                 inputId='gender'
//                 classNames={{
//                     control: ({ selectProps }) => selectProps.menuIsOpen ? css.controlOpen : css.control,
//                     option: ({ isFocused }) => isFocused ? css.optionFocused : css.option,
//                     menu: () => css.menu,
//                     indicatorSeparator: () => css.indicatorSeparator,
//                     dropdownIndicator: ({ selectProps }) => selectProps.menuIsOpen ? css.arrowUp : css.arrowDown,
//                     input: () => css.input,
//                     menuList: () => css.menuList,
//                     singleValue: () => css.singleValue,
//                     placeholder: ({ selectProps }) => selectProps.menuIsOpen ? css.placeholderOpen : css.placeholder,
//                 }}
//                 options={GENDER}
//                 placeholder='Оберіть стать'
//                 onChange={(option) => helpers.setValue(option?.value ?? '')}
//                 value={GENDER.find(g => g.value === field.value) ?? null}
//             />
//         </div>
//     );
//     }


'use client';

import { useEffect, useState, useId } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { genderOptions, GenderOption, GenderValue } from './gender-select.types';
import { genderSelectStyles as defaultGenderStyles } from './gender-select.styles';

type Props = {
    //   value: 'boy' | 'girl' | 'unknown' | null;
    value: GenderValue | null;
    //   onChange: (value: 'boy' | 'girl' | 'unknown' | null) => void;
  onChange: (value: GenderValue | null) => void;
  styles?: StylesConfig<GenderOption, false>;
  placeholder?: string;
};

function GenderSelect({ value, onChange, styles = defaultGenderStyles, placeholder = 'Оберіть стать дитини', }: Props) {
  const id = useId();
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setMounted(true);
  //   }, 0);

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedOption = genderOptions.find((o) => o.value === value) ?? null;

  const handleChange = (option: SingleValue<GenderOption>) => {
    onChange(option ? option.value : null);
  };

  if (!mounted) {
    return <div style={{ minHeight: '44px', border: '1px solid #ddd' }} />;
  }

  return (
    // <Select
    //   instanceId="gender-select"
    //   classNamePrefix="react-select"
    //   options={genderOptions}
    //   placeholder="Оберіть стать дитини"
    //   isSearchable={false}
    //   styles={genderSelectStyles}
    //   value={selectedOption}
    //   onChange={handleChange}
    // />
    <Select
    instanceId={id}
    classNamePrefix="react-select"
    options={genderOptions}
    placeholder={placeholder}
    isSearchable={false}
    styles={styles}
    value={selectedOption}
    onChange={handleChange}
  />
  );
}

export default GenderSelect;