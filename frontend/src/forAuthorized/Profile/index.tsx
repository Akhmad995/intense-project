import s from './style.module.scss'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

import Heading from "../../generalComponents/Heading"
import Header from "../Header"

const Profile = () => {

    const userData = useSelector((state: RootState) => state.auth.userData);

    return (
        <div>
            <Header />

            <div className={s.profile}>
                <img src={userData?.profile_picture} alt="" />
                <div className={s.description}>
                    <h2>{userData?.username}</h2>
                    <p>{userData?.email}</p>
                    <p>{userData?.descr}</p>
                </div>
            </div>

            <Heading name="My articles" />
        </div>
    )
}

export default Profile