import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { WeatherCardProps } from "./App";
import arrowBack from "./assets/arrowBack.svg";
import { Loading } from "./Loading";
import "./weatherCard.scss";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  list: {
    main: {
      temp: number;
    };
    dt_txt: string;
  }[];
}

type WeatherType = "Clouds" | "Clear" | "Snow" | "Rain";

export function WeatherCard({ city }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [colorText, setColorText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  // const [forecastData, setForecastData] = useState<WeatherData | null>(null);
  // const [filteredForecast, setFilteredForecast] = useState([]);
  const { cityname } = useParams();

  const formatTimestamp = (timestamp: number): string => {
    const apiHour = new Date(timestamp * 1000);
    const hours = apiHour.getHours();
    const minutes = apiHour.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

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
    setIsLoading(false);

    return () => {
      controller.abort();
    };
  }, [city, weatherType, weather?.sys?.sunrise, cityname]);

  // useEffect(() => {
  //   const filterForecastByFirstObjTime = () => {
  //     if (!forecastData || !forecastData.list) {
  //       return [];
  //     }

  //     const firstObjTime = forecastData.list;
  //     const filteredData = forecastData.list.filter((data) =>
  //       data.dt_txt.endsWith(firstObjTime[0].dt_txt)
  //     );
  //     setFilteredForecast(filteredData as never[]);
  //   };

  //   filterForecastByFirstObjTime();
  // }, [forecastData]);

  // useEffect(() => {
  //   const getWeatherTimes = async () => {
  //     try {
  //       const responseTimes = await axios.get<WeatherData>(
  //         `https://api.openweathermap.org/data/2.5/forecast?lat=${weather?.coord.lat}&lon=${weather?.coord.lon}&units=metric&APPID=d4f88a2936417f5a3ee60d915e98397f
  //           `
  //       );
  //       setForecastData(responseTimes.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados de clima", error);
  //     }
  //   };
  //   getWeatherTimes();
  // }, [weather?.coord.lat, weather?.coord.lon]);

  // function to filter forecast data on the time of the first object
  // const filterForecastData = () => {
  //   const firstObjectTime = forecastData?.list[0].dt_txt.split(" ")[1];
  //   const filteredData = forecastData?.list.filter(
  //     (item: { dt_txt: string }) =>
  //       item.dt_txt.split(" ")[1] === firstObjectTime
  //   );
  //   return filteredData;
  // };

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
                      <span>{weather.main.temp_max.toFixed(0)}°</span>
                      <span>{weather.main.temp_min.toFixed(0)}°</span>
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
                    <span>icone</span>
                    <div className="spaceBetween">
                      <span>{weather.main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="dayTimeBox">
                    <span>morning</span>
                    <span>icone</span>
                    <div className="spaceBetween">
                      <span>{weather.main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="dayTimeBox">
                    <span>afternoon</span>
                    {}
                    <span>icone</span>
                    <div className="spaceBetween">
                      <span>{weather.main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="dayTimeBox">
                    <span>night</span>
                    <span>icone</span>
                    <div className="spaceBetween">
                      <span>{weather.main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                </div>

                {/* {filteredForecast.length > 0 ? (
                  <div className="extended-forecasts-container">
                    {filteredForecast.map((data, index) => {
                    
                      return (
                        <>
                        <div className="dayTimeBox" key={index}>
                          <span>dawn</span>
                          <img
                            src={`https://openweathermap.org/img/wn/${(data as { weather: any[] }).weather[2].icon}.png`}
                            alt="icon"
                          />
                          <div className="spaceBetween">
                            <span>{weather.main.temp.toFixed(0)}</span>
                            <span>°C</span>
                          </div>
                        </div>
                        <div className="dayTimeBox" key={index}>
                        <span>morning</span>
                        <img
                          src={`https://openweathermap.org/img/wn/${(data as { weather: any[] }).weather[4].icon}.png`}
                          alt="icon"
                        />
                        <div className="spaceBetween">
                          <span>{weather.main.temp.toFixed(0)}</span>
                          <span>°C</span>
                        </div>
                      </div>
                      <div className="dayTimeBox" key={index}>
                      <span>afternoon</span>
                      <img
                        src={`https://openweathermap.org/img/wn/${(data as { weather: any[] }).weather[6].icon}.png`}
                        alt="icon"
                      />
                      <div className="spaceBetween">
                        <span>{weather.main.temp.toFixed(0)}</span>
                        <span>°C</span>
                      </div>
                    </div>
                    <div className="dayTimeBox" key={index}>
                    <span>night</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${(data as { weather: any[] }).weather[8].icon}.png`}
                      alt="icon"
                    />
                    <div className="spaceBetween">
                      <span>{weather.main.temp.toFixed(0)}</span>
                      <span>°C</span>
                    </div>
                  </div>
                  </>
                      );
                    })}
                  </div>
                ) : (
                  <div className="error-msg">No Data Found</div>
                )} */}

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
