import Select from 'react-select';
import css from './MultiSelect.module.css';
import { Emotions } from '@/lib/api/clientApi';
type Props = {
  value: Emotions[];
};

export default function MultiSelect({ value }: Props) {
  const options = value?.map((option) => {
    const obj = {
      value: option.title,
      label: option.title,
    };
    return obj;
  });

  return (
    <Select
      placeholder="Оберіть категорію"
      options={options}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      required={true}
      isMulti
      name="emotions"
      className={css.EmotionMultiselect}
    />
  );
}
