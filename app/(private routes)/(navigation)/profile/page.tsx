'use client';
import '@/app/globals.css';
import styles from './page.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import ProfileAvatar from '@/components/profile/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/profile/ProfileEditForm/ProfileEditForm';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="container">
      <div className={`${styles.card}`}>
        <ProfileAvatar user={user} />
        <ProfileEditForm user={user} />
      </div>
    </div>
  );
}
