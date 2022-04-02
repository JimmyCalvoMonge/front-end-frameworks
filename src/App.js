
import React from "react";

import NavBar from './NavBar';
import PostList from './PostList';
import Profile from './Profile';
import SearchBar from './SearchBar';

import posts from './data/PostData.json'; //Archivo json que contiene la información de cada tarjeta.
import profilepic from './assets/face.jpg';

class App extends React.Component{

  state={
    posts:posts,
    value:"",
    section:"posts",
  };

  onSearch(newValue){
    this.setState({
      //Aquí filtramos los posts de acuerdo al input del Search Bar.
      //Lo haremos con búsqueda por minúscula.
      posts: posts.filter( post => post.text.toLowerCase().includes(newValue.toLowerCase())),
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
    return (
      <div className="App">

        <NavBar onLogoClick={()=>{this.onLogoClick();}} onProfileClick={()=>{this.onProfileClick();}}></NavBar>
      
        {/* Nos fijamos en el estado de la app component para decidir si desplegamos los posts o el perfil*/}
        {this.state.section==="posts" && <SearchBar value={this.state.value}  onSearch={(val)=>{this.onSearch(val);}}></SearchBar>}
        {this.state.section==="posts" && <PostList posts={this.state.posts} display={'d-none'}></PostList>}
        {this.state.section==="profile" && <Profile avatar={profilepic} username={"MrBean"} bio={"Hello, I'm a very funny guy!"}></Profile>}
        
      </div>
    );
  }

}


export default App;
