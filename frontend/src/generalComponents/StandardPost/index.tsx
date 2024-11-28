import { Link } from 'react-router-dom';
import s from './style.module.css'

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

const StandardPost = ({ data }: { data: Post }) => {
    const createdAtDate = new Date(data.created_at);
    const month = createdAtDate.getMonth();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = monthNames[month];

    const day = createdAtDate.getDay();
    const year = createdAtDate.getFullYear();

    return (
        <div className={s.post}>
            <img src={data.post_picture} alt="" />
            <Link to={`/posts/${data?.id}`}>
                <div className={s.description}>
                    <h3>{data.category}</h3>
                    <h2>{data.title}</h2>
                    <p className={s.intelligence}>{data.author.first_name} {data.author.last_name} <span className={s.point}></span>{monthString} {day}, {year} ({data.read_time} mins read)</p>
                    <p>{data.body}</p>
                </div>
            </Link>
        </div>
    )
}

export default StandardPost