'use client';

import { Formik, Form, FormikHelpers, ErrorMessage, Field } from 'formik';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { FORTY_WEEKS, validationSchema } from './OnboardingValidation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import css from './OnboardingClient.module.css';
import { nextServer } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import { getUser } from '@/lib/api/clientApi';
import Button from '@/components/common/Button/Button';
import FormikGenderSelect from '@/components/common/GenderSelect/FormikGenderSelect';
import { GenderValue } from '@/components/common/GenderSelect/gender-select.types'
import { onboardingGenderStyles } from '@/components/common/GenderSelect/gender-select.styles';
import { useState } from 'react';

interface OnboardingFormValues {
    gender: GenderValue | null;
    dueDate: string;
}

const initialValues: OnboardingFormValues = {
    gender: null,
    dueDate: '',
};

export default function OnboardingClient() {
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const [today] = useState(() => new Date());
    const [maxDate] = useState(() => new Date(Date.now() + FORTY_WEEKS));

    function formatLocalDate(d: Date): string {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const handleSubmit = async (
        values: OnboardingFormValues,
        actions: FormikHelpers<OnboardingFormValues>
    ) => {
        try {
            await nextServer.patch('/users/me', {
                gender: values.gender === 'unknown' ? null : values.gender,
                date: values.dueDate || formatLocalDate(new Date(Date.now() + FORTY_WEEKS)),

            });
            const updateUser = await getUser();
            setUser(updateUser);
            actions.resetForm();
            router.push('/');
        } catch {
            toast.error('Щось пішло не так. Спробуйте ще раз.');
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <AvatarPicker profilePhotoUrl={user?.avatar} />
                <div className={css.genderWrapper}>
                    <label className={css.label}>Стать дитини</label>
                    <FormikGenderSelect styles={onboardingGenderStyles} />
                </div>
                <Field
                    name='dueDate'
                    component={CalendarDatePicker}
                    placeholderText='Оберіть дату'
                    className={css.datePicker}
                    minDate={today}
                    maxDate={maxDate}
                    dateFormat="dd-MM-yyyy"
                    label="Планова дата пологів"
                    labelClassName={css.label}
                />
                <ErrorMessage name="dueDate" component="p" />
                <Button
                    className={css.submitBtn}
                    type="submit"
                    variant="normal"
                    size="lg"
                >
                    Зберегти
                </Button>
            </Form>
        </Formik>
    )
}
