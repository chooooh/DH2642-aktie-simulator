
import React from "react";
import { Graph } from "../presenters/graph.js";

import {
    Grid,
    Button,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    Box,
    CircularProgress,
    TableContainer,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";

export function DetailedStockView ({
    tickerChosen,
    companyInfo,
    data,
    requestingStockData,
    user,
    onBuy,
    userBalance,
}) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [message, setMessage] = React.useState("");
    const { labels, values } = data ? data : { labels: null, values: null };

    const lastDate = labels && labels[labels.length-1];
    const lastValue = values && values[values.length-1];


    if (!tickerChosen) {
        return (
            <Typography>
                "Please choose stock!"
            </Typography>
        );
    } else if (requestingStockData) {
        return (
            <Box align="center">
                <CircularProgress />
            </Box>
        );
    } else if (JSON.stringify(data) === '{}') {
        return <Box align="center"><Typography>{tickerChosen + " "} does not exist!</Typography></Box>;
    }
    else
        return (
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={24}>
                            <Box p={2}>
                                <Box display="flex">
                                    <Box flexGrow={1}>                         
                                        <Typography variant="h4" align="left">
                                            {tickerChosen}
                                        </Typography>
                                    </Box>
                                        {user && (                                    
                                    <Box>
                                        <Button
                                            style={{minWidth: '150px'}}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setDialogOpen(true)}
                                        >BUY</Button>
                                    </Box>
                                    )}
                                </Box>
                                   
                                {data["values"] && (
                                <Box display="flex">
                                    <Box flexGrow={1}>
                                        <Typography variant="subtitle1">
                                            Price per share{" "}
                                            {lastValue}
                                            {" "}USD
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1">  
                                        Updated{" "}
                                        {lastDate}{" "}
                                        </Typography>
                                    </Box>
                                </Box>
                                    )}
                                <br />
                                {data && <Graph />}
                            </Box>
                        </Paper>
                    </Grid>
                    {(JSON.stringify(companyInfo) !== '{}') && <Grid item xs={12}>
                        <Paper elevation={24}>
                            <Grid container>
                                <Box padding={1}>
                                    <Grid item xs={12}>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Company name:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.name ||
                                                                "no data"}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Country:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.country ||
                                                                "no data"}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Currency:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.currency ||
                                                                "no data"}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Yearly revenue:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.yearlyRevenue &&
                                                                (companyInfo.yearlyRevenue.substring(
                                                                    0,
                                                                    companyInfo
                                                                        .yearlyRevenue
                                                                        .length -
                                                                        6
                                                                ) +
                                                                    " million $" ||
                                                                    "no data")}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Yearly profit:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.yearlyProfit &&
                                                                (companyInfo.yearlyProfit.substring(
                                                                    0,
                                                                    companyInfo
                                                                        .yearlyProfit
                                                                        .length -
                                                                        6
                                                                ) +
                                                                    " million $" ||
                                                                    "no data")}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Industry:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.industry ||
                                                                "no data"}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">
                                                            Full time employees:
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {companyInfo.fullTimeEmployees ||
                                                                "no data"}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box p={1}>
                                            <Typography
                                                variant="h5"
                                                align="left"
                                            >
                                                Company Description
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                align="left"
                                            >
                                                {companyInfo.description ||
                                                    "no description to display"}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Paper>
                    </Grid>}
                </Grid>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Manage purchase</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <Typography>
                                {tickerChosen},{" "}
                                {companyInfo && companyInfo.name}
                            </Typography>
                            <Typography>
                                {data["values"] && lastValue}{" "}USD
                                per share
                            </Typography>
                            <br/>
                            <FormControl>
                                <TextField
                                error={message ? true : false}
                                label="Shares"
                                id="outlined-error-helper-text"
                                variant="outlined"
                                type="number"
                                value={quantity}
                                aria-describedby="my-helper-text"
                                onInput={(e) => {
                                    setQuantity(e.target.value);
                                    if (Math.sign(e.target.value) < 1)
                                        setMessage("Invalid quantity");
                                    else if ((e.target.value * lastValue) > userBalance)
                                        setMessage("Not enough funds")
                                    else
                                        setMessage("");
                                }}
                                helperText={message}
                                />
                            </FormControl>
                            <br/>
                            {!message && <Typography>
                                Total cost {" "}
                                {data["values"] && !message &&
                                    lastValue * quantity}
                                {" "}USD
                                <br />
                            </Typography>}
                            <Typography>
                                Current balance {userBalance ? userBalance.toFixed(2) : "Could not fetch your balance"} USD <br />
                                Balance after purchase {" "}
                                {(data["values"] && userBalance) &&
                                    (userBalance - (lastValue * quantity)).toFixed(2)}
                                {" "}USD
                            </Typography>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{minWidth: '100px'}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setDialogOpen(false);
                            }}
                            >Cancel
                        </Button>                    
                        <Button
                            disabled={message ? true : false}
                            style={{minWidth: '100px'}}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onBuy(
                                    lastDate,
                                    lastValue,
                                    quantity
                                );
                                setDialogOpen(false);
                            }}
                            >Purchase
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
}
