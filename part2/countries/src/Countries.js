import React from 'react';
const Country = ({country, showDetail}) => {
    const details = (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>   
        <p>population {country.population}</p>
        <h3>languages</h3>
        {country.languages.map(language => (<p key={language.name}>{language.name}</p>))}
        <img src={country.flag} alt="flag" width="100" height="100"/>
      </div>
    );
    return showDetail ? details: (<p key={country.name}>{country.name}</p>)
};
const Countries = ({countries}) => {
    if(!countries) return null;
    const showDetail =  countries.length === 1 ? true : false;
    return countries.length <= 10 ? (<div>{countries.map(country => (<Country key={country.name} country={country} showDetail={showDetail}/>))}</div>) :
    (<p>Too many matches, specify another filter</p>);
};

export default Countries;