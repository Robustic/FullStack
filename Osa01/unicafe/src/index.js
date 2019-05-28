import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    const header = props.header
    return (
        <div>
            <h1>
                {header}
            </h1>
        </div>
    )
}

const Feedback = () => {
    return (
        <div>
            <Header header="Anna palautetta" />
        </div>        
    )
}

const Statistic = ({ text, number}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{number}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    if (total > 0) {
        const average = (good - bad) / total
        const procentOfGoods = (good / total) * 100
        return (
            <div>
                <Header header="Statistiikka" />
                <table>
                    <Statistic text="hyvä" number ={good} />
                    <Statistic text="neutraali" number ={neutral} />
                    <Statistic text="huono" number ={bad} />
                    <Statistic text="yhteensä" number ={total} />
                    <Statistic text="keskiarvo" number ={average} />
                    <Statistic text="positiivisia" number ={procentOfGoods} />
                </table>
            </div> 
        )
    } else {
        return (
            <div>
                <Header header="Statistiikka" />
                <p>Ei yhtään palautetta annettu</p>
            </div>        
        )
    }
}

const Button = ({ handleClick, buttonText }) => (
    <button onClick={handleClick}>
        {buttonText}
    </button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGoodValue = () => setGood(good + 1)
    const increaseNeutralValue = () => setNeutral(neutral + 1)
    const increaseBadValue = () => setBad(bad + 1)

    return (
        <div>        
            <Feedback />
            <Button
                handleClick={() => increaseGoodValue()}
                buttonText='hyvä'
            />
            <Button
                handleClick={() => increaseNeutralValue()}
                buttonText='neutraali'
            />
            <Button
                handleClick={() => increaseBadValue()}
                buttonText='huono'
            />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))