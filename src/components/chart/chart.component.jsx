import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../axios/axios";

import "./chart.styles.scss";

const Chart = ({ data: { confirmed, recovered, deaths } , country }) => {

    const [ dailyData, setDailyData ] = useState([]);

    const fetchedDailyData = async () => {
        const dailyData = await fetchDailyData();
        setDailyData(dailyData);
    }

    useEffect(() => {
        fetchedDailyData();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
            <Line 
                data = {{
                    labels: dailyData.map(({ date}) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "#ff0000",
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                        fill: true
                    }]
                }}
            />
          )
        : null
    ); 

    const barChart = (
        confirmed
        ? (
            <Bar 
                data = {{
                    labels: ["Infected", "Recovered", "Deaths"],
                    datasets: [{
                        label: "People",
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)"
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options = {{
                    legend: { display: false },
                    title: { 
                        display: true, 
                        text: `Current situation in ${country}`
                    }
                }}
            />
          )
        : null
    );

    return (
        <div className="container">
            {
                country ? barChart : lineChart
            }
        </div>
    )
};

export default Chart;