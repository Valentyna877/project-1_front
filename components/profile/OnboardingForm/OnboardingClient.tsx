'use client';

import { Formik, Form, FormikHelpers, ErrorMessage, Field } from 'formik';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { FORTY_WEEKS, validationSchema } from './OnboardingValidation';
import GenderSelect from '@/components/common/GenderSelect/GenderSelect';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import css from './OnboardingClient.module.css';
import { nextServer } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import { getUser } from '@/lib/api/clientApi';
import Button from '@/components/common/Button/Button';
import { IMask, IMaskInput } from 'react-imask';

interface OnboardingFormValues {
    gender: string;
    dueDate: string;
}

const initialValues: OnboardingFormValues = {
    gender: '',
    dueDate: '',
};

export default function OnboardingClient() {
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const today = new Date();
    const maxDate = new Date(Date.now() + FORTY_WEEKS);
    const handleSubmit = async (
        values: OnboardingFormValues,
        actions: FormikHelpers<OnboardingFormValues>
    ) => {
        try {
            await nextServer.patch('/users/me', {
                gender: values.gender === 'unknown' || values.gender === '' ? null : values.gender,
                date: values.dueDate || new Date(Date.now()+FORTY_WEEKS).toISOString().split('T')[0],
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
                <GenderSelect />
                <ErrorMessage name="gender" component="p" />
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
                    customInput={
                        <IMaskInput
                            mask="DD-MM-YYYY"
                            blocks={{
                                DD: { mask: IMask.MaskedRange, from: 1, to: 31 },
                                MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
                                YYYY: { mask: IMask.MaskedRange, from: new Date().getFullYear(), to: new Date().getFullYear() + 1 },
                            }}
                        />
                    }
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
