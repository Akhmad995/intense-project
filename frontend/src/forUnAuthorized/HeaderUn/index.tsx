import s from './style.module.scss'

import logo from '../../../public/logo.png';
import search from '../../assets/search.png';

import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.navigation}>
                <Link to={'/'} onClick={(e) => e.preventDefault()}><img src={logo} className={s.logo} alt="Nuntium" /></Link>
                <NavLink to={'/'} className={({isActive}) => isActive ? s.active : ''}>Home</NavLink>

                <NavLink to={'/articles'} className={({isActive}) => isActive ? s.active : ''}>Articles</NavLink>
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