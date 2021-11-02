import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import moment from "moment";

function App() {
  const [city, setCity] = useState("");

  const [weatherForecast, setWeatherForecast] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const searchForecastWeather = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&lang=pt`
    )
      .then((response) => {
        setIsLoading(true);
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          return setError("Não Encontrado");
        } else {
          return setError("Erro com o sistema, favor reportar ao suporte");
        }
      })
      .then((data) => {
        setWeatherForecast(data);
        setCity("");
        setIsLoading(false);
      });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-shrink-0">
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <a className="navbar-brand mx-auto" href="#search">
            Previsão do Tempo API
          </a>
        </nav>

        <main className="container mb-5" id="search">
          <div className="jumbotron bg-light text-center">
            <h1>Verifique agora a previsão do tempo na sua cidade!</h1>
            <p className="lead text-center">
              Digite a sua cidade no campo abaixo e clique em pesquisar.
            </p>
            <div className="container-fluid">
              <div className="mb-4 mx-auto ">
                <div>
                  <input
                    type="text"
                    placeholder="Digite o nome de uma cidade"
                    className="form-control"
                    value={city}
                    onChange={handleCityChange}
                  />
                </div>
              </div>
              <button
                className="btn btn-lg btn-primary text-center"
                onClick={searchForecastWeather}
                disabled={city.length === 0 || isLoading}
              >
                {isLoading ? "Pesquisando..." : "Pesquisar"}
              </button>
            </div>

            {weatherForecast ? (
              <div className="mt-4 flex-column align-items-center">
                <div>
                  <h6>
                    {weatherForecast.location.name}
                    {" - "}
                    {weatherForecast.location.region}
                    {" - "}
                    {weatherForecast.location.country}
                  </h6>
                </div>
                <div className="mx-auto d-md-flex justify-content-center align-items-center">
                  <img
                    src={weatherForecast.current.condition.icon}
                    alt="weather icon"
                  />
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                </div>
                <div>
                  <div className="mx-auto d-md-flex justify-content-md-around justify-content-center align-items-center">
                    <p className="lead">
                      Temperatura: {weatherForecast.current.temp_c}°C /{" "}
                      {weatherForecast.current.temp_f}°F
                    </p>
                    <p className="lead">
                      Sensação Térmica : {weatherForecast.current.feelslike_c}°C
                      / {weatherForecast.current.feelslike_f}°F
                    </p>
                  </div>
                  <div className="mx-auto d-md-flex justify-content-md-around justify-content-center align-items-center">
                    <p className="lead">
                      Humidade : {weatherForecast.current.humidity}%
                    </p>
                    <p className="lead">
                      Velocidade do Vento : {weatherForecast.current.wind_kph}
                      Km/H / {weatherForecast.current.wind_mph}MPH
                    </p>
                  </div>
                  <p>
                    <p className="mt-4">
                      Atualizado em :{" "}
                      {moment(weatherForecast.current.last_updated).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    </p>
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-danger">
                <h4 className="fw-bold">{error}</h4>
              </div>
            )}
          </div>
        </main>
      </div>
      <footer className="mt-auto py-2 bg-light">
        <div className="container d-flex justify-content-center">
          <p className="">
            &copy; Desenvolvido por{" "}
            <a
              href="https://github.com/pedrohbs00"
              target="_blank"
              rel="noreferrer"
              className="list-group-item-action"
            >
              <Icon icon="logos:github-icon" />
              Pedro H.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
