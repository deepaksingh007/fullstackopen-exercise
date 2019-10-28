import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, setFeedBack}) => (<button onClick={setFeedBack(text)}>{text}</button>)
const Buttons = ({feedbacks}) => feedbacks ? feedbacks.map((feedback, index) => <Button key = {index} text={feedback.text} setFeedBack={feedback.setFeedBack}/>) : null;
const Statistic = ({feedbackName, counter}) => (<p>{feedbackName} : {counter}</p>);
const Statistics = ({statistics}) => statistics ? statistics.map(({feedbackName, counter}, index) => <Statistic key={index} feedbackName={feedbackName} counter={counter}/>) : null;
const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    let statistics = [
        {
            feedbackName: 'good',
            counter: good
        },
        {
            feedbackName: 'neutral',
            counter: neutral
        },
        {
            feedbackName: 'bad',
            counter: bad
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
        return statistics =[
            {
                feedbackName: 'good',
                counter: good
            },
            {
                feedbackName: 'neutral',
                counter: neutral
            },
            {
                feedbackName: 'bad',
                counter: bad
            },
        ];
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
        },
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

