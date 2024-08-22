import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import s from './style.module.css';
import Header from '../HeaderUn';
import TokenUtils from '../../utils/TokenUtils';

type CardDetailsProps = {
  setAuthorized: (authorized: boolean) => void
}

const LoginPage = (props: CardDetailsProps) => {
  const [enter, setEnter] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
      default:
        break;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://94.103.93.227/api/token/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password }),
      });
      
      const data = await response.json();
      console.log(data);

      TokenUtils.storeTokens(data.access, data.refresh);

      // Получение ID пользователя
      const responseUser = await fetch(`http://94.103.93.227/api/users/me/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${data.access}` },
      });

      const userData = await responseUser.json();
      console.log(userData);

      props.setAuthorized(true);
      localStorage.setItem('authorized', 'true')
      navigate('/');
      return true
    } catch (error) {
      console.error(error);
      setErrorLog(true)
    }
  };

  const handleRegister = async () => {
    try {
      console.log({ userName, password, email })
      const response = await fetch(`http://94.103.93.227/api/users/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password, email })
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
    }, 1000 * 60);

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
                <div className={s.formField}>
                  <input
                    className={s.userName}
                    type="text"
                    placeholder="Username"
                    {...signUpForm.register('userName', {
                      required: true,
                      pattern: /^[a-zA-Z0-9_]+$/
                    })}
                    value={userName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {signUpForm.formState.errors.username && (
                    <p className="error">Имя пользователя должно быть только на латинском</p>
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

                {successfullyReg &&
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