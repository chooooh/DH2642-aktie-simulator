import React from "react";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    Container,
    Typography,
    CssBaseline,
    Box,
    Avatar,
    FormControl,
    Collapse,
    IconButton
} from "@material-ui/core"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://www.youtube.com/watch?v=oHg5SJYRHA0"
            >
                Stock-simulator
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const AccountView = ({ signUp, signIn, signUpError, signInError, signUpSuccess, signInRequest }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [alertOpen, setAlertOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in or create Account
                </Typography>
                <FormControl className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        maring="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onInput={(e) => setEmail(e.target.value)}
                        />
                    <Box mt={2}>
                        <TextField
                            variant="outlined"
                            maring="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onInput={(e) => setPassword(e.target.value)}
                            />
                    </Box>
                    <Collapse in={alertOpen}>
                        {(signInError && 
                        <Alert severity="error" action = {
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => 
                                {setAlertOpen(false);
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }> {signInError}
                        </Alert>) || 
                        (signUpError && 
                        <Alert severity="error" action = {
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlertOpen(false);
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }> {signUpError}
                        </Alert>) ||
                        (signUpSuccess && !signInRequest &&
                        <Alert severity="success" action = {
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlertOpen(false);
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }> Account created! 
                        </Alert>)}
                        
                    </Collapse>
                
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { signIn(email.toLowerCase(), password); setAlertOpen(true);}}
                    >
                        Sign in
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {signUp(email.toLowerCase(), password); setAlertOpen(true);}}
                    >
                        Create Account
                    </Button>
                    <br />
                </FormControl>
            </div>
            <Box mt={2}>
                <Copyright />
            </Box>
        </Container>
    );
};
