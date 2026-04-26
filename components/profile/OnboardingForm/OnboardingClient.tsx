'use client'

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useState } from 'react';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { FORTY_WEEKS, validationSchema } from './OnboardingValidation';
import GenderSelect from '@/components/common/GenderSelect/GenderSelect';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import css from './OnboardingClient.module.css'
import { nextServer } from '@/lib/api/api';

interface OnboardingFormValues{
    gender: string;
    dueDate: string;
}

const initialValues: OnboardingFormValues = {
    gender: '',
    dueDate: "",
}

export default function OnboardingClient() {
    const router = useRouter();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const today = new Date();
    const maxDate = new Date(Date.now() + FORTY_WEEKS);
    const handleSubmit = async (
        values: OnboardingFormValues,
        actions: FormikHelpers<OnboardingFormValues>
    ) => {
        try {
            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                await nextServer.patch('/users/me/avatar', formData);
            }
            await nextServer.patch('/users/me', {
                gender: values.gender === 'unknown' ? null : values.gender,
                date: values.dueDate,
            });
            actions.resetForm();
            router.push('/');
        } catch {
            toast.error('Щось пішло не так. Спробуйте ще раз.');
        }
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <AvatarPicker onFileChange={(file) => setAvatarFile(file)} />
                <GenderSelect />
                <ErrorMessage name='gender' component='p'/>
                <CalendarDatePicker minDate={today} maxDate={maxDate} />
                <ErrorMessage name='dueDate' component='p' />
                <button className={css.submitBtn} type='submit'>Зберегти</button>
            </Form>
        </Formik>
    );
}