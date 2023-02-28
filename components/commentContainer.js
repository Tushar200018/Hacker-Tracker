import Comment from "./comment";

export default function CommentContainer({commentList}){
    return (
            <>
                {commentList.length!=0
                    ?
                    <div className="ms-5">
                        {commentList.map(comment=>(
                            <>
                                <Comment 
                                    author={comment.author}
                                    text={comment.text}
                                />
                                <CommentContainer commentList={comment.children}/>
                            </>
                        ))}
                    </div>
                    :
                    null
                }
            </>
            
    )
}