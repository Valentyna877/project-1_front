export type GenderValue = 'boy' | 'girl' | 'unknown';

export type GenderOption = {
    // value: 'boy' | 'girl' | 'unknown';
    value: GenderValue;
    label: string;
};

export const genderOptions: GenderOption[] = [
    { value: 'boy', label: 'Хлопчик' },
    { value: 'girl', label: 'Дівчинка' },
    { value: 'unknown', label: 'Ще не знаю' },
];