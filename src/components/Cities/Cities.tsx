import { useParams } from "react-router-dom";
import {WeatherCard} from "../WeatherCard/WeatherCard";

export function Cities() {
  const { cityname } = useParams();
  return (
    <div>
      {cityname && <WeatherCard city={cityname} />}
    </div>
  );
}
