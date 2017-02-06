import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import {Route, Router, Redirect, hashHistory} from "react-router";
import {PalindromeMainView} from "../components/palindrome/PalindromeMainView.jsx";

export class AppRouter extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>

                <Router history={hashHistory}>
                    <Route path="/palindrome" component={PalindromeMainView}/>

                    <Redirect
                        from={"*"}
                        to={"/palindrome"}
                    />
                </Router>
            </MuiThemeProvider>
        );
    }

}