import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Button,
    ButtonGroup,
} from "@material-ui/core";

const intervals = [
    { key: "Daily", value: "TIME_SERIES_DAILY_ADJUSTED" },
    { key: "Weekly", value: "TIME_SERIES_WEEKLY_ADJUSTED" },
    { key: "Monthly", value: "TIME_SERIES_MONTHLY_ADJUSTED" },
];
const findValue = (key) => intervals.find((obj) => obj.key === key).value;

const useStyles = makeStyles({
    form: {
        width: "150px",
    },
});

export const GraphView = ({ data, onIntervalChange, interval }) => {
    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Prices'
                    },
                    ticks: {},
                },
            ],
            xAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    ticks: {
                        maxTicksLimit: 5,
                        maxRotation: 0,
                        minRotation: 0,
                    },
                },
            ],
        },
        elements: {
            point: {
                radius: 3,
                borderColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: "rgba(0, 0, 0, 0)",
            },
        },
    };
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Line
                data={{
                    labels: data && data["labels"],
                    datasets: [
                        {
                            data: data && data["values"],
                            fill: true,
                            backgroundColor: "rgb(13, 71, 161)",
                            borderColor: "rgb(33, 150, 243)",
                        },
                    ],
                }}
                options={options}
            />
            <br />
            <Box textAlign="center">
                <ButtonGroup
                    fullWidth={true}
                    aria-label="outlined primary button group"
                >
                    <Button
                        onClick={() => onIntervalChange(findValue("Daily"))} disabled={interval === intervals[0]["value"]}
                    >
                        100 Days
                    </Button>
                    <Button
                        onClick={() => onIntervalChange(findValue("Weekly"))} disabled={interval === intervals[1]["value"]}
                    >
                        100 Weeks
                    </Button>
                    <Button
                        onClick={() => onIntervalChange(findValue("Monthly"))} disabled={interval === intervals[2]["value"]}
                    >
                        100 Months
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};