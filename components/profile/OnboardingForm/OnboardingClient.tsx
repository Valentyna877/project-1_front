'use client'

import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import AvatarPicker from '@/components/common/AvatarPicker/AvatarPicker';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { FORTY_WEEKS, validationSchema } from './OnboardingValidation';
import GenderSelect from '@/components/common/GenderSelect/GenderSelect';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import css from './OnboardingClient.module.css'
import { nextServer } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import { getUser } from '@/lib/api/clientApi';
import Button from '@/components/common/Button/Button';

interface OnboardingFormValues{
    gender: string;
    dueDate: string;
}

const initialValues: OnboardingFormValues = {
    gender: '',
    dueDate: "",
}

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
            // if (avatarFile) {
            //     const formData = new FormData();
            //     formData.append('avatar', avatarFile);
                // await nextServer.patch('/users/me/avatar', formData);
            //     const { data } = await nextServer.patch('/users/me', {
            //         gender: values.gender || null,
            //         date: values.dueDate,
            //     });
            //     setUser(data);
            // }
            await nextServer.patch('/users/me', {
                gender: values.gender === 'unknown' ? null : values.gender,
                date: values.dueDate,
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={css.form}>
                <AvatarPicker profilePhotoUrl={user?.avatar}/>
                <GenderSelect />
                <ErrorMessage name='gender' component='p'/>
                <CalendarDatePicker minDate={today} maxDate={maxDate} />
                <ErrorMessage name='dueDate' component='p' />
                <Button type='submit'>Зберегти</Button>
            </Form>
        </Formik>
    );
}