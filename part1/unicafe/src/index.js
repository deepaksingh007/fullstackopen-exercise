import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, setFeedBack}) => (<button onClick={setFeedBack(text)}>{text}</button>);
const Buttons = ({feedbacks}) => feedbacks ? feedbacks.map((feedback, index) => <Button key = {index} text={feedback.text} setFeedBack={feedback.setFeedBack}/>) : null;
const Statistic = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>);
const Statistics = ({statistics}) => {
    const all = statistics && statistics.find(statistic => statistic.text === 'all');
    const statisticsEl = statistics.map(({text, value}, index) => <Statistic key={index} text={text} value={value}/>);
    const table = (
    <table>
        <tbody>
            {statisticsEl}
        </tbody>
    </table>
    );
    return all && all.value > 0 ? 
        table : 
        (<p>No feedback given</p>);
};
const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const all = good + neutral + bad;
    const average = all > 0 ? ((good - bad)/all).toFixed(1) : '-';
    const positive = all > 0 ? `${(good * 100 / all).toFixed(1)}%` : '-';
    let statistics = [
        {
            text: 'good',
            value: good
        },
        {
            text: 'neutral',
            value: neutral
        },
        {
            text: 'bad',
            value: bad
        },
        {
            text: 'all',
            value: all
        },
        {
            text: 'average',
            value: average
        },
        {
            text: 'positive',
            value: positive
        },
    ];
    const setFeedBack = (type) => () => {
        switch(type)
        {   case 'good': 
                setGood(good + 1);
                break;
            case 'neutral':
                setNeutral(neutral + 1);
                break;
            default:  setBad(bad + 1);
        };

    };
    const feedbacks = [
        {
            text: 'good',
            setFeedBack
        },
        {
            text: 'neutral',
            setFeedBack
        },
        {
            text: 'bad',
            setFeedBack
        }
    ];
    return (
      <div>
      <h1>give feedback</h1>
      <Buttons feedbacks={feedbacks}></Buttons>
       <h1>statistics</h1>
       <Statistics statistics={statistics}/>
      </div>
    )
  };
ReactDOM.render(<App />, document.getElementById('root'));

