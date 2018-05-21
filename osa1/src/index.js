import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Display = ({counter}) => <div>{counter}</div>

Display.propTypes = {
    counter: PropTypes.number.isRequired
}
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            vasen: 0,
            oikea: 0,
            kaikki: []
        }
    }

    asetaArvoon = (arvo) => {
        return () => {
            this.setState({counter: arvo})
        }
    }

    klikVasen = () => {
        this.setState({
            vasen: this.state.vasen + 1,
            kaikki: this.state.kaikki.concat('v')
        })
    }

    klikOikea = () => {
        this.setState({
            oikea: this.state.oikea + 1,
            kaikki: this.state.kaikki.concat('o')
        })
    }

    render() {
        const historia = () => {
            if (this.state.kaikki.length === 0) {
                return (
                    <div>
                        <em>sovellusta käytetään nappeja painelemalla</em>
                    </div>
                )
            }
            return (
                <div>
                    näppäilyhistoria: {this.state.kaikki.join(' ')}
                </div>
            )
        }

        return (
            <div>
                <Display counter={this.state.counter}/>
                <div>
                    <Button
                        handleClick={this.asetaArvoon(this.state.counter + 1)}
                        text="Plus"/>
                    <Button handleClick={this.asetaArvoon(this.state.counter - 1)} text="Minus"/>
                    <Button handleClick={this.asetaArvoon(0)} text="Zero"/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <span>{this.state.vasen}</span>
                    <Button handleClick={this.klikVasen} text={"Vasen"}/>
                    <Button handleClick={this.klikOikea} text={"Oikea"}/>
                    {this.state.oikea}
                    <div>{historia()}</div>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <Palaute></Palaute>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <Anecdote anecdotes={anecdotes}></Anecdote>
                </div>

            </div>
        )
    }
}

const PalauteStatistics = ({good, neutral, bad}) => {
    const hasPalaute = () => {
        const result = (good + neutral + bad) > 0;
        return result
    }

    const round = (value) => {
        return (Math.round(value * 10) / 10);
    }

    const keskiarvo = () => {
        if (!hasPalaute()) {
            return "Palautetta ei ole vielä annettu"
        } else {
            const result = (good - bad) / (good + neutral + bad)
            return round(result)
        }
    }

    const positive = () => {
        if (!hasPalaute()) {
            return "Palautetta ei ole vielä annettu"
        } else {
            const result = good / (good + neutral + bad) * 100
            return round(result) + " %";
        }
    }

    const content = () => {
        if (!hasPalaute()) {
            return (
                <div>
                    <h2>Statistiikka</h2>
                    <div>Yhtään palautetta ei ole annettu.</div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Statistiikka</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td>Hyvä:</td>
                            <td>{good}</td>
                        </tr>
                        <tr>
                            <td>Neutraali:</td>
                            <td>{neutral}</td>
                        </tr>
                        <tr>
                            <td>Huono:</td>
                            <td>{bad}</td>
                        </tr>
                        <tr>
                            <td>Keskiarvo:</td>
                            <td>{keskiarvo()}</td>
                        </tr>
                        <tr>
                            <td>Positiivisia:</td>
                            <td>{positive()}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (content())
}


class Palaute extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    handleFunction = (propName) => () => {
        const newState = {};
        newState[propName] = this.state[propName] + 1;
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <h2>Anna Palaute</h2>
                <Button handleClick={this.handleFunction('good')} text="Hyvä"/>
                <Button handleClick={this.handleFunction('neutral')} text="Neutraali"/>
                <Button handleClick={this.handleFunction('bad')} text="Huono"/>
                <PalauteStatistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad}/>
            </div>
        )
    }
}

const MostPopular = ({anecdotes, points}) => {
    const popularIndex = () => {
        let biggestValue = null;
        let index = null;
        for (let propertyName in points) {
            const value = points[propertyName]
            if (biggestValue == null || value > biggestValue) {
                biggestValue = value
                index = propertyName
            }

        }
        return index;
    }

    return (
        <div>
            <h2>Most popular anecdote</h2>
            <div>{anecdotes[popularIndex()]}</div>
            <div>Votes: {points[popularIndex()]}</div>
        </div>
    )
}

class Anecdote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            points: {}
        }
        const points = {}
        for (let i = 0; i < this.props.anecdotes.length; i++) {
            points[i] = 0;
        }
        this.state['points'] = points
    }

    vote = () => {
        const index = this.state.selected;
        const points = this.state.points;
        const currentValue = points[index];
        const newPoints = {...points};
        newPoints[index] = currentValue + 1;
        this.setState({'points': newPoints})
    }

    next = () => {
        const nextIndex = this.state.selected + 1;
        if (nextIndex >= this.props.anecdotes.length) {
            this.setState({selected: 0})
        } else {
            this.setState({selected: nextIndex})
        }
    }

    render() {
        return (
            <div>
                <span>{this.props.anecdotes[this.state.selected]}</span>
                <br/>
                <span>Ääniä: {this.state.points[this.state.selected]}</span>
                <br/>
                <Button handleClick={this.vote} text={"Äänestä"}/>
                <Button handleClick={this.next} text={"Seuraava"}/>
                <MostPopular anecdotes={this.props.anecdotes} points={this.state.points}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))