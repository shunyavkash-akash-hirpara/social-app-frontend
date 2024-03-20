import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User{
  name:string, username:string, email:string, profile_img:string,mobileNumber:string, role: string 
}
interface AuthState {
  user: User; 
  accessToken: string;
  userId: string;
  setProfile: boolean;
  logout: ()=> void;
  login: ({ user, accessToken, userId }:{ user:User, accessToken:string, userId:string })=> void;
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      user: { name: "" ,username:'', email:'', profile_img:'',mobileNumber:'',role: ''},
      accessToken: "",
      userId: "",
      setProfile: false,
      login: ({ user, accessToken, userId }:{ user:User, accessToken:string, userId:string }) => {
        set((state) => ({
          ...state,
          user,
          accessToken,
          userId,
        }));
      },
      logout: () =>
        set(() => ({
          user: {name:'',username:'', email:'', profile_img:'',mobileNumber:'',role: '' },
          accessToken: "",
          userId: "",
          setProfile: false,
        })),
      setUserDatail: (name:string, profile_img:string) => {
        set((state) => ({
          ...state,
          user: { ...state.user, name, profile_img },
        }));
      },
      setUserProfile: (setProfile:boolean) => {
        set((state) => ({ ...state, setProfile }));
      },
      setUserProfileImg: (profile_img:string) => {
        set((state) => ({ ...state, user: { ...state.user, profile_img } }));
      },
      setMobile: (mobile:string) => {
        set((state) => ({
          ...state,
          user: { ...state.user, mobile },
        }));
      },
      setAccessToken: (accessToken:string) =>
        set((state:object) => ({ ...state, accessToken })),
    }),
    { name: "auth" }
  )
);
