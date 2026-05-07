import Select, { components, OptionProps, StylesConfig } from 'react-select';
import css from './AddDiaryEntryForm.module.css';
import { getAllEmotions } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useTheme } from '@/hooks/useTheme';

const THEME_ACCENT: Record<string, string> = {
  boy: '#adeffe',
  girl: '#ffcbd3',
  default: '#feeccc',
};

type OptionType = {
  value: string; // _id
  label: string; // title
};

const buildSelectStyles = (
  hasError: boolean,
  accent: string
): StylesConfig<OptionType> => ({
  control: (styles, { isFocused }) => ({
    ...styles,
    outline: 'none',
    boxShadow: hasError ? 'inset 0 0 0 2px var(--color-red)' : 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: 'none',
    borderRadius: isFocused ? '12px 12px 0 0' : '12px',
    '&:hover': { boxShadow: hasError ? 'inset 0 0 0 2px var(--color-red)' : 'none' },
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    backgroundColor: '#f2f2f2',
    border: 'none',
    borderRadius: '0 0 12px 12px',
    padding: '8px 0px',
    zIndex: 30,
  }),
  menuList: (base) => ({
    ...base,
    ...({ '--scrollbar-accent': accent } as Record<string, string>),
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
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
});

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

interface MultiSelectProps {
  hasError?: boolean;
}

export default function MultiSelect({ hasError = false }: MultiSelectProps) {
  const MAX = 12;
  const { theme } = useTheme();
  const accent = THEME_ACCENT[theme] ?? THEME_ACCENT.default;
  const emotions = useDiaryStore((s) => s.draft.emotions);
  const setEmotions = useDiaryStore((s) => s.setEmotions);

  const { data } = useQuery({
    queryKey: ['emotions'],
    queryFn: getAllEmotions,
  });

  const options: OptionType[] =
    data?.map((option) => ({
      value: option._id, // id як value
      label: option.title,
    })) ?? [];

  const selected = options.filter((opt) => emotions.includes(opt.value));

  return (
    <Select
      placeholder="Оберіть категорію"
      options={options}
      value={selected}
      onChange={(newValue) => {
        const ids = (Array.isArray(newValue) ? newValue : []).map(
          (o) => o.value
        );
        setEmotions(ids);
      }}
      isMulti
      name="emotions"
      className={css.EmotionMultiselect}
      classNamePrefix="diarySelect"
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      blurInputOnSelect={false}
      components={{ Option }}
      styles={buildSelectStyles(hasError, accent)}
      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
      menuPosition="fixed"
      isClearable={false}
      isOptionDisabled={(option) =>
        emotions.length >= MAX && !emotions.includes(option.value)
      }
    />
  );
}
