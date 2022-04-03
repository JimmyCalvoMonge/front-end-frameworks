import React, {useState, useEffect} from "react";
import Post from './Post';

/* Para hacer que la componente PostList apareciera después de 3 segundos
he utilizado una variable display como state para indicar si se debe mostrar
la lista de posts o no. 

Se ha trasladado esta componente para que sea funcional y que haga uso de Hooks.
*/

function PostList ({posts}){

    const [display,setDisplay] = useState(false);

    useEffect(()=>{
        setTimeout(function() {
            setDisplay(true);
        }, 3000);
    
      }, [])

      return (

        <div>
        {display===true ?
            <div className='row'>
                {posts.map((post)=>(
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12" key={post.id}>
                        <Post autor={post.autor} text={post.text} createdAt={post.createdAt} comments={post.comments} image={post.image} likes={post.likes}></Post>
                    </div>
                ))}
        </div>  : <div className='center-div'> Loading ... </div> 
        }
        </div>
    
    )
}

export default PostList;
