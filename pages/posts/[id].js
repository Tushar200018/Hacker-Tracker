import CommentContainer from "@/components/commentContainer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '@/styles/Post.module.css'

export default function Post(){
    const router = useRouter();
    const {id} = router.query;

    const [commentList,setCommentList] = useState([]);
    const [postInfo,setPostInfo] = useState({
        author: "",
        title: "",
        points: 0
    })
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        async function fetchPostData(){
            try{
                setIsLoading(true);
                const res = await axios.get(`https://hn.algolia.com/api/v1/items/${id}`);
                const post = res.data;
                setPostInfo({
                    author: post.author,
                    title: post.title,
                    points: post.points
                });
                setCommentList(post.children);
                setIsLoading(false);
            }
            catch(e){
                console.log("Error in fetching News Data",e);
            }
        }
        id && fetchPostData();
    },[id])

    return(
        <div className="container py-5">
            {!isLoading &&
                <div>
                    <div className={styles.postDiv}>
                        <h2>{postInfo.title}</h2>
                        <p>{`${postInfo.points} points by `}<i>{postInfo.author}</i></p>
                    </div>
                    <CommentContainer commentList={commentList}/>
                </div>
            }
        </div>
    )
}