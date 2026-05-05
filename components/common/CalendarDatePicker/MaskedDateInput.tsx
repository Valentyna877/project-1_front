import React, { forwardRef } from 'react';
import { IMask, IMaskInput } from 'react-imask';

const maskBlocksConfig = (() => {
  const currentYear = new Date().getFullYear();
  return {
    DD: { mask: IMask.MaskedRange, from: 1, to: 31 },
    MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
    YYYY: {
      mask: IMask.MaskedRange,
      from: currentYear,
      to: currentYear + 2,
    },
  };
})();

type MaskedDateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onAcceptValue?: (value: string) => void;
};

const MaskedDateInput = forwardRef<HTMLInputElement, MaskedDateInputProps>(
  function MaskedDateInput(
    { onAcceptValue, value, onChange, placeholder, ...rest },
    ref
  ) {
    return (
      <IMaskInput
        {...rest}
        placeholder={placeholder ?? 'дд.мм.рррр'}
        mask="DD.MM.YYYY"
        blocks={maskBlocksConfig}
        value={(value as string) ?? ''}
        inputRef={ref as React.RefObject<HTMLInputElement>}
        onAccept={(v) => onAcceptValue?.(v as string)}
      />
    );
  }
);

export default MaskedDateInput;