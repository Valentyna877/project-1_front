import { StylesConfig } from 'react-select';
import { GenderOption } from './gender-select.types';

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
        transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '12px 16px',
        cursor: 'pointer',
        backgroundColor: state.isSelected
            ? '#edcfcf'
            : state.isFocused
                ? '#f7f7f7'
                : '#fff',
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
        fontSize: 16,
        color: state.selectProps.menuIsOpen
            ? 'var(--color-neutral-darkest)'
            : 'var(--color-neutral)',
    }),
  
    indicatorSeparator: () => ({
        display: 'none',
    }),
  
    dropdownIndicator: (base, state) => ({
        ...base,
        color: 'var(--color-neutral)',
        transition: 'transform 0.2s',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
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
        backgroundColor: state.isSelected ? 'var(--color-accent-light)' : state.isFocused
    ? 'var(--opacity-neutral-darkest-5)' : 'transparent',
        color: 'inherit',
        borderRadius: state.isFocused ? 12 : 0,
    }),
};