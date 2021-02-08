import React from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Container,
    Paper,
    Box,
    Table,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    CircularProgress
} from "@material-ui/core";

const totalMoneySpent = (boughtStocks) => {
    if(!boughtStocks) return;
    let totalValue = 0;
    boughtStocks.forEach(stock => {
        totalValue += stock[1] * stock[2];
    })
    return totalValue;
}

const totalChange = (boughtStocks, cStocks) => {
    if(!cStocks || !boughtStocks) return;
  
    let currentStockPrices = 0;
   
    boughtStocks.forEach((stock) => {
        currentStockPrices += stock[1]*stock[2]*calculate(stock[1], cStocks[mapIdToIndex(stock[4], cStocks)]);
    })

    return currentStockPrices;
}

const calculateStockValue = (stock) => { 
    const values = stock[0]["values"];
    return values[values.length - 1];
}

const calculateSellValue = (stock, quantity) => { 
    const values = stock[0]["values"];
    return values[values.length - 1] * quantity;
}

const calculate = (pricePaid, stock) => {
    const values = stock[0]["values"];
    const currentPrice = values[values.length - 1];
    return ((currentPrice - pricePaid) / pricePaid);
}

const mapIdToIndex = (id, cStocks) => {
    return cStocks.findIndex((stock) => stock[1] === id);
}

export const PortfolioView = ({ 
    boughtStocks, 
    currentStateOfBoughtStocks, 
    viewStock, 
    fetchCurrentStateOfBoughtStocks, 
    onSell, 
    balance,
    currentUser,
    viewedUser,
    fetchUserStocksLock
}) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedStock, setSelectedStock] = React.useState(null);

    // alternative solution with store
    // if (!fetchUserStocksLock)
    //     fetchCurrentStateOfBoughtStocks();
    React.useEffect(() => {
        fetchCurrentStateOfBoughtStocks();
    });
    
    if (boughtStocks.length !== currentStateOfBoughtStocks.length) {
        return (
            <Box align="center">
                <CircularProgress />
            </Box>
        )    
    }
    
    const cStocks = currentStateOfBoughtStocks;
    return (
    <Container maxWidth="lg">

        <Box>
            <Grid   
            container
            direction="row"
            justify="center"
            alignItems="stretch">

            <Grid 
            item xs={12}
            >
                <Box
                marginBottom={2}
                >
                    <Paper elevation={3}>
                    <br/>
                        <Typography align="center" variant="subtitle1">
                        {currentUser === viewedUser ? "This is your portfolio. Use the sell button to sell all stocks contained in one row. Press on the company name to see more details and buy stocks." : `Viewing ${viewedUser}'s portfolio`}
                        </Typography>
                    <br/>
                    </Paper>
                </Box>
            </Grid>

            <Grid 
            item xs={12}  
            >
                <Box
                marginBottom={2}
                >
                    <Paper elevation={3}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><Typography variant="h5">Holdings</Typography></TableCell>
                                            <TableCell align="left"></TableCell>
                                            <TableCell align="left"></TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left"><Typography variant="subtitle1">Account balance</Typography></TableCell>
                                        <TableCell align="left">
                                            <Typography variant="subtitle1" style={{color: balance < 0 ? '#f44336' : '#00e676'}}>
                                                {balance ? balance : "Woops something went wrong"}{" "}USD
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><Typography variant="subtitle1">Total profit</Typography></TableCell>
                                        <TableCell align="left">
                                            <Typography variant="subtitle1" style={{color: totalChange(boughtStocks, cStocks).toFixed(2) < 0 ? '#f44336' : '#00e676'}}>
                                                {totalChange(boughtStocks, cStocks).toFixed(2)} USD
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow> 
                                    <TableRow>
                                        <TableCell align="left"><Typography variant="subtitle1">Total portfolio value</Typography></TableCell>
                                        <TableCell align="left">
                                            <Typography variant="subtitle1" style={{color: (totalChange(boughtStocks, cStocks) + balance + totalMoneySpent(boughtStocks)).toFixed(2) < 0 ? '#f44336' : '#00e676'}}>
                                                {(totalChange(boughtStocks, cStocks) + parseInt(balance) + totalMoneySpent(boughtStocks)).toFixed(2)} USD
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
        </Box>
        <Grid item xs={12}>
            <Paper elevation={3}>
                <Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Purchase Price</TableCell>
                                    <TableCell align="left">Quantity</TableCell>
                                    <TableCell align="left">Total Value</TableCell>
                                    <TableCell align="left">Company</TableCell>
                                    {viewedUser === currentUser && <TableCell align="left">Sell</TableCell>}
                                    <TableCell align="left">+/-%</TableCell>
                                    <TableCell align="left">Change</TableCell>
                                </TableRow>
                            </TableHead>
                            {boughtStocks.length !== 0 && <TableBody>
                                {boughtStocks &&
                                    boughtStocks.map((stock, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">
                                                {stock[0]}
                                            </TableCell>
                                            <TableCell align="left">
                                                {stock[1]}{" USD"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {stock[2]}
                                            </TableCell>
                                            <TableCell align="left">
                                                {((stock[1]*stock[2])*(1+calculate(stock[1], cStocks[mapIdToIndex(stock[4], cStocks)]))).toFixed(2)}{" "}USD
                                            </TableCell>
                                            <TableCell hover = "true" onClick = {() => viewStock(stock[3])} align="left">
                                                <Button
                                                variant="outlined"
                                                style={{minWidth: '100px',
                                                color: '#90caf9'
                                                }}
                                                >
                                                {stock[3]}</Button>
                                            </TableCell>
                                            {viewedUser === currentUser && <TableCell>
                                                <Box>
                                                    <Button
                                                        style={{minWidth: '100px'}}
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setDialogOpen(true); 
                                                            setSelectedStock(stock);
                                                        }}
                                                        >SELL
                                                    </Button>
                                                </Box>
                                            </TableCell>}
                                            <TableCell> 
                                                <Typography style={{color: (calculate(stock[1], cStocks[mapIdToIndex(stock[4], cStocks)]) < 0 ? '#f44336' : '#00e676')}}>
                                                    {(calculate(stock[1], cStocks[mapIdToIndex(stock[4], cStocks)]) * 100).toFixed(2)}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{color: (calculate(stock[1], cStocks[mapIdToIndex(stock[4], cStocks)]) < 0 ? '#f44336' : '#00e676')}}>{
                                                    ((stock[1]*stock[2])*(calculate(stock[1], cStocks[mapIdToIndex(stock[4], cStocks)]))).toFixed(2)
                                                    }{" "}
                                                    USD</Typography>
                                            </TableCell>
                                        </TableRow>))}
                            </TableBody>}   
                        </Table>
                    </TableContainer>
                        {selectedStock && 
                            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                                <DialogTitle>Sell Shares</DialogTitle>
                                <DialogContent>
                                    <Typography>
                                        {selectedStock[3]} <br/><br/>
                                        Do you wish to sell all {selectedStock[2]} shares?<br/>
                                        Each stock is currently worth {" "} 
                                            {calculateStockValue(cStocks[mapIdToIndex(selectedStock[4], cStocks)])} {" "}USD<br/><br/>
                                        If you sell, {" "}
                                            {calculateSellValue(cStocks[mapIdToIndex(selectedStock[4], cStocks)], selectedStock[2])}
                                        {" "} USD will be added to you account <br/>
                                        Your new total balance will be: {" "}
                                        {balance? balance + calculateSellValue(cStocks[mapIdToIndex(selectedStock[4], cStocks)], selectedStock[2]) : "woops, could not fetch balance."} {" "}USD
                                    </Typography>
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
                                        style={{minWidth: '100px'}}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedStock(null);
                                            onSell(
                                                selectedStock[4], //id
                                                selectedStock[2], //quantity        price below VVVV
                                                calculateSellValue(cStocks[mapIdToIndex(selectedStock[4], cStocks)], 1)
                                            );
                                            setDialogOpen(false);
                                        }}
                                        >
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        }
                </Box>
            </Paper>
        </Grid>
    </Container>
    );
};