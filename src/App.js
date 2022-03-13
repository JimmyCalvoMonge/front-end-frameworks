
import NavBar from './NavBar';
import PostList from './PostList';
import SearchBar from './SearchBar';
import PostData from './data/PostData.json'; //Archivo json que contiene la información de cada tarjeta.

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <SearchBar></SearchBar>
      <PostList posts={PostData}></PostList>
    </div>
  );
}

export default App;
