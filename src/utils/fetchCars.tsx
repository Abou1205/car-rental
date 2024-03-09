import { CarType } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};

type FilterType = {
  make?: string;
  model?: string;
  limit?: string;
  fuel_type?: string;
  year?: string;
};

export async function fetchCars(filter: FilterType): Promise<CarType[]> {
  const {
    make = "bmw",
    model = "m3",
    limit = "5",
    fuel_type = "",
    year = "",
  } = filter;

  const res = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&modelFamily=${model}&limit=${limit}&fuel_type=${fuel_type}&year=${year}`,
    options
  );
  const data = await res.json();

  return data;
}
