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
    FOLLOWERS: (friendId: string) => `/follow/${friendId}/followers`,
    FOLLOWING: (friendId: string) => `/follow/${friendId}/following`,
    SUGGESTEDFRIEND: "/follow/suggestedFriends",
  },
  CHAT: {
    CHATLIST: "/chat",
    CHAT: "/chat/chatMessage",
    DELETE: "/chat",
  },
  STORY: {
    GET: "/story",
    POST: "/story",
  },
};
