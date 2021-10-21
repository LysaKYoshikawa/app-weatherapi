import { useState } from "react";

function App() {
  //dom tudo que esta na tela branco
  const [city, setCity] = useState("");

  const [weatherForecast, setWeatherForecast] = useState(null)

  const searchForecastWeather = () => {
    let cidade = especialCharMask(city)
    fetch(`
    http://api.weatherapi.com/v1/current.json?key=e751ea9cf5bc4fcbbb3225428211810&q=${cidade}&lang=pt
    `).then((response) => {
      if(response.status === 200){
        return response.json()
      }
    }).then((data)=>{
      setWeatherForecast(data)
    })

    //console.log("clicou", city);
  };

  const especialCharMask = (city) => {
    city = city.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return city;
}

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#">
            tempo
          </a>
        </nav>

        <main>
          <div className="jumbotron" id="search">
            <h1>Verifique o tempo na sua cidade</h1>
            <p className="lead">
              digita sua cidadde abaixo e em seguida clique em procurar
            </p>
            <div className="row mb-4">
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={handleCityChange}
              />
            </div>

            <button
              className="btn btn-lg btn-primary"
              onClick={searchForecastWeather}
            >
              Pesquisar
            </button>

            { 
            weatherForecast ?(
              <div className="mt-4 d-flex align-items-center">
                <div className="col-sm-l">
                  <img src={weatherForecast.current.condition.icon} alt="weather icon" />
                </div>
                <div>
                  <h3>Hoje o dia esta: {weatherForecast.current.condition.text}</h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c}
                  </p>
                </div>
              </div>
              ) : null
            }
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
