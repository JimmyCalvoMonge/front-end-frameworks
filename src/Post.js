
function Post(props) {

  return (

    <div className="card mb-3">
        <img src="https://source.unsplash.com/random/800x800" className="card-img-top"/>
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <p className="card-text text-muted">{props.date}</p>
                <button type="button" className="btn btn-danger btn-md">
                <i className="bi bi-heart-fill"></i>
                10
                </button>
            </div>
            <p className="card-text fw-bold">@{props.user}</p>
            <p className="card-text">{props.description}</p>
            <a className="text-muted text-decoration-none">
                <i className="bi bi-chat-right"></i>
                Comments (15)
            </a>
        </div>
    </div>
  );
}

export default Post;
