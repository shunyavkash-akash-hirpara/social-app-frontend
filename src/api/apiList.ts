export const APIS = {
  AUTHENTICATION: {
    SIGNUP: "/user",
    SIGNIN: "/user/login",
  },
  USER: {
    GET: (id: string) => `/user/${id}`,
    PATCH: (id: string) => `/user/${id}`,
    DELETE: (id: string) => `/user/${id}`,
    CHANGEPASSWORD: "/user/changePassword",
    CHECKUSERNAME: "/user",
  },
  POST: {
    GET: (id: string) => `/post/${id}`,
    ALLPOST: `/post`,
    POST: `/post`,
    PATCH: (id: string) => `/post/${id}`,
    DELETE: (id: string) => `/post/${id}`,
    POSTBYUSER: (userId: string) => `/post/user/${userId}`,
  },
};
