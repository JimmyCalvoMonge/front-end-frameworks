
function Profile({avatar, username, bio}) {

    return (

        <div className="center-div">
            <img src={avatar}></img>
            <hr></hr>
            <p className="card-text fw-bold">@{username}</p>
            <p className="card-text">{bio}</p>
        </div>
    );
  }
  
  export default Profile;