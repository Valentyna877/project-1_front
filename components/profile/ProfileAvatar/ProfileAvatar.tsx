'use client';

import { User } from '@/types/user';
import AvatarPicker from '../../common/AvatarPicker/AvatarPicker';
import styles from './ProfileAvatar.module.css';

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <AvatarPicker
      profilePhotoUrl={user?.avatar}
      variant="profile"
    >
      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.email}>{user.email}</p>
    </AvatarPicker>
  );
}
