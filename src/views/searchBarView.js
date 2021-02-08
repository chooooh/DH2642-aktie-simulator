import React from "react";
import SearchBar from "material-ui-search-bar";
import { Box } from "@material-ui/core";

export const SearchBarView = ({
    search,
    bestMatches,
    stockChosen,
    searchingStocks,
    redirectToResults
}) => {
    const [searchValue, setSearchValue] = React.useState("");

    return (
        <Box mt={2} mb={2}>
            <SearchBar 
                placeholder = "Search stocks..." 
                cancelOnEscape = {true}
                onChange={(e) => setSearchValue(e)}
                onRequestSearch={() => {
                    search(searchValue);
                    redirectToResults();
                }}
                style={{
                    margin: "0 auto",
                    maxWidth: 400,
                }}
            />
        </Box>
    );
};
