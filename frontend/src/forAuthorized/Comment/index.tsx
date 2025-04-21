import s from './Comment.module.scss'
import { CommentT } from '../PostDetails'

const Comment = ({data}: {data: CommentT}) => {
    return (
        <div className={s.comment}>
            <div className={s.count}>{data.score}</div>
            <div className={s.information}>
                <div className={s.author}>
                    <img src={data.author.profile_picture} alt="" className={s.authorImage} />
                    <h6 className={s.authorName}>{data.author.first_name} {data.author.last_name}</h6>
                    <p className={s.date}>1 mounth ago</p>
                </div>
                <div className={s.info}>
                    <p>{data.body}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment