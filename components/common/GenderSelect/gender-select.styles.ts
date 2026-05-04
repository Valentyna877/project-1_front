import { StylesConfig } from 'react-select';
import { GenderOption } from './gender-select.types';

export const genderSelectStyles: StylesConfig<GenderOption, false> = {
  control: (base, state) => ({
    ...base,
    width: '100%',
    minHeight: 40,
    backgroundColor: 'var(--color-neutral-lightest)',
    border: state.menuIsOpen
      ? '1px solid var(--opacity-neutral-darkest-15)'
      : '1px solid var(--opacity-transparent)',
    borderRadius: state.menuIsOpen ? '12px 12px 0 0' : 12,
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      border: state.menuIsOpen
        ? '1px solid var(--opacity-neutral-darkest-15)'
        : '1px solid var(--opacity-transparent)',
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: '2px 12px',
  }),

  singleValue: (base) => ({
    ...base,
    fontFamily: '"Lato", sans-serif',
    fontSize: 16,
  }),

  placeholder: (base, state) => ({
    ...base,
    fontFamily: '"Lato", sans-serif',
    fontSize: 14,
    color: state.selectProps.menuIsOpen
      ? 'var(--color-neutral-darkest)'
      : 'var(--color-neutral)',
    '@media (min-width: 1440px)': {
      fontSize: 16,
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'var(--color-neutral)',
    transition: 'transform 0.2s',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transformOrigin: '40% 50%',
    paddingRight: 20,
    '&:hover': {
      color: 'var(--color-neutral)',
      backgroundColor: 'transparent',
    },
  }),

  menu: (base) => ({
    ...base,
    width: '100%',
    marginTop: 0,
    border: '1px solid var(--opacity-neutral-darkest-15)',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    backgroundColor: 'var(--color-neutral-lightest)',
    boxShadow: 'none',
    overflow: 'hidden',
  }),

  menuList: (base) => ({
    ...base,
    padding: '8px 0',
    maxHeight: 226,
    fontFamily: '"Lato", sans-serif',
    fontSize: 16,
  }),

  option: (base, state) => ({
    ...base,
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'var(--color-accent-light)'
      : state.isFocused
        ? 'var(--opacity-neutral-darkest-5)'
        : 'transparent',
    color: 'inherit',
    borderRadius: state.isFocused ? 12 : 0,
    ':active': {
      backgroundColor: 'var(--opacity-neutral-darkest-15)',
    },
  }),
};

export const onboardingGenderStyles: StylesConfig<GenderOption, false> = {
  control: (base, state) => ({
    ...base,
    width: '100%',
    minHeight: 40,
    backgroundColor: 'var(--color-neutral-lightest)',
    border: state.menuIsOpen
      ? '1px solid var(--opacity-neutral-darkest-15)'
      : '1px solid var(--opacity-transparent)',
    borderRadius: state.menuIsOpen ? '12px 12px 0 0' : 12,
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      border: state.menuIsOpen
        ? '1px solid var(--opacity-neutral-darkest-15)'
        : '1px solid var(--opacity-transparent)',
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: '2px 12px',
  }),

  singleValue: (base) => ({
    ...base,
    fontFamily: '"Lato", sans-serif',
    fontSize: 16,
  }),

  placeholder: (base, state) => ({
    ...base,
    fontFamily: '"Lato", sans-serif',
    fontSize: 14,
    color: state.selectProps.menuIsOpen
      ? 'var(--color-neutral-darkest)'
      : 'var(--color-neutral)',
    '@media (min-width: 1440px)': {
      fontSize: 16,
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'var(--color-neutral)',
    transition: 'transform 0.2s',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transformOrigin: '40% 50%',
    paddingRight: 20,
    '&:hover': {
      color: 'var(--color-neutral)',
      backgroundColor: 'transparent',
    },
  }),

  menu: (base) => ({
    ...base,
    width: '100%',
    marginTop: 0,
    border: '1px solid var(--opacity-neutral-darkest-15)',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    backgroundColor: 'var(--color-neutral-lightest)',
    boxShadow: 'none',
    overflow: 'hidden',
  }),

  menuList: (base) => ({
    ...base,
    padding: '8px 0',
    maxHeight: 226,
    fontFamily: '"Lato", sans-serif',
    fontSize: 16,
  }),

  option: (base, state) => ({
    ...base,
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'var(--color-accent-light)'
      : state.isFocused
        ? 'var(--opacity-neutral-darkest-5)'
        : 'transparent',
    color: 'inherit',
    borderRadius: state.isFocused ? 12 : 0,
  }),
};
