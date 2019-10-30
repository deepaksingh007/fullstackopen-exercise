import React from 'react';

const PersonForm = ({name, number, onSubmit, handleNewName, handleNewNumber}) => (
<form onSubmit={onSubmit}>
    <div>
      name: <input value ={name} onChange={handleNewName}/>
    </div>
    <div>
      number: <input type="tel" value={number} onChange={handleNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
</form>
  );
export default PersonForm;