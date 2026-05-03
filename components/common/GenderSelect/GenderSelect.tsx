'use client';

import { useId } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { genderOptions, GenderOption, GenderValue } from './gender-select.types';
import { genderSelectStyles as defaultGenderStyles } from './gender-select.styles';

type Props = {
    value: GenderValue | null;
  onChange: (value: GenderValue | null) => void;
  styles?: StylesConfig<GenderOption, false>;
  placeholder?: string;
};

function GenderSelect({ value, onChange, styles = defaultGenderStyles, placeholder = 'Оберіть стать дитини', }: Props) {
  const id = useId();

  const selectedOption = genderOptions.find((o) => o.value === value) ?? null;

  const handleChange = (option: SingleValue<GenderOption>) => {
    onChange(option ? option.value : null);
  };

  return (
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