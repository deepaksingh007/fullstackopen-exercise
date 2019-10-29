import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => (<h3>{props.course}</h3>);

const Total = ({parts}) => {
    if(!parts) return null;
    const total = parts.reduce((acc, cur) => acc + cur.exercises,0);
    return (<p> <strong>total of {total} exercises</strong></p>);
};

const Part = ({part}) => (<p>{part.name} {part.exercises}</p>);

const Content = ({ parts }) => parts ? (
    <div>
        {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>) :
    null;

const Course = ({ course }) => course ? (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>) :
    null;

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                },
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
              {
                name: 'Routing',
                exercises: 3,
                id: 1
              },
              {
                name: 'Middlewares',
                exercises: 7,
                id: 2
              }
            ]
          }
    ];

    return (
        <div>
            <h1>Web development curriculum</h1>
           {courses.map( course => (<Course key={course.id} course={course} />)) }
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
