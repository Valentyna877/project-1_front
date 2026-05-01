import { StylesConfig } from 'react-select';

export type GenderOption = {
  value: 'boy' | 'girl' | 'unknown';
  label: string;
};

export const genderOptions: GenderOption[] = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'unknown', label: 'Ще не знаю' },
];

export const genderSelectStyles: StylesConfig<GenderOption, false> = {
  control: (base, state) => ({
    ...base,
     width: '100%', 
    height: 44,
    minHeight: 44,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    border: state.isFocused ? '2px solid #FFCBD3' : '2px solid transparent',
    boxShadow: 'none',
    paddingLeft: 16,
    paddingRight: 40,
    cursor: 'pointer',

    '&:hover': {
      border: '2px solid #FFCBD3',
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: 16,
  }),

  placeholder: (base) => ({
    ...base,
    fontSize: 16,
    color: '#999',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

 dropdownIndicator: (base, state) => ({
  ...base,
  color: 'black',
  marginRight: -50,
  transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: state.selectProps.menuIsOpen
    ? 'rotate(180deg)'
     : 'rotate(0deg)',
   '&:hover': {
    color: 'black',
    backgroundColor: 'transparent',
   },
   borderRadius: 0,
}),

  menu: (base) => ({
    ...base,
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  }),

  option: (base, state) => ({
    ...base,
    padding: '12px 16px',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? '#edcfcf'
      : state.isFocused
        ? '#f7f7f7'
        : '#fff',
  }),
};