import Select, {
  components,
  MultiValue,
  OptionProps,
  StylesConfig,
} from 'react-select';
import css from './AddDiaryEntryForm.module.css';
import { Emotions } from '@/lib/api/clientApi';
import { useState } from 'react';

type OptionType = {
  value: string;
  label: string;
};

const selectStyles: StylesConfig<OptionType> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    outlineColor: 'transparent',
    outlineOffset: 0,
    outline: 'transparent',
    outlineStyle: 'none',
    outlineWidth: 0,
    backgroundColor: '#f2f2f2',
    border: '1px solid var(--color-scheme-border)',
    borderRadius: isFocused ? '12px 12px 0 0' : '12px',
    // borderRadius: '12px',
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    backgroundColor: '#f2f2f2',
    border: '1px solid var(--color-scheme-border)',
    borderRadius: '0 0 12px 12px',
    padding: '8px 0px',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      borderRadius: '100px',
      paddingRight: '4px',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '160%',
    };
  },
  multiValueRemove: (base) => ({
    ...base,
    display: 'none',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = '#e6e6e6';
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? color
          : isFocused
            ? color
            : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? color
            ? 'black'
            : 'black'
          : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? color : color) : undefined,
      },
    };
  },
};

type Props = {
  value: Emotions[];
};

const Option = (props: OptionProps<OptionType>) => {
  const { isFocused, isSelected, label, innerProps } = props;

  return (
    <components.Option {...props}>
      <div
        {...innerProps}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div
          onMouseDown={(e) => e.preventDefault()}
          style={{
            width: isSelected ? 18 : 16,
            height: isSelected ? 18 : 16,
            border: isFocused ? '1px solid black' : 'none',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isSelected ? 'black' : '#e6e6e6',
          }}
        >
          {isSelected && (
            <svg className={css.checkboxMark} width={14} height={11}>
              <use href="/sprite.svg#icon-mark" />
            </svg>
          )}
        </div>

        <span>{label}</span>
      </div>
    </components.Option>
  );
};

export default function MultiSelect({ value }: Props) {
  const MAX = 12;

  const [selected, setSelected] = useState<OptionType[]>([]);

  const options =
    value?.map((option) => ({
      value: option.title,
      label: option.title,
    })) || [];

  return (
    <Select
      placeholder="Оберіть категорію"
      options={options}
      value={selected}
      onChange={(newValue) =>
        setSelected(Array.isArray(newValue) ? newValue : [])
      }
      isMulti
      name="emotions"
      className={css.EmotionMultiselect}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      blurInputOnSelect={false}
      components={{ Option }}
      styles={selectStyles}
      isClearable={false}
      isOptionDisabled={(option) =>
        selected.length >= MAX &&
        !selected.some((item) => item.value === option.value)
      }
    />
  );
}
