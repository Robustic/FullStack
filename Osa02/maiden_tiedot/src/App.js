import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryName = (props) => {
    const activateLasers = () => {
        props.setCountry(props.name)
    }
    return (
        <tr>
            <td>{props.name} &nbsp;
                <button onClick={activateLasers}>
                    show
                </button>
            </td>
        </tr >
    )
}

const Language = (props) => {
    return (
        <li>{props.name}</li>
    )
}

const TempAndWind = (props) => {
    if ('current' in props.weather) {
        const current = props.weather.current
        return (
            <div>
                <p><b>temperature: </b> {current.temperature} Celsius</p>
                <img src={current.weather_icons} alt="Weather" width="100"></img>
                <p><b>wind: </b> {current.wind_speed} kph direction {current.wind_dir}</p>
            </div>
        )
    } else {
        return ''
    }
}

const Weather = (props) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        var startstr = 'http://api.weatherstack.com/current?access_key=3ac9d68ab5350f75c13a151786b8cad5&query='
        var endstr = '&units=m'
        var urlname = startstr.concat(props.capital).concat(endstr)
        axios
            .get(urlname)
            .then(response => {
                setWeather(response.data)
            })
    }, [props])
    return (
        <div>
            <h3>Weather in {props.capital}</h3>
            <TempAndWind
                key={props.capital}
                weather={weather}
            />
        </div>
    )
}

const Country = (props) => {
    const languages = () => props.languages.map(language =>
        <Language
            key={language.name}
            name={language.name}
        />
    )
    const capital = props.capital
    return (
        <div>
            <h2>{props.name}</h2>
            <table>
                <tbody>
                    <tr><td>capital {capital}</td></tr>
                    <tr><td>population {props.population}</td></tr>
                </tbody>
            </table>
            <h3>languages</h3>
            {languages()}
            <br></br>
            <img src={props.flag} alt="Flag" width="200"></img>
            <Weather
                key={capital}
                capital={capital}
            />
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
                setCountry={props.setCountry}
            />
        )
        return (
            <div>
                <table>
                    <tbody>
                        {rows()}
                    </tbody>
                </table>
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
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const setCountry = (country) => {
        setFilter(country)
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
                setCountry={setCountry}
            />
        </div>
    )
}

export default App