'use client'

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { GENDER } from './OnboardingContent';
import { useState } from 'react';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { FORTY_WEEKS, validationSchema } from './OnboardingValidation';

interface OnboardingFormValues{
    gender: string;
    dueDate: string;
}

const initialValues: OnboardingFormValues = {
    gender: '',
    dueDate: "",
}

export default function OnboardingClient() {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + FORTY_WEEKS).toISOString().split('T')[0];
    const handleSubmit = async (
        values: OnboardingFormValues,
        actions: FormikHelpers<OnboardingFormValues>
    ) => {
        if (avatarFile) {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            await fetch('/api/users/me/avatar', { method: 'PATCH', body: formData, credentials: 'include', });
            }
        await fetch('/api/users/me', {method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gender: values.gender === '' ? null : values.gender, date: values.dueDate, }), credentials: 'include',
        });
        actions.resetForm();
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <h2>Давайте познаймимось ближче</h2>
                <AvatarPicker onFileChange={(file) => setAvatarFile(file)} />
                <Field as="select" name="gender">{GENDER.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}</Field>
                <ErrorMessage name='gender' component='p'/>
                <CalendarDatePicker minDate={today} maxDate={maxDate} />
                <ErrorMessage name='dueDate' component='p' />
                <button type='submit'>Зберегти</button>
            </Form>
        </Formik>
    );
}