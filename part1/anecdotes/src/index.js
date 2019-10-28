import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, onClick}) => (
        <button onClick={onClick}>{text}</button>
);
const App = (props) => {
    const [selected, setSelected] = useState(0);
    const initVotes = anecdotes.map(() => 0);
    const [votes, setVotes] = useState(initVotes);
    const select = () => {
        const random = Math.random()*anecdotes.length;
        const index = Math.floor(random);
        setSelected(index);
    };
    const vote = () => setVotes(
        votes.map(
            (vote, index) => index === selected ? 
                vote +1 : 
                vote
            )
    );
    const indexOfMaxNumber = votes.reduce((acc, cur, index) => {
        const indexOfMax = cur > votes[acc] ? index : acc;
        console.log('votes', votes);
        console.log(indexOfMax);
        return indexOfMax;
    }, 0);
    return (
      <div>
        <h3>Anecdote of the day</h3>
        <p>{anecdotes[selected]}</p>
        <p>{`has ${votes[selected]} votes`}</p>
        <p>
            <Button onClick={select} text={'next anecdote'}/>
            <Button onClick={vote} text={'vote'}/>
        </p>
        <h3>Anecdote with most votes</h3>
        {anecdotes[indexOfMaxNumber]}
        <p>{`has ${votes[indexOfMaxNumber]} votes`}</p>
      </div>
    )
  };
  
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
ReactDOM.render(<App />, document.getElementById('root'));

