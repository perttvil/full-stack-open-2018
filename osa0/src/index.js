import React from 'react'
import ReactDOM from 'react-dom'

const Yhteensa = (props) => {
    return (
        <p>Yhteensä {props.count} tehtävää</p>
    )
}


const Otsikko = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.name} {props.count}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {
                props.content.map(c => <Osa name={c.nimi} count={c.tehtavia}/>)
            }
        </div>
    )
}

const App = () => {
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [osa1, osa2, osa3]
    }


    return (
        <div>
            <Otsikko name={kurssi.nimi}/>
            <Sisalto content={kurssi.osat}/>
            <Yhteensa count={kurssi.osat.map( o => o.tehtavia).reduce( (a,b) => a+b)}/>
        </div>
    )
}

ReactDOM.render(
    <App/>
    ,
    document.getElementById('root')
)