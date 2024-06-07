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

  const handleChange = async (e) => {
    setCountryName({ name: e.target.value });

    if (countryName.name.trim() === "") {
      countryList();
      return;
    }
    const { data } = await search(countryName.name);
    setCountry(data);
  };

  return (
    <div className="flex gap-4 justify-between mt-14 flex-wrap">
      <div>
        <input
          value={countryName.name}
          onChange={handleChange}
          className="border border-red-500"
        />
      </div>
      {country.map((item, index) => {
        return <Card key={index} data={item} />;
      })}
    </div>
  );
}
