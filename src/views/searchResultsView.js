import React from "react";
import {
    Container,
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Typography,
} from "@material-ui/core";

export const SearchResultsView = ({ bestMatches, stockChosen, searchingStocks }) => {
    if (searchingStocks)
        return <Box align="center"><CircularProgress/></Box>
    if (JSON.stringify(bestMatches) === '[]')
        return <Box align="center"><Typography>{"No stocks found!"}</Typography></Box>
    return <Container maxWidth="md">
        <Box>
            <Paper elevation={3}>
                <List>
                    {bestMatches.map((data) => (
                        <ListItem button key={data[0]}>
                            <ListItemText
                                onClick={() => {
                                    stockChosen(data[0]);
                                }}
                                primary={data[0]}
                                secondary={data[1] + ", " + data[2]}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    </Container>;
};
