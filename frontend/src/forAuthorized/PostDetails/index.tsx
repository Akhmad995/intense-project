import s from './style.module.css'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { fetchAuthorData, fetchPostData, fetchPostReaction } from "../../store/postsSlice"
import { AppDispatch, RootState } from "../../store";

import like from '../../../public/like.png'
import dontLike from '../../../public/dontLike.png'

import Header from "../Header";
import Comment from '../Comment';

export interface CommentT {
  id: number,
  author: {
    id: string,
    first_name: string,
    last_name: string,
    profile_picture: string,
  }
  body: string,
  created_at: string,
  post: number,
  dovnotes: number,
  score: number,
  upvotes: number,

}

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      let postId = parseInt(id)
      dispatch(fetchPostData(postId));
    }
  }, [id, dispatch]);

  const postData = useSelector((state: RootState) => state.posts.postData)

  let authorId = postData.author.id

  useEffect(() => {
    if (authorId) {
      dispatch(fetchAuthorData(authorId));
      return () => {
        authorId = 0;
      }
    }
  }, [authorId, dispatch]);

  const authorData = useSelector((state: RootState) => state.posts.authorData)

  const createdAtDate = postData.created_at ? new Date(postData.created_at) : null;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let monthString = undefined;
  let day = undefined;
  let year = undefined;

  if (createdAtDate) {
    const month = createdAtDate.getMonth();
    monthString = monthNames[month];
    day = createdAtDate.getDate();
    year = createdAtDate.getFullYear();
  }

  const [liked, setLiked] = useState<null | string>(postData.my_reaction);

  const IdLikedPosts = useSelector((state: RootState) => state.posts.IdlikedPosts);
  const isLiked = IdLikedPosts.includes(postData.id);

  const handleLike = () => {
    const newLikeState = liked ? null : "heart";
    setLiked(newLikeState)

    dispatch(fetchPostReaction({ id: postData.id, likeState: newLikeState }))
  };

  const [comments, setComments] = useState<CommentT[]>([])
  if (comments) console.log(comments)

  useEffect(() => {
    const fetchPostComments = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/comments/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application-json'
        }
      })
      const data = await response.json()
      setComments(data.results)
    }
    fetchPostComments()
  }, [])

  return (
    <div>
      <Header />

      {postData.post_picture ? (
        <img className={s.post_picture} src={postData.post_picture} alt="" />
      ) : (
        <h1 className={s.post_picture}>Изображение недоступно</h1>
      )}

      <div className={s.info}>
        <h1 className={s.title}>{postData.title}</h1>
        <p className={s.intelligence}>{postData?.author?.first_name} {postData?.author?.last_name} <span className={s.point}></span>{monthString} {day}, {year} ({postData?.read_time} mins read)</p>
        <p className={s.description}>{postData.body}</p>
      </div>

      <div className={s.actions}>
        <div onClick={() => handleLike()}>
          {isLiked ?
            <img src={like} alt="" />
            :
            <img src={dontLike} alt="" />
          }
        </div>
      </div>

      <div className={s.author}>
        <p>ABOUT THE AUTHOR</p>
        <div className={s.profile}>
          <img src={authorData?.profile_picture} alt="" />
          <div className={s.author_description}>
            <h2>{authorData?.username}</h2>
            <p>{authorData?.email}</p>
            <p>{authorData?.descr}</p>
          </div>
        </div>
      </div>

      {comments?.map((comment) => {
        return (
          comment.post === postData.id &&
            <Comment key={comment.id} data={comment}/>
        )
      })}

    </div>
  )
}

export default PostDetails