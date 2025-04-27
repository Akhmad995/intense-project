import s from './FooterPost.module.scss'
import arrow from '../../../public/right_arrows_jpbghdw16999.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Post } from '../../store/postsSlice'

const FooterPost = () => {
    const postData = useSelector((state: RootState) => state.posts.postData);
    const postsData = useSelector((state: RootState) => state.posts.postsData);
    const [previousPost, setPreviousPost] = useState<Post | null>(null);
    const [nextPost, setNextPost] = useState<Post | null>(null);
    
    useEffect(() => {
        const currentIndex = postsData.results.findIndex((post: Post) => post.id === postData.id)
        
        if (currentIndex !== -1) {
            setPreviousPost(postsData.results[currentIndex - 1] || null)
            setNextPost(postsData.results[currentIndex + 1] || null)
        }
    }, [postData, postsData])
    
    console.log(previousPost, nextPost)

    return (
        <div className={s.footer}>
            <div>
                <Link to={nextPost ? `/posts/${nextPost.id}` : `/posts/${postData.id}`}><img src={arrow} alt="" className={s.arrowLeft}></img></Link>
                <p>Go back: <b>{nextPost ? nextPost.title : 'No previous post'}</b></p>
            </div>
            <div>
                <p>Next up: <b>{previousPost ? previousPost.title : 'No next post'}</b></p>
                <Link to={previousPost ? `/posts/${previousPost.id}` : `/posts/${postData.id}`}><img src={arrow} alt="" className={s.arrowRight}></img></Link>
            </div>
        </div>
    )
}

export default FooterPost