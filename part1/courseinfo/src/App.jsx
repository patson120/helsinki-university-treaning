import React, { useEffect } from "react";
import Course from "./components/Course";
import axios from "axios";

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
        }
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

  const fetchData = () => {
    console.log("Effect...");
    axios.get('http://localhost:3001/notes').then(response => {
      let data = response.data;
      console.log("Data", data);
    }).catch(err => { console.log(err); })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {
        courses.map(course => <Course course={course} key={course.id} />)
      }
    </>
  );
}
export default App;