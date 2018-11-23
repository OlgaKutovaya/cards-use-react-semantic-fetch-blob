import React, {Component} from 'react';

const Post = (props) => {
    return (
        <div className='post-container'>
            <h1 className="heading">{props.body}</h1>
            <p>{props.title}</p>
            <button className="btn-del"
                    onClick={() => {
                        props.deletePost(props.id);
                    }}>
                delete
            </button>
        </div>
    )
};

class PostsContainer extends Component {

    state = {
        posts: [],
        users: []
    };

    getPosts = async () => {
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts/');
        let data = await responsePosts.json();
        this.setState({posts: data});
        return data
    };

    componentDidMount() {
        this.getPosts();
    }

    deletePostHandler = async (id) => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + id,
            {
                mode: 'cors',
                method: 'DELETE'
            });
        const newPostsArr = [...this.state.posts];
        const index = newPostsArr.findIndex(elem => elem.id === id);
        if (index !== -1) {
            newPostsArr.splice(index, 1);
            this.setState({posts: newPostsArr});
        }
    };

    render() {
        const posts = this.state.posts && this.state.posts.length > 0 &&
            this.state.posts.map((post, index) => {
                return <Post key={post.id} {...post} deletePost={(id) => {
                    this.deletePostHandler(id);
                }}
                />
            });
        return (
            <div className="wrapper-posts">
                {posts}
            </div>
        );
    }
}

export default PostsContainer;