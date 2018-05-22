import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

// import axios from 'axios'

/*
const notes = [
    {
        id: 1,
        content: 'HTML on helppoa',
        date: '2017-12-10T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Selain pystyy suorittamaan vain javascriptiä',
        date: '2017-12-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        date: '2017-12-10T19:20:14.298Z',
        important: true
    }
];


ReactDOM.render(<App notes={response.data}/>, document.getElementById('root'));
*/

/*
axios.get('http://localhost:3001/notes').then(response =>
    ReactDOM.render(<App notes={response.data}/>, document.getElementById('root'))
);
*/

ReactDOM.render(<App/>, document.getElementById('root'));
