import s from './style.module.css'
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from '../../../public/logo.png';
import search from '../../assets/search.png';

import { setAuthorized } from "../../store/authSlice";
import { RootState } from '../../store';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state: RootState) => state.auth.userData);

    const [isProfileHovered, setProfileHovered] = useState(false);
    const [isWindowHovered, setWindowHovered] = useState(false);

    const handleClick = () => {
        dispatch(setAuthorized())
        navigate('/')
    }

    const handleProfileMouseOver = () => {
        setProfileHovered(true);
    }

    const handleProfileMouseOut = () => {
        setTimeout(() => {
            setProfileHovered(false);
        }, 1000);
    }

    const handleWindowMouseOver = () => {
        setWindowHovered(true);
    }

    const handleWindowMouseOut = () => {
        setWindowHovered(false);
    }

    return (
        <header className={s.header}>
            <div className={s.navigation}>
                <Link to={'/'} className={s.logo} onClick={(e) => e.preventDefault()}><img src={logo} alt="Nuntium" /></Link>
                <NavLink to={'/'} className={({ isActive }) => isActive ? s.active : ''}>Home</NavLink>

                <NavLink to={'/articles'} className={({ isActive }) => isActive ? s.active : ''}>Articles</NavLink>
                <NavLink to={'/favourites'} className={({ isActive }) => isActive ? s.active : ''}>Favourites</NavLink>
            </div>
            <div className={s.infoProfile}>
                <img src={search} alt="" />
                <Link to={'/profile'} className={s.profile} onMouseOver={handleProfileMouseOver} onMouseOut={handleProfileMouseOut}>
                    <img src={userData?.profile_picture} alt="" />
                </Link>
                <div className={s.window} onMouseOver={handleWindowMouseOver} onMouseOut={handleWindowMouseOut} style={{ display: (isProfileHovered || isWindowHovered) ? 'flex' : 'none' }}>
                    <div className={s.shortInfo}>
                        {userData && (
                            <>
                                <p>{userData?.username}</p>
                                <p>{userData?.email}</p>
                            </>
                        )}
                    </div>
                    <hr />
                    <div className={s.quickActions}>
                        <p>Write an Article</p>
                        <p onClick={() => navigate('/changeProfile')}>Change Profile</p>
                        <p onClick={() => handleClick()}>Sign out</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header