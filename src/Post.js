import React, {useState} from "react";

// También hemos cambiado la componente Post, para que sea funcional.

function Post ({autor, text, createdAt, comments, image, likes}){

  const [likes_count, setLikesCount] = useState(likes)

  function increaseLikeCount (e){
    setLikesCount(likes_count+1);
  }

  return (

    <div className="card mb-3">
        <img src={image} className="card-img-top"/>
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <p className="card-text text-muted">{createdAt}</p>
                <button type="button" className="btn btn-danger btn-md" onClick={increaseLikeCount}>
                <i className="bi bi-heart-fill"></i>
                {likes_count}
                </button>
            </div>
            <p className="card-text fw-bold">@{autor}</p>
            <p className="card-text">{text}</p>
            <a className="text-muted text-decoration-none">
                <i className="bi bi-chat-right"></i>
                Comments ({comments})
            </a>
        </div>
    </div>
  );

};

export default Post;
