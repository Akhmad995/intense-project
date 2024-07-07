import logo from '../../../public/logo.png';
import search from '../../assets/search.png';
import { Link, NavLink } from 'react-router-dom';
import profile from '../../assets/profile.jpg'

import s from './style.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.navigation}>
                <Link to={'/'} className={s.logo} onClick={(e) => e.preventDefault()}><img src={logo} alt="Nuntium" /></Link>
                <NavLink to={'/'} className={({isActive}) => isActive ? s.active : ''}>Home</NavLink>

                <NavLink to={'/articles'} className={({isActive}) => isActive ? s.active : ''}>Articles</NavLink>
                <NavLink to={'/favourites'} className={({isActive}) => isActive ? s.active : ''}>Favourites</NavLink>
            </div>
            <div>
                <img src={search} alt="" />
                <Link to={'/profile'} className={s.profile}>
                    <img src={profile} alt="" />
                </Link>
            </div>
        </header>
    )
}

export default Header