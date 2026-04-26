// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import css from './AvatarPicker.module.css';
// import { getMe, updateAvatar } from '@/lib/api/clientApi';
// import { useAuthUserStore } from '@/lib/store/authStore';

// type Props = {
//   profilePhotoUrl?: string | null;
//   children?: React.ReactNode;
//   layout?: 'vertical' | 'horizontal';
//   buttonVariant?: 'onboarding' | 'profile';
// };

// function AvatarPicker({
//   profilePhotoUrl,
//   children,
//   layout = 'horizontal',
//   buttonVariant = 'onboarding',
// }: Props) {
//   const [error, setError] = useState('');
//   const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl ?? '');
//   const [loading, setLoading] = useState(false);
//   const { setUser } = useAuthUserStore();
//   useEffect(() => {
//     setPreviewUrl(profilePhotoUrl ?? '');
//   }, [profilePhotoUrl]);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setError('');

//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       setError('Only images');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError('Max file size 5MB');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => setPreviewUrl(reader.result as string);
//     reader.readAsDataURL(file);

//     try {
//       setLoading(true);
//       await updateAvatar(file);
//       const userWithNewAva = await getMe();
//       console.log('updatedUser:', userWithNewAva);
//       if (userWithNewAva.photo) {
//         setUser(userWithNewAva);
//         setPreviewUrl(userWithNewAva.photo);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`${css.picker} ${layout === 'vertical' ? css.vertical : ''}`}
//     >
//       {previewUrl && (
//         <div className={css.avatarWrapper}>
//           <Image
//             src={previewUrl}
//             alt="Avatar"
//             fill
//             className={css.avatarImage}
//           />
//         </div>
//       )}

//       <div className={css.content}>
//         {children}

//         <label className={`${css.changeButton} ${css[buttonVariant]}`}>
//           {loading ? 'Завантаження...' : 'Завантажити нове фото'}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             disabled={loading}
//             hidden
//           />
//         </label>
//       </div>

//       {error && <p className={css.error}>{error}</p>}
//     </div>
//   );
// }

// export default AvatarPicker;