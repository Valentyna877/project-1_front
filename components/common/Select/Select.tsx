// 'use client';

// import { useEffect, useState } from 'react';
// import Select, { SingleValue } from 'react-select';
// import {
//   genderOptions,
//   GenderOption,
//   genderSelectStyles,
// } from '../../profile/OnboardingForm/OnboardingContent';

// type Props = {
//   value: 'boy' | 'girl' | 'unknown' | null;
//   onChange: (value: 'boy' | 'girl' | 'unknown' | null) => void;
// };

// function GenderSelect({ value, onChange }: Props) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setMounted(true);
//     }, 0);
    
//     return () => clearTimeout(timeout);
//   }, []);

//   const selectedOption = genderOptions.find((o) => o.value === value) ?? null;

//   const handleChange = (option: SingleValue<GenderOption>) => {
//     onChange(option ? option.value : null);
//   };

//   if (!mounted) {
//     return <div style={{ minHeight: '40px', border: '1px solid #ddd' }} />;
//   }

//   return (
//     <Select
//       instanceId="gender-select"
//       classNamePrefix="react-select"
//       options={genderOptions}
//       placeholder="Оберіть стать дитини"
//       isSearchable={false}
//       styles={genderSelectStyles}
//       value={selectedOption}
//       onChange={handleChange}
//     />
//   );
// }

// export default GenderSelect;