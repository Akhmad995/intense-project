import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import s from './style.module.css';
import Header from '../Header';

const LoginPage = () => {
  const [authorized, setAuthorized] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signInForm = useForm();
  const signUpForm = useForm();

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

  const onSubmitSignIn = (data: any) => {
    console.log(data);
  };

  const onSubmitSignUp = (data: any) => {
    console.log(data);
  };

  return (
    <div className={s.LoginPage}>
      <Header />

      <main className={s.main}>
        {authorized &&
          <form className={s.form} onSubmit={signInForm.handleSubmit(onSubmitSignIn)}>
            <h1>Sign in</h1>
            <p>Sign in to get the most out of nuntium.</p>

            <section>
              <div className={s.formField}>
                <input
                  className={s.userName}
                  type="text"
                  placeholder="UserName"
                  {...signInForm.register('userName', { required: true })}
                  value={userName}
                  onChange={handleInputChange}
                />
              </div>

              <div className={s.formField}>
                <input
                  className={s.password}
                  type="password"
                  placeholder="Password"
                  {...signInForm.register('password', { required: true })}
                  value={password}
                  onChange={handleInputChange}
                />
              </div>

              <button className={s.button}>Login</button>
              <button className={s.button} onClick={() => setAuthorized(false)}>Sign Up</button>
            </section>
          </form>
        }

        {!authorized &&
          <form className={s.form} onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}>
            <h1>Welcome!</h1>
            <p>Sign up to get the most out of nuntium.</p>

            <section>
              <div className={s.formField}>
                <input
                  className={s.userName}
                  type="text"
                  placeholder="Username"
                  {...signUpForm.register('username', {
                    required: true,
                    pattern: /^[a-zA-Z0-9_]+$/
                  })}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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

              <button className={s.button}>Start</button>
              <button className={s.button} onClick={() => setAuthorized(true)}>Sign in</button>
            </section>
          </form>
        }

      </main>
    </div>
  );
};

export default LoginPage;