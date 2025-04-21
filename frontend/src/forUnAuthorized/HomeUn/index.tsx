import s from './HomeUn.module.scss'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Header from "../HeaderUn"

import { fetchPostsData } from "../../store/postsSlice"
import { RootState, AppDispatch } from '../../store'

import Heading from "../../generalComponents/Heading"
import TopPost from "../../generalComponents/TopPost"
import StandardPost from "../../generalComponents/StandardPost"
import FirstPost from '../../generalComponents/FirstPost'


const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchPostsData());
    }, [dispatch]);

    const postsData = useSelector((state: RootState) => state.posts.postsData)

    const firstPost = postsData.results[postsData.results.length - 1]

    const topPosts = [...postsData.results].sort(() => Math.random() - 0.5).slice(0, 3);

    return (
        <div>
            <Header />

            <FirstPost data={firstPost}/>

            <Heading name='Top 3' />
            {topPosts.map((data: any) => (
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