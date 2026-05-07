import { useField } from 'formik';
import GenderSelect from './GenderSelect';
import { GenderValue, GenderOption } from './gender-select.types';
import { StylesConfig } from 'react-select';

type Props = {
  name?: string;
  styles?: StylesConfig<GenderOption, false>;
  themeClass?: string;
};

export default function FormikGenderSelect({
  name = 'gender',
  themeClass,
}: Props) {
  const [field, , helpers] = useField<GenderValue | null>(name);
  return (
    <GenderSelect
      value={field.value}
      onChange={helpers.setValue}
      themeClass={themeClass}
    />
  );
}
