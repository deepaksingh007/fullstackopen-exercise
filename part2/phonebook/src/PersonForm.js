import React from 'react';

const PersonForm = ({onSubmit, handleNewName, handleNewNumber}) => (
<form onSubmit={onSubmit}>
    <div>
      name: <input onChange={handleNewName}/>
    </div>
    <div>
      number: <input type="tel" onChange={handleNewNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
</form>
  );
export default PersonForm;