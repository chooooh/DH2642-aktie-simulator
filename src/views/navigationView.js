import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CloseIcon from "@material-ui/icons/Close";
import Brightness6Icon from '@material-ui/icons/Brightness6';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ButtonGroup,
  Button,
  Switch,
  Typography,
  CircularProgress
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";


export const NavigationView = ({
    signOut,
    userEmail,
    searchingForUsersRequest,
    searchingForUsersSuccess,
    onSignInButtonClick,
    onPortfolio,
    onHomePage,
    onResults,
    onThemeChange,
    usersFound,
    onSearch,
    onUser
}) => {
    const [switchToggle, setSwitchToggle] = React.useState(true);
    const [, setWidth] = React.useState(window.innerWidth);
    const [searchValue, setSearchValue] = React.useState("");
    React.useEffect(() => {
        const callback = () => setWidth(window.innerWidth);
        window.addEventListener("resize", callback);
        return () => {
            window.removeEventListener("resize", callback);
        };
    }, []);

    if (window.innerWidth > 960)
        return (
        <div style={{ width: "100%" }}>
            <Box>
                <List component="nav">
                    {/* User navigation */}
                    {userEmail && (
                    <ListItem key={userEmail}>
                        <ListItemIcon>
                        <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={userEmail} />
                    </ListItem>
                    )}
                    {!userEmail && (
                    <ListItem button onClick={() => onSignInButtonClick()}>
                        <ListItemIcon>
                        <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign In / Create Account" />
                    </ListItem>
                    )}
                    {userEmail && (
                    <ListItem button onClick={() => signOut()}>
                        <ListItemIcon>
                        <CloseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out"></ListItemText>
                    </ListItem>
                    )}
                    <Divider />
                    <ListItem button onClick={() => onHomePage()}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Homepage" />
                    </ListItem>
                    {userEmail && (
                    <ListItem button onClick={() => onPortfolio()}>
                        <ListItemIcon>
                        <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Portfolio" />
                    </ListItem>
                    )}
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <Brightness6Icon />
                        </ListItemIcon>
                        <ListItemText primary="Darkmode" />
                        <Switch
                            checked={switchToggle}
                            onChange={() => {onThemeChange(); setSwitchToggle(!switchToggle);}}
                            name="checkedA"
                            color="primary"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Box mt={2} mb={2}>
                            <SearchBar 
                                placeholder = "Search users..." 
                                cancelOnEscape = {true}
                                onChange={(e) => setSearchValue(e)}
                                onRequestSearch={() => {
                                    onSearch(searchValue);
                                }}
                                style={{
                                    margin: "0 auto",
                                }}
                            />
                        </Box>
                    </ListItem>
                    {searchingForUsersRequest && (
                        <Box align="center">
                            <CircularProgress />
                        </Box>
                    )}
                    <List>
                    {JSON.stringify(usersFound) !== '[]' ? usersFound.map((user, index) => (
                        <ListItem button key = {index} onClick={() => onUser(user)}>
                            <ListItemText primary={user}/>
                        </ListItem>
                    )) : <Typography>No users found, search blank for all users</Typography>
                    }
                    </List>
                </List>
                <Divider />
            </Box>
        </div>
        );
  else if (window.innerWidth <= 960)
    return (
      <Box p={2} size="large" textAlign="center">
        {userEmail && (
            <Typography align="left">
                User: {" "} {userEmail}
            </Typography>)}
        <ButtonGroup
          fullWidth={true}
          size="small"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => onHomePage()}>Homepage</Button>
          {userEmail && <Button onClick={() => onPortfolio()}>Portfolio</Button>}
          {userEmail && <Button onClick={() => signOut()}>Sign Out</Button>}
          {!userEmail && (
            <Button onClick={() => onSignInButtonClick()}>Sign In / Create Account</Button>
          )}
        </ButtonGroup>
        <Box mt={2} mb={2}>
            <SearchBar
                placeholder = "Search users..." 
                cancelOnEscape = {true}
                onChange={(e) => setSearchValue(e)}
                onRequestSearch={() => {
                    onSearch(searchValue);
                }}
                style={{
                    margin: "0 auto",
                }}
            />
        </Box>
        <Box align="center">
            {searchingForUsersRequest && (
                <Box align="center">
                    <CircularProgress />
                </Box>
            )}
            <List>
            {JSON.stringify(usersFound) !== '[]' ? usersFound.map((user, index) => (
                    <ListItem button key = {index} onClick={() => onUser(user)}>
                        <ListItemText primary={user}/>
                    </ListItem>
                )) :  <Typography>No users found, search blank for all users</Typography>
            }
            </List>
        </Box>
        <Divider/>
      </Box>
    );
};