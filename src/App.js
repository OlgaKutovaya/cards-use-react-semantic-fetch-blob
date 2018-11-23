import React, {Component} from 'react';
import './App.css';
import CardsContainer from "./CardsContainer";
import PostsContainer from './PostsContainer.js';
import Photos from "./PhotosContainer.js";
import TableContainer from "./TableContainer.js";


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CardsContainer/>
                <div className='main-wrapper'>
                    <PostsContainer/>
                    <Photos/>
                </div>
                <TableContainer/>
            </React.Fragment>
        );
    }
}

export default App;





















