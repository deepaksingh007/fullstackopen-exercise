import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => props ? (<h1>{props.course}</h1>) : null;
const Part = (props) => props && props.part ?  (<p>{props.part.name} {props.part.exercises}</p>) : null;
const Content = (props) =>  (props &&  props.parts) ?
     props.parts.map((part, index) => (<Part key={index} part={part}/>)):
     null;
const Total = (props) => {
    if(!props || !props.parts) return null;
    const total = props.parts.reduce((acc, cur) => acc + cur.exercises, 0);
    return (<p>Number of exercises {total}</p>);
}

const App = () => {
  const course =   {
      name: 'Half Stack application development',
      parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7
                },
                {
                    name: 'State of a component',
                    exercises: 14
                } 
            ]
    };


  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
