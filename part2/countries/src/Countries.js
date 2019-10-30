import React from 'react';
const CountryDetails= ({country, weather}) => {
    if(!country || !weather) return null;
    const {temperature, wind_dir, wind_speed, weather_icons} = weather.current;
    return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>   
          <p>population {country.population}</p>
          <h3>languages</h3>
          {country.languages.map(language => (<p key={language.name}>{language.name}</p>))}
          <img src={country.flag} alt="flag" width="100" height="100"/>
          <h3>weather in {weather.location.name}</h3>
          <p><strong>temperature:</strong> {temperature}</p>
          <img alt="weather_icon" src={weather_icons[0]} width="40" height="40"/>  
          <p><strong>wind:</strong> {`${wind_speed}kph direction`} <strong>{`${wind_dir}`}</strong></p>
        </div>
      );
}

const Country = ({country, setCountries}) => {
    if(!country) return null;
    const showCountry = () => setCountries([country]);
    const countryName = (<p key={country.name}>{country.name}<button onClick={showCountry}>show</button></p>);
    return countryName;
};

const Countries = ({countries, setCountries}) => {
    if(!countries) return null;
    return countries.length <= 10 ? (<div>{countries.map(country => (<Country key={country.name} country={country} setCountries={setCountries}/>))}</div>) :
    (<p>Too many matches, specify another filter</p>);
};

export {Countries, CountryDetails};