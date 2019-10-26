import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => props ? (<h1>{props.course}</h1>) : null;
const Part = (props) => props && props.content ?  (<p>{props.content.name} {props.content.exercises}</p>) : null;
const Content = (props) =>  (props &&  props.contents) ?
     props.contents.map((content, index) => (<Part key={index} content={content}/>)):
     null;
const Total = (props) => props ? (<p>Number of exercises {props.total}</p>) : null;

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    };
  const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    };
  const part3 = {
      name: 'State of a component',
      exercises: 14
    };
  const contents =   [
      part1,
      part2,
      part3
];
const total = part1.exercises + part2.exercises + part3.exercises;

  return (
    <div>
      <Header course = {course} />
      <Content contents = {contents}/>
      <Total total={total}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
