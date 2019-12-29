import React from 'react'

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Totals = ({ parts }) => {
    const total = parts.reduce((sum, p) => {
        return (sum + p.exercises)
    }, 0)
    return (
        <b>
            total of {total} exercises
        </b>
    )
}

const Parts = ({ parts }) => {
    const partrows = () => parts.map(part =>
        <Part
            key={part.id}
            name={part.name}
            exercises={part.exercises}
        />
    )
    return (
        <div>
            {partrows()}
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h3>
            {name}
        </h3>
    )
}

const Onecourse = (props) => {
    return (
        <div>
            <Header name={props.name} />
            <Parts parts={props.parts} />
            <Totals parts={props.parts} />
        </div>
    )
}

const Course = ({ courses }) => {
    const courserows = () => courses.map(course =>
        <Onecourse
            key={course.name.toString()}
            name={course.name}
            parts={course.parts}
        />
    )
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courserows()}
        </div>
    )
}

export default Course