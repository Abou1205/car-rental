import { useEffect, useState } from "react";
import CustomFilter from "../components/CustomFilter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { fetchCars } from "../utils/fetchCars";
import { CarType } from "../types";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import ShowMore from "../components/ShowMore";
import { fuels, years } from "../constants";

const MainPage = () => {
  const [cars, setCars] = useState<CarType[] | null>(null);
  const [IsError, setIsError] = useState<boolean>(false);

  const [params] = useSearchParams();

  useEffect(() => {
    const paramObj = Object.fromEntries(params.entries());

    fetchCars(paramObj)
      .then((data) => setCars(data))
      .catch(() => setIsError(true));
  }, [params]);

  return (
    <div>
      <Hero />

      <div id="catalogue" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Discover the cars you like</p>
        </div>

        {/* filter */}
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter paramName={"year"} title="Year" options={years} />
            <CustomFilter
              paramName={"fuel_type"}
              title="Fuel Type"
              options={fuels}
            />
          </div>
        </div>

        {/* api data
        
          1) If the data is null > No response has been received from the API yet.

          2) If isError is true > An error occurred while fetching the response from the API.

          3) If the data array is empty > No matching element was found based on the specified criteria.

          4) If the data array is not empty > Data has been successfully received from the API
        
        */}
        {!cars ? (
          <div className="warn-container">
            <h2>Loading...</h2>
          </div>
        ) : IsError ? (
          <div className="warn-container">
            <h2>Sorry, there is something wrong!!!</h2>
          </div>
        ) : cars.length < 1 ? (
          <div className="warn-container">
            <h2>There are not any cars given search criteria</h2>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {cars?.map((car, index) => (
                <Card car={car} key={index} />
              ))}
            </div>
            <ShowMore />
          </section>
        )}
      </div>
    </div>
  );
};

export default MainPage;
