
import {useNavigate} from "react-router-dom";

function Profile({avatar, username, bio}) {

    const navigate = useNavigate();

    function handleSubmit(event){

        event.preventDefault()

        // Eliminamos el token y el username del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        // Nos redirigimos a "/login"
        navigate("/login");

    }

    return (

        <div className="center-div">
            <img src={avatar}></img>
            <hr></hr>
            <p className="card-text fw-bold">@{username}</p>
            <p className="card-text">{bio}</p>

            <form onSubmit={handleSubmit}>
                <div className="pt">
                    <button className="btn btn-primary btn-block" type="submit">Exit</button>
                </div>
            </form>
            
        </div>
    );
  }
  
  export default Profile;