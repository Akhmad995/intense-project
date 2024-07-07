import { Link } from "react-router-dom"
import Header from "../HeaderUn"
import Heading from "../Heading"
import picture from '../../assets/picture.jpg'
import s from './style.module.css'

const Home = () => {
    return (
        <div>
            <Header />

            <div className={s.prevue}>
                <img src={picture} alt="" />
                <div>
                    <h3>FEATURED ARTICLE</h3>
                    <h2><Link to={`/card`}>World’s Most Dangerous Technology Ever Made.</Link></h2>


                    <p className={s.intelligence}>Ralph Hawkins <p></p>  May 7, 2019 (10 mins read)</p>

                    <p>Proident aliquip velit qui commodo officia qui consectetur dolor ullamco aliquip elit incididunt. Ea minim ex consectetur excepteur. Ex laborum nostrud mollit sint consectetur Lorem amet aliqua do enim. Commodo duis dolor anim excepteur. In aliquip mollit nulla consequat velit magna.</p>
                </div>
            </div>

            <Heading name='Top 3' />
            <Heading name='Newset' />

            <Link to={'/articles'} className={s.button}>
                See all
            </Link>
        </div>
    )
}

export default Home