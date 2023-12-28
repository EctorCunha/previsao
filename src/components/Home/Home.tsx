// import { Link } from "react-router-dom";
import globe from "../../assets/globe.svg";
import "./home.scss";

export function Home() {
  const cities = ["Dallol", "Fairbanks", "London", "Recife", "Vancouver", "Yakutsk"]
  return (
    <div className="container">
      <div className="title">
        <h1>WEATHER</h1>
        <h4 className="subtitle">Select a city</h4>
      </div>
      <img
        className="globeImage"
        src={globe}
        width={124}
        alt="ícone do planeta terra em preto e branco"
      />

      <ul className="list">
        {cities.map((city, index) => (
          <li key={index}>
            <a href={`/city/${city}`}>{city}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
