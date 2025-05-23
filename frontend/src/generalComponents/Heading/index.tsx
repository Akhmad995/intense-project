import s from './Heading.module.scss'

type name = {name: string}

const Heading = ({name}: name) => {
    return (
        <div className={s.Heading}>
            <h1>{name}</h1>
            <hr className={s.hr} />
        </div>
    )
}

export default Heading