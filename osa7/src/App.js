import React from 'react'
import axios from 'axios';

import './index.css'
import Hello from './Hello'
import NoteCount from './NoteCount'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            counter: 0,
            noteCount: 0
        }
    }

    componentDidMount() {
        axios.get(BACKEND_URL).then(result => {
            this.setState({noteCount: result.data.length})
        })
    }

    onClick = () => {
        this.setState({counter: this.state.counter + 1})
    }

    render() {
        return (
            <div className="container">
                <Hello counter={this.state.counter}/>
                <button onClick={this.onClick}>click</button>
                <NoteCount noteCount={this.state.noteCount}/>
            </div>
        )
    }
}

export default App