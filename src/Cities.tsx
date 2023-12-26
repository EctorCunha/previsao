import { useParams } from "react-router-dom";
// import { WeatherCardProps,  } from "./App";
import {WeatherCard} from "./WeatherCard";

export function Cities() {
  const { cityname } = useParams();
  return (
    <div>
      {cityname && <WeatherCard city={cityname} />}
    </div>
  );
}
