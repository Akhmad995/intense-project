import Header from "../HeaderUn"
import Heading from "../../generalComponents/Heading"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchPostsData } from "../../store/postsSlice";
import StandardPost from "../../generalComponents/StandardPost";


const Articles = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        dispatch(fetchPostsData());
    }, [dispatch]);

    const postsData = useSelector((state: RootState) => state.posts.postsData)

    return (
        <div>
            <Header />
            <Heading name='All articles' />

            {postsData.results.map((data: any) => (
                <StandardPost key={data.id} data={data} />
            ))}
        </div>
    )
}

export default Articles