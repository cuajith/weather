import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import axios from 'axios';

function App() {

  const apikey = "60011b1120746aa89cf59b165bd8edb7"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName)
      return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apikey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
  }
  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }

  useEffect(() => {
    getWeatherDetails("delhi")
  }, [])
  return (
    <div className='col-md-12'>
      
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>

        <div className='d-flex gap-0 col-4 mt-4'>
          <input type="text" className='form-control' onChange={handleChangeInput} />
          <button className='btn btn-primary' type="button"
            onClick={handleSearch}><i class="fa fa-search" aria-hidden="true"></i></button>
        </div>

      </div>

      <div className='col-md-12 text-center mt-5'>

        <div className='shadow rounded weatherResultBox'>
          <div className='top'>
            <img className="weatherIcon" src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-cloud-weather-justicon-flat-justicon.png" />
            <p className="weathertemp">{((data?.main?.temp) - 273.15).toFixed(2)} °C</p>
            <div className='country-weather'>
              <h3 className="weathercity">{data?.name}</h3>
              <h6 className="weathercity">{data?.sys?.country}</h6>
            </div>
          </div>

          <div class="weather-info">
            <div>
              <h2 className='weather-info-heading'>Weather Info </h2>
            </div>
            <div className='weather-info-details'>
              <div className="weather-info-details-sub">
                <i class="fas fa-sunrise"></i>
                <div className="data-category">
                  <p>{data?.sys?.sunrise}</p>
                  <p className='sunrise'>Sunrise</p>
                </div>
              </div>

              <div className="weather-info-details-sub1">
                <i class="fas fa-dewpoint"></i>
                <div className="data-category">
                  <p>{data?.main?.humidity}</p>
                  <p className='humidity'>Humidity</p>
                </div>
              </div>
            </div>
          </div>

          <div class="weather-info">

            <div className='weather-info-details'>
              <div className="weather-info-details-sub2">
                <i class="fas fa-wind"></i>
                <div className="data-category">
                  <p>{data?.wind?.speed}</p>
                  <p className='sunrise'>Wind</p>
                </div>
              </div>

              <div className="weather-info-details-sub3">
                <i class="far fa-temperature-high"></i>
                <div className="data-category">
                  <p>{data?.main?.pressure}</p>
                  <p className='humidity'>Pressure</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
