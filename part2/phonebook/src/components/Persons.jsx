

import React from "react";


const Persons = ({ persons, destroy, setPersons, setNotification, setClassName }) => {

    const handleDelete = (personId, index) => {
        if (!window.confirm(`Delete ${persons[index].name} ?`)) return
        destroy(personId)
            .then((response) => {
                let filter = persons.filter(person => person.id != personId);
                setPersons(filter)
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setNotification(`Information of ${persons[index].name} has already been removed from the server.`);
                    setClassName("error");
                    setTimeout(() => {
                        setNotification(null)
                        setClassName("")
                    }, 5000)
                }
            });
    }
    return (
        <>
            {
                persons.map((person, index) => (<p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, index)} >Delete</button></p>))
            }
        </>
    );
}
export default Persons;