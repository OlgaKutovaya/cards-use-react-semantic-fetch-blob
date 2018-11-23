import React, {Component} from 'react';
import {Card, Loader, Dimmer} from 'semantic-ui-react';
import {Helmet} from "react-helmet";

const CardItem = props => {
    return (
        <Card id={props.id} className='card' style={{background: '#ececec'}}>
            <Card.Content header={props.title}/>
            <Card.Content description={props.body}/>
            <Card.Content description={props.body}/>
            <Card.Content extra>
                <button
                    className="btn-del"
                    onClick={() => {
                        props.deletePost(props.id);
                    }}>
                    delete
                </button>
            </Card.Content>
        </Card>
    )
};

class CardsContainer extends Component {

    state = {
        posts: [],
        isLoading: false
    };

    getPosts = async () => {
        this.setState({isLoading: true});
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts/');
        let data = await responsePosts.json();
        // setTimeout(() => {
        this.setState({posts: data.splice(0, 4), isLoading: false});
        // }, 1000);

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
                return <div key={post.id}>
                    <CardItem {...post} deletePost={(id) => {
                        this.deletePostHandler(id);
                    }
                    }/>
                </div>
            });

        return (
            <React.Fragment>
                {this.state.isLoading ? (
                    <Helmet>
                        <style type="text/css">
                            {`body {
                                max-height: 100%;
                                overflow: hidden;
                             }`}
                        </style>
                    </Helmet>
                ) : null
                }
                <Dimmer
                    active={this.state.isLoading}
                    className="loader-wrapper">
                    <Loader/>
                </Dimmer>
                <div className='wrapper-cards'>
                    {posts}
                </div>
            </React.Fragment>
        );
    }
}

export default CardsContainer;

