'use client';

import { useId } from 'react';
import Select, { SingleValue } from 'react-select';
import {
  genderOptions,
  GenderOption,
  GenderValue,
} from './gender-select.types';
import { createGenderSelectStyles } from './gender-select.styles';

type Props = {
  value: GenderValue | null;
  onChange: (value: GenderValue | null) => void;
  themeClass?: string;
  placeholder?: string;
};

function GenderSelect({
  value,
  onChange,
  themeClass,
  placeholder = 'Оберіть стать',
}: Props) {
  const id = useId();
  const styles = createGenderSelectStyles(themeClass);

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
