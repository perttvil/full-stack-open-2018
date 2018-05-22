import React from 'react'

const Person = ({ person, deleteHandler }) => {
    return (
        <li>{person.name} {person.number} <button onClick={deleteHandler}>Poista</button></li>
    )
};

export default Person