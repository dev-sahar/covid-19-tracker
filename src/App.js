import React, { useState, useEffect } from 'react';

import Cards from "./components/cards/cards.component";
import Chart from "./components/chart/chart.component";
import CountryPicker from "./components/country-picker/country-picker.component";
import Spinner from "./components/spinner/spinner.component";

import { fetchData } from "./axios/axios";

import { ReactComponent as Logo } from "./assets/logo.svg"; 

import './App.css';

const App = () => {
  const [ data, setData ] = useState({});
  const [ country, setCountry ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);

  const fetchedData = async () => {
    const data = await fetchData();
    setData(data);
    setIsLoading(false);
  }

  //componentDidMount
  useEffect(() => {
    fetchedData();
  }, []);

  const handleChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
    setIsLoading(false);
  }

  if(isLoading) return <Spinner /> 

  return (
    <div className="container">
      <Logo className="logo" />
      <Cards data={data} />
      <CountryPicker handleChange={handleChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
