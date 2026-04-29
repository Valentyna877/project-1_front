"use client";

import styles from "./page.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className={styles.card}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
}
