import React, {useState, useEffect} from "react";
import {Route,Routes} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

import Login from './Login';
import NavBar from './NavBar';
import PostList from './PostList';
import Profile from './Profile';
import SearchBar from './SearchBar';

// Hemos cambiado la componente App para que sea funcional

function App () { 
  const [posts, setPosts] = useState([])
  const [posts_to_show, setPostsToShow] = useState([])
  const [value, setValue] = useState(" ")
  const [section, setSection] = useState("no-login")  // Este state es para ver si se ha hecho un login o no.
  const [currentUser, setCurrentUser] = useState([])

  const navigate = useNavigate();

  function onLoginComplete (){

    const token = localStorage.getItem('token');
    console.log("Este es el token del usuario:");
    console.log(token);

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    axios.get("https://three-points.herokuapp.com/api/posts", {headers} , {withCredentials:true} ).then(
      (response)=>{

        console.log("Success: ", response);

        // Hay un login exitoso, cambiamos el state en esta parte.
        setSection("yes-login");

        //Aquí hacemos el mismo parsing de la respuesta de la API que hicimos en la actividad 3.

        let response_data_parsed=[];

        for(let i=0; i<response.data.length; i++){
          response_data_parsed.push(
            {
              'autor':response.data[i].author.name,
              "text":response.data[i].text,
              "createdAt":response.data[i].createdAt,
              "comments": response.data[i].comments.length,
              "image": response.data[i].image,
              "likes":response.data[i].likes,            
              "id":response.data[i].id
            }
          )


          // Guardamos el username que recibimos desde login, una vez que lo encontramos en el
          // listado de posts. Supongo que este username está en los posts que se reciben desde la API response.

          if(response.data[i].author.username===localStorage.getItem("username")){

            setCurrentUser(
              {
                avatar:response.data[i].author.avatar,
                username:response.data[i].author.username,
                bio:response.data[i].author.bio,
              }
            )

          }

        }

        // Hacemos un set de los posts y los posts para mostrar 

        setPosts(response_data_parsed)
        setPostsToShow(response_data_parsed)


      }
    ).catch(
      (error)=>{
        console.log("Error: ", error.response)
      }
    )

  };

  function onSearch(newValue) {
    setPostsToShow(posts.filter( post => post.text.toLowerCase().includes(newValue.toLowerCase())))
    setValue(newValue)
  }

  function onLogoClick() {
    navigate("/");
  }
  
  function onProfileClick() {
    navigate("/profile");

  };

  //Sustitución del ComponendDidMount() con el hook useEffect

  useEffect(()=>{

    if(localStorage.getItem('token')){
      onLoginComplete(true);
    } else{
      
      // Si no hay un token guardado entonces redirigimos el usuario a la dirección /login después de 2 segundos.
      // Para esto he utilizado useNavigate de react-router-dom también.

      // Note que esto va a impedir que mostremos la ruta "/" si no hay un token guardado
      // en el navegador. Por tanto siempre que haya un token guardado, el useEffect nos permitirá
      // mostrar toda la información de la página "/"

      setTimeout(function() {
        setSection("no-login");
        navigate("/login"); 
      }, 2000);
    }

  }, [])

  return (

    <div className="App">

    <Routes>

      {/*Componente de PostList para la ruta "/" */}

      <Route path="/" element={
        <div>
          <NavBar onLogoClick={onLogoClick} onProfileClick={onProfileClick}></NavBar>

          {section==="yes-login" && <div>
            <SearchBar value={value} onSearch={(val)=>{onSearch(val);}}></SearchBar>
            <PostList posts={posts_to_show} display={'d-none'}></PostList>
          </div>
          }

        </div>}>
      </Route>

      {/*Componente de PostList para la ruta "/" */}

      <Route path="/login" element = {
        <div>
          <Login onLoginComplete={onLoginComplete}></Login>
        </div>
      }>
      </Route>

      {/*Componente para Profile para la ruta "/profile"*/}

      <Route path="/profile" element={
        <div>
          <NavBar onLogoClick={onLogoClick} onProfileClick={onProfileClick}></NavBar>
          <Profile avatar={currentUser.avatar} username={currentUser.username} bio={currentUser.bio}></Profile>
        </div>
      }>

      </Route>

    </Routes>
      
    </div>
  );


}

export default App;
