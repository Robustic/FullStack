import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryName = (props) => {
    return (
        <p>{props.name}</p>
    )
}

const Language = (props) => {
    return (
        <li>{props.name}</li>
    )
}

const Country = (props) => {
    const languages = () => props.languages.map(language =>
        <Language
            key={language.name}
            name={language.name}
        />
    )
    return (
        <div>
            <h2>{props.name}</h2>
            <p>capital {props.capital}</p>
            <p>population {props.population}</p>
            <h3>languages</h3>
            {languages()}
            <br></br>
            <img src={props.flag} alt="Flag" width="200"></img>
        </div>
    )
}

const Filter = (props) => {
    return (
        <div>
            find countries:
            <input
                value={props.filter}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

const Countries = (props) => {
    const filteredCountries = props.countries.filter(country =>
        (country.name.toLowerCase().includes(props.filter.toLowerCase()))
    )
    if (filteredCountries.length === 0) {
        return 'No any matches, specify another filter'
    } else if (filteredCountries.length === 1) {
        const rows = () => filteredCountries.map(country =>
            <Country
                key={country.name}
                name={country.name}
                capital={country.capital}
                population={country.population}
                languages={country.languages}
                flag={country.flag}
            />
        )
        return (
            <div>
                {rows()}
            </div>
        )
    } else if (filteredCountries.length < 10) {
        const rows = () => filteredCountries.map(country =>
            <CountryName
                key={country.name}
                name={country.name}
            />
        )
        return (
            <div>
                {rows()}
            </div>
        )
    } else {
        return 'Too many matches, specify another filter'
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
        // console.log(countries)
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <Filter
                filter={filter}
                handleFilterChange={handleFilterChange}
            />
            <Countries
                countries={countries}
                filter={filter}
            />
        </div>
    )
}

export default App