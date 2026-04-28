"use client";

import css from "./UserBar.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmationModal from "@/components/common/ConfirmationModal/ConfirmationModal";
import Loader from "@/components/common/Loader/Loader";
import { createPortal } from "react-dom";

export default function UserBar() {
  const { user, clearIsAuthenticated } = useAuthStore();
  const { isLogoutModalOpen, openLogoutModal, closeLogoutModal } =
    useSidebarStore();
  const loaderTheme = user?.gender ?? "default";

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      clearIsAuthenticated();
      router.push("/");
    },
    onError: (err) => {
      console.error("Logout error", err);
    },
  });

  const handleConfirm = () => {
    closeLogoutModal();
    close();
    mutate();
  };

  if (!user) return null;

  return (
    <>
      {isPending &&
        createPortal(
          <Loader theme={loaderTheme} variant="global" />,
          document.body,
        )}

      <div className={css.user_bar_container}>
        <div className={css.user_bar_info}>
          <Image
            src={user.avatar}
            alt="avatar"
            width={40}
            height={40}
            className={css.avatar}
          />

          <div>
            <div className={css.userbar_username}>{user.name}</div>
            <div className={css.userbar_useremail}>{user.email}</div>
          </div>
        </div>

        {/* LOGOUT */}
        <button className={css.userbar_logout_btn} onClick={openLogoutModal}>
          <svg className={css.userbar_logout_icon} width={24} height={24}>
            <use href="/sprite.svg#icon-logout"></use>
          </svg>
        </button>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title={"Ви точно хочете вийти?"}
        confirmButtonText={"Так"}
        cancelButtonText={"Ні"}
        onConfirm={handleConfirm}
        onCancel={closeLogoutModal}
        confirmButtonVariant={"logout"}
      />
    </>
  );
}
