import s from './style.module.scss'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

import Heading from "../../generalComponents/Heading"
import Header from "../Header"
import StandardPost from '../../generalComponents/StandardPost'

const Profile = () => {
    const userData = useSelector((state: RootState) => state.auth.userData);
    const posts = useSelector((state: RootState) => state.posts.postsData);
    console.log(posts)

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

            {posts.results.map((post: any) => {
                if (post.author.id === userData?.id) {
                    return <StandardPost key={post.id} data={post} />
                }
            })}
        </div>
    )
}

export default Profile