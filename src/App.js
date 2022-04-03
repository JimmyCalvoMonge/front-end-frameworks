import React from "react";
import axios from 'axios';

import Login from './Login';
import NavBar from './NavBar';
import PostList from './PostList';
import Profile from './Profile';
import SearchBar from './SearchBar';

class App extends React.Component{

  state={
    posts:[],
    value:"",
    section:"posts",
    loginOk: false,


    // Estos otros states los he agregado porque de los datos de la API se 
    // pueden obtener el profilepic, la bio y el username del usuario que acaba de ingresar a la app.

    profilepic:"",
    username:"",
    bio:"",


  };


  componentDidMount = () =>{

    // Cada vez que se inicie la aplicación web se deberá verificar si existe el token del usuario en el localStorage
    // del navegador. Si existe, se accederá al listado de posts. En caso contrario, se mostrará la pantalla de login. 
    
    if(localStorage.getItem('token')){
      this.setState({
        loginOk: true,
      })
      
      this.onLoginComplete(true);


    } else{
      this.setState({
        loginOk: false
      })
    }

  }

  onLoginComplete = (loginOknew) =>{

    const token = localStorage.getItem('token')
    console.log("Este es el token del usuario:");
    console.log(token);

    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    axios.get("https://three-points.herokuapp.com/api/posts", {headers} , {withCredentials:true} ).then(
      (response)=>{

        console.log("Success: ", response);

        /* La data que viene de la Api no está lista exactamente para usarse como parte del state.
        Cada elemento del array response.data puede tener valores que no son strings, sino objetos.
        Cuando hice:

        this.setState({
          posts: response.data
        })

        Obtuve el siguiente error en consola:

        Objects are not valid as a React child. If you meant to render a collection of children, use an array instead.

        - Examinando el array response.data hice un pequeño parsing para lidiar con este error.
        */

        console.log(response.data[50]);
        console.log(response.data[100]);

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

          if(response.data[i].author.username===localStorage.getItem("username")){

            // Hemos encontrado al usuario que se acaba de conectar en la app
            // dentro de la response.data
            // Entonces cambiamos el profilepic, username y bio a los de este usuario.


            this.setState({
              profilepic:response.data[i].author.avatar,
              username:response.data[i].author.username,
              bio:response.data[i].author.bio,
            })
          }


        }

        this.setState({
          posts: response_data_parsed
        });

        this.setState({
          loginOk: loginOknew,
        })


      }
    ).catch(
      (error)=>{
        console.log("Error: ", error.response)
      }
    )

  };

  onSearch(newValue){
    this.setState({
      //Aquí filtramos los posts de acuerdo al input del Search Bar.
      //Lo haremos con búsqueda por minúscula.
      posts: this.state.posts.filter( post => post.text.toLowerCase().includes(newValue.toLowerCase())),
      //También cambiamos el valor guardado en la aplicación.
      value: newValue,
    });
    console.log(this.state.posts);
  }

  onLogoClick(){
    this.setState({
      section: "posts",
    });
  }
  
  onProfileClick(){
    this.setState({
      section: "profile",
    });
  }

  render() {

    const getComponent = () => {
      switch(this.state.loginOk){
        case true:
          return <div>

          <NavBar onLogoClick={()=>{this.onLogoClick();}} onProfileClick={()=>{this.onProfileClick();}}></NavBar>

          {/* Nos fijamos en el estado de la app component para decidir si desplegamos los posts o el perfil*/}
          {this.state.section==="posts" && <SearchBar value={this.state.value}  onSearch={(val)=>{this.onSearch(val);}}></SearchBar>}
          {this.state.section==="posts" && <PostList posts={this.state.posts} display={'d-none'}></PostList>}
          {this.state.section==="profile" && <Profile avatar={this.state.profilepic} username={this.state.username} bio={this.state.bio}></Profile>}

          </div>
        case false:
          return <div>
          <Login onLoginComplete={this.onLoginComplete}></Login>
          </div>
      }
    }

    return (
      <div className="App">

      <main>
        {getComponent()}
      </main>

        
      
        
      </div>
    );
  }

}


export default App;
