import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => props ? (<h1>{props.course}</h1>) : null;
const Part = (props) => props && props.content ?  (<p>{props.content.part} {props.content.exercises}</p>) : null;
const Content = (props) =>  (props &&  props.contents) ?
     props.contents.map((content, index) => (<Part key={index} content={content}/>)):
     null;
const Total = (props) => props ? (<p>Number of exercises {props.total}</p>) : null;

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const contents =   [
      {
      part: part1,
      exercises: exercises1
     },
     {
        part: part2,
        exercises: exercises2
     },
    {
        part: part3,
        exercises: exercises3
    },
];
const total = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course = {course} />
      <Content contents = {contents}/>
      <Total total={total}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
