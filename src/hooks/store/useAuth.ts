import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  username: string;
  email: string;
  profileImg?: string;
  mobileNumber?: string;
  role: string;
}
interface AuthState {
  user: User;
  accessToken: string;
  userId: string;
  setProfile: boolean;
  isLoggedIn: boolean;
  logout: () => void;
  login: ({
    user,
    accessToken,
    userId,
    isLoggedIn,
  }: {
    user: User;
    accessToken: string;
    userId: string;
    isLoggedIn: boolean;
  }) => void;
  setAccessToken: (accessToken: string) => void;
  setUserDatail: (username: string, profileImg: string) => void;
  notificationPermission: boolean;
  fcmToken: string;
  setNotification: (fcmToken: string, notificationPermission: boolean) => void;
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      user: {
        name: "",
        username: "",
        email: "",
        profileImg: "",
        mobileNumber: "",
        role: "",
      },
      accessToken: "",
      userId: "",
      setProfile: false,
      isLoggedIn: false,
      notificationPermission: undefined,
      fcmToken: undefined,
      login: ({
        user,
        accessToken,
        userId,
        isLoggedIn,
      }: {
        user: User;
        accessToken: string;
        userId: string;
        isLoggedIn: boolean;
      }) => {
        set((state) => ({
          ...state,
          user,
          accessToken,
          userId,
          isLoggedIn,
        }));
      },
      logout: () =>
        set(() => ({
          user: {
            name: "",
            username: "",
            email: "",
            profileImg: "",
            mobileNumber: "",
            role: "",
          },
          accessToken: "",
          userId: "",
          setProfile: false,
          isLoggedIn: false,
          notificationPermission: undefined,
          fcmToken: undefined,
        })),
      setUserDatail: (username: string, profileImg: string) => {
        set((state) => ({
          ...state,
          user: { ...state.user, username, profileImg },
        }));
      },
      setUserProfile: (setProfile: boolean) => {
        set((state) => ({ ...state, setProfile }));
      },
      setUserProfileImg: (profileImg: string) => {
        set((state) => ({ ...state, user: { ...state.user, profileImg } }));
      },
      setMobile: (mobile: string) => {
        set((state) => ({
          ...state,
          user: { ...state.user, mobile },
        }));
      },
      setAccessToken: (accessToken: string) =>
        set((state: object) => ({ ...state, accessToken })),
      setNotification: (fcmToken: string, notificationPermission: boolean) =>
        set(() => ({ fcmToken, notificationPermission })),
    }),
    { name: "auth" }
  )
);
