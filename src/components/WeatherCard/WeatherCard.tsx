import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { WeatherCardProps } from "../../App";
import { Loading } from "../Loading/Loading";
import { WeatherData, WeatherType } from "../../types";
import { formatTimestamp } from "../../utils";
import arrowBack from "../../assets/arrowBack.svg";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";
import "./weatherCard.scss";

export function WeatherCard({ city }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [colorText, setColorText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [forecastData, setForecastData] = useState<WeatherData | null>(null);
  const { cityname } = useParams();

  const weatherType = weather?.weather.map((type) => type.main) as
    | WeatherType
    | undefined;

  useEffect(() => {
    const controller = new AbortController();
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=d4f88a2936417f5a3ee60d915e98397f&units=metric
          `,
          { signal: controller.signal }
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de clima", error);
      }

      const weatherColors: Record<WeatherType, string> = {
        Clouds: "#D7D7D7",
        Clear: "#57CBDC",
        Snow: "#D7D7D7",
        Rain: "#5E6575",
      };

      const colorText: Record<WeatherType, string> = {
        Clouds: "#000",
        Clear: "#fff",
        Snow: "#000",
        Rain: "#fff",
      };

      setBackgroundColor(weatherColors[weatherType!] || "");
      setColorText(colorText[weatherType!] || "black");
    };
    fetchWeather();
    formatTimestamp(weather?.sys?.sunrise ?? 0);

    return () => {
      controller.abort();
    };
  }, [city, weatherType, weather?.sys?.sunrise, cityname]);

  useEffect(() => {
    const getWeatherTimes = async () => {
      try {
        const responseTimes = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weather?.coord.lat}&lon=${weather?.coord.lon}&units=metric&APPID=d4f88a2936417f5a3ee60d915e98397f
            `
        );
        setForecastData(responseTimes.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados de clima", error);
      }
    };
    getWeatherTimes();
  }, [weather?.coord.lat, weather?.coord.lon]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="containerCard"
          style={{
            background: backgroundColor,
            color: colorText,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            minHeight: "100vh",
          }}
        >
          <Link to="/">
            <img
              className="arrowBack"
              style={{ backgroundColor: backgroundColor, color: colorText }}
              src={arrowBack}
              alt="voltar para a página inicial"
            />
          </Link>
          <div className="card">
            {weather && (
              <div className="card-body">
                <div className="card-title">
                  <h1>{city}</h1>
                  {weather.weather.map((tempo) => (
                    <h3 className="card-subtitle" key={tempo.id}>
                      {tempo.main}
                    </h3>
                  ))}
                </div>

                <div className="mainTempContainer">
                  <div className="mainTempBox">
                    <h1 className="mainTemp">{weather.main.temp.toFixed(0)}</h1>
                    <div className="variation">
                      <span className="celcius">°C</span>

                      <div className="variationBox">
                      <div className="upDown">
                        <img src={arrowUp} alt="" />
                        <img src={arrowDown} alt="" />
                      </div>
                      <div className="upDown">
                        <span>{weather.main.temp_max.toFixed(0)}°</span>
                        <span>{weather.main.temp_min.toFixed(0)}°</span>
                      </div>
                      </div>

                    </div>
                  </div>

                  {weather.weather.map((w) => (
                    <img
                      className="image"
                      key={weather.sys.id}
                      src={`https://openweathermap.org/img/wn/${encodeURIComponent(
                        w.icon
                      )}@2x.png`}
                      alt={w.description}
                    />
                  ))}
                </div>

                <div className="dayTimeContainer">
                  <div className="dayTimeBox">
                    <span>dawn</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecastData?.list[3].weather[0].icon}.png`}
                      alt="icon"
                    />
                    <div className="spaceBetween">
                      <span>{forecastData?.list[3].main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="dayTimeBox">
                    <span>morning</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecastData?.list[5].weather[0].icon}.png`}
                      alt="icon"
                    />
                    <div className="spaceBetween">
                      <span>{forecastData?.list[5].main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="dayTimeBox">
                    <span>afternoon</span>
                    {}
                    <img
                      src={`https://openweathermap.org/img/wn/${forecastData?.list[7].weather[0].icon}.png`}
                      alt="icon"
                    />
                    <div className="spaceBetween">
                      <span>{forecastData?.list[7].main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="dayTimeBox">
                    <span>night</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecastData?.list[9].weather[0].icon}.png`}
                      alt="icon"
                    />
                    <div className="spaceBetween">
                      <span>{forecastData?.list[9].main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                </div>
                <div className="characteristicsContainer">
                  <div className="characteristicsBox">
                    <p>wind speed</p>
                    <span>{weather.wind.speed} m/s</span>
                  </div>
                  <div className="characteristicsBox">
                    <p>sunrise</p>
                    <span>{formatTimestamp(weather?.sys?.sunrise ?? 0)}</span>
                  </div>
                  <div className="characteristicsBox">
                    <p>sunset</p>
                    <span>{formatTimestamp(weather?.sys?.sunset ?? 0)}</span>
                  </div>
                  <div className="characteristicsBox">
                    <p>humidity</p>
                    <span>{weather.main.humidity}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
