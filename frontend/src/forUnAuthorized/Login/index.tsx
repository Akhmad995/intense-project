import s from './Login.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { setAccessToken, setAuthorized, setRefreshToken, fetchUserData } from '../../store/authSlice';

import Header from '../HeaderUn';
import TokenUtils from '../../utils/TokenUtils';

const LoginPage = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const [enter, setEnter] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string | File | null>(null);

  const [errorLog, setErrorLog] = useState(false)
  const [successfullyReg, setSuccessfullyReg] = useState(false)

  const signInForm = useForm();
  const signUpForm = useForm();

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'avatar':
        const file = e.target.files![0];
        setAvatar(file);
        break;
      default:
        break;
    }
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('password', password);

      const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TokenUtils.getAccessToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Неправильно введен логин или пароль')
      }

      const data = await response.json();
      console.log(data);

      TokenUtils.storeTokens(data.access, data.refresh);

      dispatch(setAccessToken(TokenUtils.getAccessToken()));
      dispatch(setRefreshToken(TokenUtils.getRefreshToken()));

      dispatch(fetchUserData(data.access));

      dispatch(setAuthorized())
      navigate('/');
      return true
    } catch (error) {
      console.error(error);
      setErrorLog(true)
    }
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('password', password);
      formData.append('email', email);
      if (avatar) {
        formData.append('profile_picture', avatar);
      }
      console.log({ userName, password, email, avatar })
      const response = await fetch(`http://127.0.0.1:8000/api/users/`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      console.log(data);
      setSuccessfullyReg(true)
      return true
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const accessToken = TokenUtils.getAccessToken();
      if (!accessToken) {
        return;
      }

      const now = new Date().getTime() / 1000;
      const expiresIn = TokenUtils.getAccessTokenExpiration(accessToken);
      if (expiresIn - now < 60) {
        TokenUtils.refreshTokens();
      }
    }, 1000 * 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={s.LoginPage}>
      <Header />

      <main className={s.main}>
        {enter &&
          <div>
            <form className={s.form} onSubmit={signInForm.handleSubmit(handleLogin)}>
              <h1>Sign in</h1>
              <p>Sign in to get the most out of nuntium.</p>

              <section>
                <div>
                  <div className={s.formField}>
                    <input
                      className={s.userName}
                      type="text"
                      placeholder="UserName"
                      {...signInForm.register('userName', { required: true })}
                      value={userName}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>

                  <div className={s.formField}>
                    <input
                      className={s.password}
                      type="password"
                      placeholder="Password"
                      {...signInForm.register('password', { required: true })}
                      value={password}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  {errorLog &&
                    <div>
                      <p>неправильно введен логин или пароль</p>
                    </div>}
                </div>

                <button className={s.button}>Login</button>
              </section>
            </form>
            <button className={s.button} onClick={() => setEnter(false)}>Sign Up</button>
          </div>
        }

        {!enter &&
          <div>

            <form className={s.form} onSubmit={signUpForm.handleSubmit(handleRegister)}>
              <h1>Welcome!</h1>
              <p>Sign up to get the most out of nuntium.</p>

              <section>
                <div className={s.formFieldImage}>
                  <input
                    id="avatar-input"
                    type="file" accept="image/*"
                    {...signUpForm.register('avatar', { required: true })}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <label htmlFor="avatar-input" className={s.avatarLabel}>
                    {avatar && (
                      <div className={s.avatar}>
                        <img src={URL.createObjectURL(avatar as File)} alt="Avatar" />
                      </div>
                    )}
                    {!avatar && (
                      <div className={s.avatar}>
                        <b className={s.avatarPlus}>+</b>
                        <b className={s.avatarText}>Avatar</b>
                      </div>
                    )}
                  </label>
                  {signUpForm.formState.errors.avatar && (
                    <p className="error">Добавьте фото</p>
                  )}
                </div>

                <div className={s.formField}>
                  <input
                    className={s.userName}
                    type="text"
                    placeholder="UserName"
                    {...signUpForm.register('userName', {
                      required: true,
                      pattern: /^[a-zA-Z0-9_]+$/,
                      validate: (value) => value.length >= 2
                    })}
                    value={userName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {signUpForm.formState.errors.userName && (
                    <p className="error">Имя пользователя должно быть только на латинском <br /> a длина состоять не меньше чем из 2 букв</p>
                  )}
                </div>

                <div className={s.formField}>
                  <input
                    className={s.userEmail}
                    type="email"
                    placeholder="Email"
                    {...signUpForm.register('email', {
                      required: true,
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    })}
                    value={email}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {signUpForm.formState.errors.email && (
                    <p className="error">Введите почту правильно</p>
                  )}
                </div>

                <div className={s.formField}>
                  <input
                    className={s.password}
                    type="password"
                    placeholder="Password"
                    {...signUpForm.register('password', {
                      required: true,
                      validate: (value) => value.length >= 8
                    })}
                    value={password}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {signUpForm.formState.errors.password && (
                    <p className="error">Длина пароля должна быть не меньше 8</p>
                  )}
                </div>

                <div className={s.formField}>
                  <input
                    className={s.password}
                    type="password"
                    placeholder="Confirm password"
                    {...signUpForm.register('confirmPassword', {
                      required: true,
                      validate: (value) => value === password
                    })} />
                  {signUpForm.formState.errors.confirmPassword && (
                    <p className="error">Пароль не совпадает</p>
                  )}
                </div>

                {successfullyReg && !signUpForm.formState.errors.userName &&
                  <div>
                    <p>вы успешно зарегестрированы</p>
                  </div>
                }

                <button className={s.button}>Start</button>
              </section>
            </form>
            <button className={s.button} onClick={() => setEnter(true)}>Sign in</button>
          </div>
        }

      </main>
    </div>
  );
};

export default LoginPage;