import { Key } from "react";

export interface WeatherData {
  map(
    arg0: (
      data: {
        weather:
          | { icon: string }[]
          | { icon: string }[]
          | { icon: string }[]
          | { icon: string }[];
      },
      index: Key | null | undefined
    ) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    weather: any;
    icon: string;
    main: {
      temp: number;
    };
    dt_txt: string;
  }[];
}

export type WeatherType = "Clouds" | "Clear" | "Snow" | "Rain";
