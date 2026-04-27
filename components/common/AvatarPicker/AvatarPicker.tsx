'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';
import { getUser, updateAvatar } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
    profilePhotoUrl?: string | null;
    children?: React.ReactNode;
    layout?: 'vertical' | 'horizontal';
    buttonVariant?: 'onboarding' | 'profile';
};

function AvatarPicker({
    profilePhotoUrl,
    children,
    layout = 'horizontal',
    buttonVariant = 'onboarding',
}: Props) {
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl ?? '');
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();
    useEffect(() => {
        setPreviewUrl(profilePhotoUrl ?? '');
    }, [profilePhotoUrl]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setError('');

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Файл повинен бути зображенням');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('Файл повинен бути менше 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);

        try {
            setLoading(true);
            await updateAvatar(file);
            const userWithNewAva = await getUser();
            console.log('updatedUser:', userWithNewAva);
            if (userWithNewAva.avatar) {
                setUser(userWithNewAva);
                setPreviewUrl(userWithNewAva.avatar);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`${css.picker} ${layout === 'horizontal' ? css.vertical : ''}`}
        >
            {previewUrl && (
                <div className={css.avatarWrapper}>
                    <Image
                        src={previewUrl}
                        alt="Avatar"
                        fill
                        className={css.avatarImage}
                    />
                </div>
            )}

            <div className={css.content}>
                {children}

                <label className={`${css.changeButton} ${css[buttonVariant]}`}>
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

            {error && <p className={css.error}>{error}</p>}
        </div>
    );
}

export default AvatarPicker;


// import { useRef, useState } from "react";
// import css from './AvatarPicker.module.css'
// import { toast } from "sonner";


// interface AvatarPickerProps{
//     onFileChange: (file: File) => void;
// }

// export default function AvatarPicker({ onFileChange }: AvatarPickerProps) {
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [preview, setPreview] = useState<string | null>(null);
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;
//         if (!file.type.startsWith('image/')) {
//             toast.error('Файл повинен бути зображенням');
//             return;
//         }
//         if (file.size > 2 * 1024 * 1024) {
//             toast.error('Файл повинен бути менше 2MB');
//             return;
//         }
//         setPreview(URL.createObjectURL(file));
//         onFileChange(file);
//     };
//     return (
//         <>
//             <input className={css.defaultInput} type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
//                     {preview?<img src={preview}alt='avatar'/>:<div className={css.avatar}></div>}
//                     <button className={css.loadPhotoBtn} type="button" onClick={()=>fileInputRef.current?.click()}>Завантажити фото</button>
//         </>
//     );
// }