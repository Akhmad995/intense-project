import s from './PostDetailsUn.module.scss'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { fetchAuthorData, fetchPostData } from "../../store/postsSlice"
import { AppDispatch, RootState } from "../../store";

import Header from "../HeaderUn";
import Comment from '../CommentUn';

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
      const postId = parseInt(id)
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

  useEffect(() => {
    dispatch(fetchAuthorData(authorId))
  }, [id, dispatch])

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