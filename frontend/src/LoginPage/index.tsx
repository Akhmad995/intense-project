import { useState } from 'react'

import logo from '../../public/logo.png'
import search from '../assets/search.png'
import s from './style.module.css'

const LoginPage = () => {
    const [authorized, setAuthorized] = useState(true)

    return (
        <div className={s.LoginPage}>
            <header className={s.header}>
                <div className={s.navigation}>
                    <a href="" onClick={(e) => e.preventDefault()}><img src={logo} className={s.logo} alt="Nuntium" /></a>
                    <a href="">Home</a>
                    <a href="">Articles</a>
                </div>
                <div>
                    <img src={search} alt="" />
                    <button className={s.button}>Login</button>
                </div>
            </header>


            <main className={s.main}>
                {authorized &&
                    <form className={s.form}>
                        <h1>Sign in</h1>
                        <p>Sign in to get the most out of nuntium.</p>

                        <section>
                            <div className={s.formField}>
                                <input className={s.userName} type="text" placeholder="UserName" />
                            </div>

                            <div className={s.formField}>
                                <input className={s.password} type="text" placeholder="Password" />
                            </div>

                            <button className={s.button}>Login</button>
                            <button className={s.button} onClick={() => setAuthorized(false)}>Sign Up</button>
                        </section>
                    </form>
                }

                {!authorized &&
                    <form className={s.form}>
                        <h1>Welcome!</h1>
                        <p>Sign up to get the most out of nuntium.</p>

                        <section>
                            <div className={s.formField}>
                                <input className={s.userName} type="text" placeholder="UserName" />
                            </div>

                            <div className={s.formField}>
                                <input className={s.userEmail} type="text" placeholder="UserName" />
                            </div>

                            <div className={s.formField}>
                                <input className={s.password} type="text" placeholder="Password" />
                            </div>

                            <div className={s.formField}>
                                <input className={s.password} type="text" placeholder="Confirm password" />
                            </div>

                            <button className={s.button}>Start</button>
                            <button className={s.button} onClick={() => setAuthorized(true)}>Sign in</button>
                        </section>
                    </form>
                }

            </main>



        </div>
    )
}

export default LoginPage