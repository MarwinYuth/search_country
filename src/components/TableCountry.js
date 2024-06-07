import React, { useEffect, useState } from "react";
import { list, search } from "../actions/country"; // renamed import to avoid conflict
import Card from "./card";

export default function TableCountry() {
  const [countryName, setCountryName] = useState({ name: "" });
  const [country, setCountry] = useState([]);

  useEffect(() => {
    countryList();
  }, []);

  const countryList = async () => {
    const { data } = await list();
    setCountry(data);
  };

  const handleChange = (e) => {
    setCountryName({ name: e.target.value });
  };

  const searchCountry = async () => {
    if (countryName.name.trim() === "") {
      countryList();
      return;
    }
    const { data } = await search(countryName.name);
    setCountry(data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchCountry();
  };

  return (
    <div className="flex gap-4 justify-between mt-14 flex-wrap">
      <div>
        <form onSubmit={handleSearch}>
          <input
            value={countryName.name}
            onChange={handleChange}
            className="border border-red-500"
          />
          <button type="submit" className="border border-red-500 ml-2">
            Search
          </button>
        </form>
      </div>
      {country.map((item, index) => {
        return <Card key={index} data={item} />;
      })}
    </div>
  );
}
