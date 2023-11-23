import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("")
  const [selected, setSelected] = useState(-1)

  const fetchCountriesByName = (name) => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        setCountries(response.data)
      })
      .catch((err) => console.log(err));
  }

  const handleCountryChange = (event) => {
    setSelected(-1);
    if (event.target.value) {
      setCountryName(event.target.value);
      fetchCountriesByName(event.target.value);
    }
    else {
      setCountries([]);
    }
  }

  const handleShowCountry = (position) => {
    if (position === selected) setSelected(-1);
    else setSelected(position);
  }



  return (
    <>
      <div>Find countries: <input name="country" onChange={handleCountryChange} /></div>
      <div>
        {
          (!countryName.length) ? <p>No Country to search. Please fill your country name.</p> : null
        }

        {
          countries.length === 1 && <CountryView country={countries[0]} />
        }

        {countries.length > 10 ?
          <p>Too many matches ({countries.length}), specify another filter.</p>
          :
          <>
            {
              (countries.length > 1) ?
                <ul>
                  {
                    countries.map((country, index) => <li key={index}>
                      {country.name.common}

                      <button
                        onClick={() => handleShowCountry(index)}
                        style={{ marginLeft: "10px" }} >show</button>
                      <br />
                      {
                        selected == index && <CountryView country={country} />
                      }
                    </li>)
                  }
                </ul>
                : null
            }
          </>
        }
      </div>
    </>
  )
}

export default App

const CountryView = ({ country }) => { 
   const [weather, setWeather] = useState({
    speed: 0,
    temp: {
      day: 0
    },
    weather: [
      {
        icon: "12d"
      }
    ]
   });

  const fetchWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${country.capital[0]}&mode=json&units=metrics&cnt=1&APPID=94c6cf0868fa5cb930a5e2d71baf0dbf`)
      .then(response => {
        console.log(response.data.list[0]);
        setWeather(response.data.list[0]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(fetchWeather, [country.capital[0]]);

  return <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area} Km²</p>
    <h3>Languages:</h3>
    <ul>
      {
        Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>)
      }
    </ul><br />
    <img src={country.flags.png} alt="drapeau" height={180} width={180} style={{ marginTop: 20 }} />

    <br />
    <h3>Weather in {country.capital[0]}</h3>
    <p>Temperature {(weather.temp.day / 10).toFixed(2)} celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="temps" height={120} width={120} style={{ marginTop: 10 }} />
    <p>Wind {weather.speed} m/s</p>
  </div>
}
