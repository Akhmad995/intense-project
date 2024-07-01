import logo from '../../../public/logo.png';
import search from '../../assets/search.png';
import { Link } from 'react-router-dom';

import s from './style.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.navigation}>
                <Link to={'/'} onClick={(e) => e.preventDefault()}><img src={logo} className={s.logo} alt="Nuntium" /></Link>
                <Link to={'/'}>Home</Link>
                <Link to={'/articles'}>Articles</Link>
            </div>
            <div>
                <img src={search} alt="" />
                <Link to={'/login'} className={s.button}>
                    Login
                </Link>
            </div>
        </header>
    )
}

export default Header