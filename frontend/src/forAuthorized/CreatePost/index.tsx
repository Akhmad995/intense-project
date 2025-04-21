import s from './CreatePost.module.scss'

import { useForm } from 'react-hook-form'

import Heading from '../../generalComponents/Heading'
import Header from '../Header'
import { useState } from 'react'
import TokenUtils from '../../utils/TokenUtils'
import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../../store/authSlice'

const CreatePost = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | File | null>(null);
  const [readTime, setReadTime] = useState('')
  const [tag, setTag] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ['Спорт', 'Политика', 'Новости', 'Технологии', 'Мода', 'Путешествия', 'Программирование', 'Крипта', 'Игры', 'Литература'];

  const publicPost = useForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStateVariable(e.target, name, value);
  };

  const setStateVariable = (target: HTMLInputElement | HTMLTextAreaElement, name: string, value: string) => {
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'tag':
        setTag(+value)
        break;
      case 'readTime':
        setReadTime(value);
        break;
      case 'image':
        if ('files' in target) {
          const file = target.files![0];
          setImage(file);
        };
        break;
      default:
        break;
    }
  };

  const handleTagClick = (tagIndex: number) => {
    setSelectedTag(tags[tagIndex]);
    setTag(tagIndex + 1);
    publicPost.setValue('tag', tags[tagIndex]);
  };

  console.log({ title, description, tag, image, readTime });

  const handlePublicPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title || '');
      formData.append('body', description || '');
      formData.append('read_time', String(readTime) || '');
      tag !== null && formData.append('category', String(tag) || '1');
      image && formData.append('post_picture', image);

      console.log({ title, description, tag, image, readTime });
      console.log(`Bearer ${TokenUtils.getAccessToken()}`)

      const response = await fetch(`http://127.0.0.1:8000/api/posts/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TokenUtils.getAccessToken()}`
        },
        body: formData
      });

      dispatch(setAccessToken(TokenUtils.getAccessToken()));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка: ${errorData.message || response.statusText}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      return true;
    } catch (e) {
      console.error('Ошибка при отправке поста:', e);
    }
  }

  return (
    <div>
      <Header />

      <Heading name='New Article' />

      <form className={s.createPost} onSubmit={(publicPost.handleSubmit(handlePublicPost))}>
        <input
          className={s.title}
          type='text'
          placeholder='Title'
          {...publicPost.register('title', { required: true })}
          onChange={(e) => handleInputChange(e)}
        />
        <textarea
          className={s.description}
          placeholder='Description'
          {...publicPost.register('description', { required: true })}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          className={s.readTime}
          type="number"
          placeholder='readTime (minutes)'
          {...publicPost.register('readTime', { required: true })}
          onChange={(e) => handleInputChange(e)}
        />

        <h2>Select tag</h2>
        <div
          className={s.tags}
          {...publicPost.register('tag', { required: true })}
        >
          {tags.map((tag, index) => (
            <div
              key={tag}
              className={`${s.tag} ${selectedTag === tag ? s.selected : ''}`}
              onClick={() => handleTagClick(index)}
            >
              #{tag}
            </div>
          ))}
        </div>

        <div className={s.image}>
          <input
            id="image-input"
            type="file" accept="image/*"
            {...publicPost.register('image', { required: true })}
            onChange={(e) => handleInputChange(e)}
          />
          <label htmlFor="image-input" className={s.avatarLabel}>
            {image ?
              (
                <div className={s.avatar}>
                  <img src={typeof image === 'string' ? image : URL.createObjectURL(image as File)} alt="Img" />
                </div>
              )
              : (
                <div className={s.avatar}>
                  <b className={s.avatarPlus}>+</b>
                  <b className={s.avatarText}>UPLOAD IMAGE</b>
                </div>
              )
            }
          </label>
        </div>
        <button className={s.button}>Save</button>
      </form>
    </div>
  )
}

export default CreatePost