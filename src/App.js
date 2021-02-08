import React, { useState } from "react";
import { Grid, Container, Hidden, Box } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "fontsource-roboto";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./redux/reducers/rootReducer.js";
import { Route, Switch, useHistory } from "react-router-dom";

import { Menu } from "./presenters/navigation.js";
import { Account } from "./presenters/account.js";
import { Portfolio } from "./presenters/portfolio.js";
import { SearchBar } from "./presenters/searchBar.js";
import { DetailedStock } from "./presenters/detailedStock";
import { HomePage } from "./presenters/homePage";
import { SearchResults } from "./presenters/searchResults";
import { Notification } from "./presenters/notification";

import { initUserState } from "./redux/actions/userActions.js";
import { initAuthState } from "./redux/actions/authActions.js";
import { initStockState } from "./redux/actions/stockActions.js";

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const saveState = (store) => {
    localStorage.setItem(
        "storeState",
        JSON.stringify({
        storedUserReducer:  store.getState().UserReducer,
        storedAuthReducer:  store.getState().AuthReducer,
        storedStockReducer: store.getState().StockReducer,
        })
    );
};

(() => {
    try {
        const {
            storedAuthReducer,
            storedUserReducer,
            storedStockReducer,
        } = JSON.parse(localStorage.getItem("storeState"));
        store.dispatch(initUserState(storedUserReducer));
        store.dispatch(initAuthState(storedAuthReducer));
        store.dispatch(initStockState(storedStockReducer));
    } catch {}
})();

function App() {
    const [darkMode, setDarkMode] = useState(true);
    let history = useHistory();
    store.subscribe(() => {
        if (store.getState().UserReducer.currentLocation !==window.location.hash)
            history.push(store.getState().UserReducer.currentLocation);
        setDarkMode(store.getState().UserReducer.darkMode);
        saveState(store);
    });

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
            main: "#1976d2",
            },
            secondary: {
            main: "#dd2c00",
            },
        },
    });

    theme.typography.h4 = {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "1.8rem",
        },
    };

    theme.typography.h5 = {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
        fontSize: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
        fontSize: "1.4rem",
        },
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box display="flex">
                <Notification/>
                <Container maxWidth="xl">
                    <Grid container spacing={1}>
                    <Hidden smDown>
                        <Grid item sm>
                        <Menu />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={12} md={8}>
                        <Hidden mdUp>
                        <Menu />
                        </Hidden>
                        <SearchBar />
                        <Switch>
                        <Route path="/account">
                            <Account />
                        </Route>
                        <Route path="/detailedStock">
                            <DetailedStock />
                        </Route>
                        <Route path="/portfolio">
                            <Portfolio />
                        </Route>
                        <Route path="/results">
                            <SearchResults />
                        </Route>
                        <Route path="/homePage">
                            <HomePage />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                        </Switch>
                    </Grid>
                    <Hidden smDown>
                        <Grid item xs></Grid>
                    </Hidden>
                    </Grid>
                </Container>
                </Box>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
