import React from 'react';
import Post from './Post';


/* Para hacer que la componente PostList apareciera después de 3 segundos
he utilizado una variable display como state para indicar si se debe mostrar
la lista de posts o no. También usé el componentDidMount() para lograr esto.

Me ayudé con la siguiente referencia:
https://stackoverflow.com/questions/30803440/delayed-rendering-of-react-components

Stackoverflow, lo sé, pero me ha ayudado mucho en el pasado :)
*/


class PostList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {display : 'd-none'};
    }

    show(){
        this.setState({
            display: 'row',
        })
    }

    componentDidMount() {
        var that = this;
        setTimeout(function() {
            that.show();
            console.log('Hello, The posts have just appeared after 3 seconds...')
        }, 3000);
    };

    
    render() {

        return (

            <div>
            {this.state.display==='row' ?
                <div className='row'>
                    {this.props.posts.map((post)=>(
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12" key={post.id}>
                            <Post autor={post.autor} text={post.text} createdAt={post.createdAt} comments={post.comments} image={post.image} likes={post.likes}></Post>
                        </div>
                    ))}
            </div>  : <div className='center-div'> Loading ... </div> 
            
            }

            </div>

        
        
        )
    }
};

export default PostList;
