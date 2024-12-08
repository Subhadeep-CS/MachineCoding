import React, { useState } from "react";

interface Country {
  id: number;
  name: string;
  states: string[];
}

interface State {
  id: number;
  name: string;
  cities: string[];
}

const DependableSelectBox: React.FC = () => {
  const [countries] = useState<Country[]>([
    { id: 1, name: "USA", states: ["California", "Texas", "New York"] },
    {
      id: 2,
      name: "India",
      states: ["Maharashtra", "Karnataka", "Tamil Nadu"],
    },
  ]);

  const [states] = useState<State[]>([
    {
      id: 1,
      name: "California",
      cities: ["Los Angeles", "San Francisco", "San Diego"],
    },
    { id: 2, name: "Texas", cities: ["Houston", "Dallas", "Austin"] },
    {
      id: 3,
      name: "New York",
      cities: ["New York City", "Buffalo", "Rochester"],
    },
    { id: 4, name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
    { id: 5, name: "Karnataka", cities: ["Bengaluru", "Mysuru", "Hubli"] },
    { id: 6, name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
  ]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
    const country = countries.find((c) => c.name === selected);
    const stateNames = country?.states || [];
    setFilteredStates(states.filter((s) => stateNames.includes(s.name)));
    setFilteredCities([]);
    setSelectedState("");
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedState(selected);

    // Filter cities based on selected state
    const state = states.find((s) => s.name === selected);
    setFilteredCities(state?.cities || []);
  };

  return (
    <div>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>

      {filteredStates.length !== 0 && (
        <>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">Select a state</option>
            {filteredStates.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </>
      )}
      {filteredCities.length !== 0 && (
        <>
          <select id="city" disabled={!selectedState}>
            <option value="">Select a city</option>
            {filteredCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default DependableSelectBox;
