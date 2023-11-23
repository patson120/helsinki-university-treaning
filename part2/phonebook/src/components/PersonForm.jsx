import React from 'react';

const PersonForm = ({handleSubmit, handleChange, name, number}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>name: <input value={name} name='name' onChange={handleChange} /></div> <br />
            <div>number: <input value={number} name='number' onChange={handleChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PersonForm;