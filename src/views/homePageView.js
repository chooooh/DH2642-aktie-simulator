import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
    Typography,
    Container,
    CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
    },
    media: {
        height: 0,
    },
});

export const HomePageView = ({ redirect }) => {
    const classes = useStyles();
    return (
        <Container>
            <Card className={classes.root} variant="outlined">
                    <CardMedia
                        component="img"
                        height="100%"
                        src="https://www.nasdaq.com/sites/acquia.prod/files/styles/720x400/public/2020/03/16/stocks-iamchamp-adobe.jpg?h=6acbff97&itok=8CjW1T_R"
                    />
                    <CardContent align="center"> 
                        <Typography variant="h4">
                            Welcome to Stock Simulator
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Here you can search the stock market and view stocks
                            in great detail. Register an account to create your
                            own custom portfolio and simulate investing in the
                            real stock market. Your portfolio will develop
                            according to real stock market data.
                        </Typography>
                    </CardContent>
            </Card>
        </Container>
    );
};
