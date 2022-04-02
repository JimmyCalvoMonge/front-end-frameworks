import React from "react";

class Post extends React.Component{

  // Cada Post es una clase que tiene un conteo de likes como estado //
  state={
    likes_count:this.props.likes,
  };

  // Incrementar el número de likes //
  increaseLikeCount(e){
    let new_likes_count=this.state.likes_count +1;
    this.setState({
      likes_count:new_likes_count,
    })
  }

  render (){

    return (

      <div className="card mb-3">
          <img src={this.props.image} className="card-img-top"/>
          <div className="card-body">
              <div className="d-flex justify-content-between">
                  <p className="card-text text-muted">{this.props.createdAt}</p>
                  <button type="button" className="btn btn-danger btn-md" onClick={()=> {this.increaseLikeCount()}}>
                  <i className="bi bi-heart-fill"></i>
                  {this.state.likes_count}
                  </button>
              </div>
              <p className="card-text fw-bold">@{this.props.autor}</p>
              <p className="card-text">{this.props.text}</p>
              <a className="text-muted text-decoration-none">
                  <i className="bi bi-chat-right"></i>
                  Comments ({this.props.comments})
              </a>
          </div>
      </div>
    );

  }

}

export default Post;
