import s from './style.module.css'

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { fetchAuthorData, fetchPostData } from "../../store/postsSlice"
import { AppDispatch, RootState } from "../../store";

import Header from "../HeaderUn";

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

  const authorId = postData.author.id

  useEffect(() => {
    dispatch(fetchAuthorData(authorId))
  }, [id, dispatch])

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
        <h2>Чтобы увидеть Автора данного поста необходимо авторизироваться</h2>
      </div>

    </div>
  )
}

export default PostDetails