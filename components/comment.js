export default function Comment({author,text}){
    return(
        <>
            <style jsx>
                {`
                    .commentDiv{
                        margin-bottom: 40px;
                        padding: 20px 30px;
                        border: 2px solid #f2f2f2;
                        box-shadow: 2px 4px 3px 0px gainsboro;
                    }
                    .commentDiv h4{
                        font-weight: 600;
                    }
                
                `}
            </style>
                <div className="commentDiv">
                    {author && <h4>{author}</h4>}
                    <div dangerouslySetInnerHTML={{__html: text}} />
                </div>
        </>
        
    )
}