import Post from './Post';

const PostList = ({posts}) =>{

    return (
        <div className='row'>
        {posts.map((post)=>(
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12" key={post.id}>
                <Post user={post.user} description={post.description} date={post.date}></Post>
            </div>
        ))}
        </div>
    )
}

export default PostList;
