import React from 'react'
import {Segment} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const TableContainer = () => (
    <div className='segment-example'>
        <Segment.Group>
            <Segment>Top</Segment>
            <Segment.Group>
                <Segment>Nested Top</Segment>
                <Segment>Nested Middle</Segment>
                <Segment>Nested Bottom</Segment>
            </Segment.Group>
            <Segment.Group horizontal>
                <Segment>Top</Segment>
                <Segment>Middle</Segment>
                <Segment>Bottom</Segment>
            </Segment.Group>
            <Segment>Bottom</Segment>
        </Segment.Group>
    </div>
);

export default TableContainer;
