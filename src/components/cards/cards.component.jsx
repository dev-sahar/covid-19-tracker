import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";

import "./cards.styles.scss";

const Cards = ({data: { confirmed, recovered, deaths, lastUpdate } }) => {

    const date = new Date(lastUpdate).toDateString();

    const status = [confirmed, recovered, deaths];
        
    let text;
   
    return (
        <div className="container">
            <Grid container spacing={3} justify="center">
                {     
                    status.map((item, index) => {

                        if (item === confirmed) {
                            text = "infected"
                        } else if (item === recovered ) {
                            text = "recovered"
                        } else {
                            text = "deaths"
                        }

                        return (
                            <Grid item component={Card} xs={12} md={3} key={index} className={`card ${text}`}>
                                <CardContent>
                                    <Typography color="textSecondary" className="capitalize" gutterBottom>{text}</Typography>
                                    <Typography variant="h5">
                                        <CountUp 
                                            start={0}
                                            end={item.value}
                                            duration={2.5}
                                            separator=","
                                        />
                                    </Typography>
                                    <Typography color="textSecondary">{date}</Typography>
                                    <Typography variant="body2">Number of {text === "deaths" ? `${text}` : `${text} cases`} of COVID-19</Typography>
                                </CardContent>
                            </Grid>
                        )}
                    )
                }               
            </Grid>
        </div>
    )
};

export default Cards;