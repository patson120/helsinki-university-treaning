

const App = () => {
  const course = {
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;

export const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  );
}

export const Content = ({ parts}) => {
  return (
    <div>
      {
        parts.map((part, index) => <Part part={part} key={`part-${index}`} /> )
      }
    </div>
  );
}

export const Part = ({ part }) => {
  const { name, exercises } = part
  return (
    <p>
      {name} {exercises}
    </p>
  );
}

export const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts.reduce((total, item) => total + item.exercises, 0)}</p>
  );
}