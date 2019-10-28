import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, setFeedBack}) => (<button onClick={setFeedBack(text)}>{text}</button>);
const Buttons = ({feedbacks}) => feedbacks ? feedbacks.map((feedback, index) => <Button key = {index} text={feedback.text} setFeedBack={feedback.setFeedBack}/>) : null;
const Statistic = ({statisticName, value}) => (<p>{statisticName} : {value}</p>);
const Statistics = ({statistics}) => {
    const all = statistics && statistics.find(statistic => statistic.statisticName === 'all');
    return all && all.value > 0 ? 
        statistics.map(({statisticName, value}, index) => <Statistic key={index} statisticName={statisticName} value={value}/>) : 
        (<p>No feedback given</p>);
};
const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const all = good + neutral + bad;
    const average = all > 0 ? (good - bad)/all : '-';
    const positive = all > 0 ? `${good * 100 / all}%` : '-';
    let statistics = [
        {
            statisticName: 'good',
            value: good
        },
        {
            statisticName: 'neutral',
            value: neutral
        },
        {
            statisticName: 'bad',
            value: bad
        },
        {
            statisticName: 'all',
            value: `${all}`
        },
        {
            statisticName: 'average',
            value: `${average}`
        },
        {
            statisticName: 'positive',
            value: `${positive}`
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
            setFeedBack: setFeedBack
        },
        {
            text: 'neutral',
            setFeedBack: setFeedBack
        },
        {
            text: 'bad',
            setFeedBack: setFeedBack
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

