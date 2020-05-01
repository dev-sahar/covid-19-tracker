import React, { useState, useEffect} from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../axios/axios";

import "./country-picker.styles.scss";

const CountryPicker = ({ handleChange }) => {
    const [countries, setCountries] = useState([]);

    const fetchedCountries = async () => {
        const countries = await fetchCountries();
        setCountries(countries);
    }

    useEffect(() => {
        fetchedCountries();
    }, []);

    return (
        <FormControl className="formControl">
            <NativeSelect defaultValue="" onChange={event => handleChange(event.target.value)}>
                <option value="">Global</option>
                {
                    countries.map( (country, index) => (<option key={index} value={country}>{ country }</option>))
                }
            </NativeSelect>
        </FormControl>
    )
};

export default CountryPicker;