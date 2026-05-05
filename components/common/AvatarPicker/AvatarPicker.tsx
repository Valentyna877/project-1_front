'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';
import { getUser, updateAvatar } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import clsx from 'clsx';
import { useTheme, Theme } from '@/hooks/useTheme';

type Props = {
    profilePhotoUrl?: string | null;
    children?: React.ReactNode;
    variant?: 'onboarding' | 'profile';
    themeOverride?: Theme;
};

function AvatarPicker({
    profilePhotoUrl,
    children,
    variant = 'onboarding',
    themeOverride,
}: Props) {
    const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl ?? '');
    const [loading, setLoading] = useState(false);

    const setUser = useAuthStore((state) => state.setUser);
    const { themeClass: globalThemeClass } = useTheme();
    const themeClass = themeOverride ? `theme-${themeOverride}` : globalThemeClass;

    useEffect(() => {
        setPreviewUrl(profilePhotoUrl ?? '');
    }, [profilePhotoUrl]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            ToastProvider.error('Файл повинен бути зображенням');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            ToastProvider.error('Розмір фото не повинен перевищувати 2 МБ');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);

        try {
            setLoading(true);
            await updateAvatar(file);
            const userWithNewAva = await getUser();
            if (userWithNewAva.avatar) {
                setUser(userWithNewAva);
                setPreviewUrl(userWithNewAva.avatar);
                ToastProvider.success('Фото успішно оновлено');
            }
        } catch (err) {
            console.error(err);
            ToastProvider.error('Не вдалось завантажити аватар');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${css.picker} ${css[variant]}`}>
            {previewUrl && (
                <div className={css.avatarWrapper}>
                    <Image
                        src={previewUrl}
                        alt="Avatar"
                        fill
                        sizes="132px"
                        className={css.avatarImage}
                    />
                </div>
            )}
            <div className={css.content}>
                {children}
                <label className={clsx(css.changeButton, css[`${variant}Button`],
                    css[themeClass],
                    loading && css.disabled)}
                >
                    {loading ? 'Завантаження...' : 'Завантажити нове фото'}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                        hidden
                    />
                </label>
            </div>
        </div>
    );
}

export default AvatarPicker;