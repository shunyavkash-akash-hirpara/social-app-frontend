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
    SEARCHUSER: "/user/serach",
  },
  POST: {
    GET: (id: string) => `/post/${id}`,
    ALLPOST: `/post`,
    POST: `/post`,
    PATCH: (id: string) => `/post/${id}`,
    DELETE: (id: string) => `/post/${id}`,
    POSTBYUSER: (userId: string) => `/post/user/${userId}`,
  },
  LIKE: {
    LIKE: "/like",
    UNLIKE: (itemId: string) => `/like/${itemId}`,
    GETLIKE: (itemId: string) => `/like/${itemId}`,
  },
  COMMENT: {
    POST: "/comment",
    GETCOMMENT: (postId: string) => `/comment/postId/${postId}`,
    GETSUBCOMMENT: (commentId: string) => `/comment/commentId/${commentId}`,
  },
  FOLLOW: {
    FOLLOW: "/follow/follow",
    UNFOLLOW: "/follow/unfollow",
    FOLLOWERS: "/follow/followers",
    FOLLOWING: "/follow/following",
  },
};
