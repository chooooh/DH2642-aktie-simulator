
export const Parser = {
    parseStock(data, type = "4. close") {
        const TIME_SERIES = ["Monthly Adjusted Time Series",
            "Weekly Adjusted Time Series", 
            "Time Series (Daily)",
        ];
        const time_series_tag = Object.keys(data)[1];
        const found_tag = TIME_SERIES.find((e) => e === time_series_tag);
        const time_series_data = data[found_tag];
        const labels = Object.keys(time_series_data).reverse();
        const values = Object.values(time_series_data).map((e) => e[type]).reverse();
        if(labels.length > 100) {
            labels.splice(0, labels.length-100);
            values.splice(0, values.length-100);
        }
        return {
            header: data["Meta Data"],
            labels,
            values,
        };
    },

    parseSearchResults(data) {
        let parsed = [];
        parsed = data["bestMatches"].map((instance) => [
            ...parsed,
            instance["1. symbol"],
            instance["2. name"],
            instance["4. region"],
        ]);
        return parsed;
    },

    parseCompanyInfo(data) {
        const companyData = {
            name: data["Name"],
            country: data["Country"],
            symbol: data["Symbol"],
            yearlyRevenue: data["RevenueTTM"],
            yearlyProfit: data["GrossProfitTTM"],
            industry: data["Industry"],
            currency: data["Currency"],
            fullTimeEmployees: data["FullTimeEmployees"],
            description: data["Description"],
        };
        return data && companyData;
    }
};