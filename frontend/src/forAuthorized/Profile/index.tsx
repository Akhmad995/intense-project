import Header from "../Header"
import s from './style.module.css'
import profile from '../../assets/profile.jpg'
import Heading from "../Heading"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

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
                    <p>Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis.</p>
                </div>
            </div>

            <Heading name="My articles" />
        </div>
    )
}

export default Profile