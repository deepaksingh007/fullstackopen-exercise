import React from 'react';

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

export default Course;