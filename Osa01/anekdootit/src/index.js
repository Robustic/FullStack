import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, buttonText }) => (
    <button onClick={handleClick}>
        {buttonText}
    </button>
)

const Anecdote = ({ index }) => {
    return (
        <p>
            {anecdotes[index]}<br />
            has {votes[index]} votes<br />
        </p>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const numberOfAnecdotes = anecdotes.length 
    const selectNextAnecdote = () => {
        setSelected(Math.floor(Math.random() * numberOfAnecdotes))
    }
    const [voted, setVoted] = useState(0)
    const voteCurrentAnecdote = () => {
        votes[selected] += 1
        setVoted(voted + 1)
    }
    let popular = {
        votes: 0,
        index: 0
    }    
    for (var i = 0; i < votes.length; i++) {
        if (votes[i] > popular.votes) {
            popular.votes = votes[i]
            popular.index = i
        }
    }
    return (
        <div>
            <h1>
                Anecdote of the day
            </h1>
            <Anecdote index={selected} />
            <Button
                handleClick={() => voteCurrentAnecdote()}
                buttonText='vote'
            />
            <Button
                handleClick={() => selectNextAnecdote()}
                buttonText='next anecdote'
            />
            <h1>
                Anecdote with most votes
            </h1>
            <Anecdote index={popular.index} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

let votes = Array(anecdotes.length).fill(0)

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)