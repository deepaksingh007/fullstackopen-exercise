import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Countries, CountryDetails} from "./Countries";

//it should work when a valid api key from weatherstack.com is used
const API_KEY = 'some api key';

function App() {
 const [countries, setCountries] = useState([]);
 const [weather, setWeather] = useState(null);
 const [search, setSearch] = useState('');
 const handleSearch = event => setSearch(event.target.value);
 const searchEffect = () => {
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
useEffect(searchEffect,[search]);
const weatherEffect = () => {
    if(countries && countries.length===1) {
        axios.get('http://api.weatherstack.com/current', {params:{access_key: API_KEY, query:countries[0].capital}})
            .then(
                    ({data}) => {
                        console.log('weather', data);
                        setWeather(data);
                    },
                    error => {
                        setWeather(null);
                        console.error(error);
                    }
                )
            }
};
useEffect(weatherEffect,[countries]);

  return (
    <div className="App">
      find countries <input onChange={handleSearch}/>
      { countries.length !== 1 ? 
      <Countries countries={countries} setCountries={setCountries}/> :
      <CountryDetails country={countries[0]} weather={weather}/>
      }
    </div>
  );
}

export default App;
