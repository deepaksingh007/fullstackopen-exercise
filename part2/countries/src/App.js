import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from "./Countries";


function App() {
 const [countries, setCountries] = useState([]);
 const [search, setSearch] = useState('');
 const handleSearch = event => setSearch(event.target.value);
 const effect = () => {
    if(search) {
        axios.get(`https://restcountries.eu/rest/v2/name/${search}`)
            .then(
                    ({data}) => setCountries(data),
                    error => {
                        setCountries([]);
                        console.error(error);
                    }
                )
            }
};
useEffect(effect,[search]);

  return (
    <div className="App">
      find countries <input onChange={handleSearch}/>
      <Countries countries={countries}/>
    </div>
  );
}

export default App;
