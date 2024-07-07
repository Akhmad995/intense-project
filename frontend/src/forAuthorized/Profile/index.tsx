import Header from "../Header"
import s from './style.module.css'
import profile from '../../assets/profile.jpg'
import Heading from "../Heading"

const Profile = () => {
    return (
        <div>
            <Header />

            <div className={s.profile}>
                <img src={profile} alt="" />
                <div className={s.description}>
                    <h2>Arthur Black</h2>
                    <p>@arthurblack</p>
                    <p>Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis.</p>
                </div>
            </div>

            <Heading name="My articles"/>
        </div>
    )
}

export default Profile