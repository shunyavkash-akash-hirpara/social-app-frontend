import React, { useCallback, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import SingleFeed from "../Component/SingleFeed";
import { useParams } from "react-router-dom";

interface posts {
  _id: string;
  user: {
    _id: string;
    username: string;
    profileImg: string;
    city?: string;
    country?: string;
  };
  description?: string;
  mentionedUsers: {
    _id: string;
    username: string;
    name: string;
    profileImg: string;
  }[];
  photos: { _id: string; url: string; type: string }[];
  like: number;
  comment: number;
  isLike: boolean;
}
[];

export default function UserPostList(): React.JSX.Element {
  const [posts, setPosts] = useState<posts[]>([]);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const id: string = useParams().id as string;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPosts = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.POST.POSTBYUSER(id),
        method: "get",
      });
      if (res.status === 200) {
        setPosts(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, id, setSnack]);

  useEffect(() => {
    if (!id) return;
    getPosts();
  }, [getPosts, id]);

  return (
    <>
      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-[580px] mx-[auto] overflow-y-auto p-6 pt-0">
          {/* feed data */}
          {posts.length > 0 &&
            posts.map((post) => <SingleFeed post={post} key={post._id} />)}
        </div>
      </main>
    </>
  );
}
