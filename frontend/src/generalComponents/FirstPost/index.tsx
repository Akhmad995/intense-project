import s from './FirstPost.module.scss'
import { Link } from "react-router-dom"

interface Post {
    id: number,
    author: {
        id: string,
        first_name: string,
        last_name: string,
    }
    post_picture: string,
    title: string,
    body: string,
    category: string,
    created_at: string,
    read_time: string
}

const FirstPost = ({data}: {data: Post}) => {
    const createdAtDate = new Date(data?.created_at);
    const month = createdAtDate.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = monthNames[month];

    const day = createdAtDate.getDay();
    const year = createdAtDate.getFullYear();

    return (
        <div className={s.prevue}>
            <img src={data?.post_picture} alt="" />
            <div>
                <h3>{data?.category}</h3>
                <h2><Link to={`/posts/${data?.id}`}>{data?.title}</Link></h2>

                <p className={s.intelligence}>{data?.author?.first_name} {data?.author?.last_name} <span className={s.point}></span>{monthString} {day}, {year} ({data?.read_time} mins read)</p>

                <p>{data?.body}</p>
            </div>
        </div>
    )
}

export default FirstPost