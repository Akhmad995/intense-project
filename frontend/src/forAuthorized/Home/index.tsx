import { useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../Header"
import Heading from "../../generalComponents/Heading"
import picture from '../../assets/picture.jpg'
import s from './style.module.css'
import { fetchPostsData } from "../../store/postsSlice"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import TopPost from "../../generalComponents/TopPost"
import StandardPost from "../../generalComponents/StandardPost"
import { RootState } from "../../store"

const Home = () => {
    const dispatch: Dispatch<any> = useDispatch();
    useEffect(() => {
        dispatch(fetchPostsData());
    }, [dispatch]);

    const postsData = useSelector((state: RootState) => state.posts.postsData)

    return (
        <div>
            <Header />

            <div className={s.prevue}>
                <img src={picture} alt="" />
                <div>
                    <h3>FEATURED ARTICLE</h3>
                    <h2><Link to={`/card`}>World’s Most Dangerous Technology Ever Made.</Link></h2>


                    <p className={s.intelligence}>Ralph Hawkins <span className={s.point}></span>  May 7, 2019 (10 mins read)</p>

                    <p>Proident aliquip velit qui commodo officia qui consectetur dolor ullamco aliquip elit incididunt. Ea minim ex consectetur excepteur. Ex laborum nostrud mollit sint consectetur Lorem amet aliqua do enim. Commodo duis dolor anim excepteur. In aliquip mollit nulla consequat velit magna.</p>
                </div>
            </div>

            <Heading name='Top 3' />
            {postsData.results.map((data: any) => (
                <TopPost key={data.id} data={data} />
            ))}

            <Heading name='Newset' />
            {postsData.results.map((data: any) => (
                <StandardPost key={data.id} data={data} />
            ))}

            <Link to={'/articles'} className={s.button}>
                See all
            </Link>
        </div>
    )
}

export default Home