import {AppBar} from "../common/AppBar";
import {AppConstants} from "../../constants/AppConstants";
import autoBind from "react-autobind";
import React from "react";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {PalindromeAction} from "../../core/palindrome/action/PalindromeAction";
import {palindromeStore} from "../../core/palindrome/store/PalindromeStore";

/*global console */
export class PalindromeMainView extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            snackBar: {
                open: false,
                message: "",
                autoHideDuration: 4000
            }
        };
    }

    componentDidMount() {
        palindromeStore.addChangeListener(this._onChangePalindromeStore);
    }

    componentWillUnmount() {
        palindromeStore.removeChangeListener(this._onChangePalindromeStore);
    }

    componentWillMount() {
    }

    _onChangePalindromeStore() {
        this.setState({
            snackBar: palindromeStore.getState().snackBar

        });
    }

    onTouchTapVerifyTextButton() {
        PalindromeAction.verifyIfIsPalindrome(this.text.getValue());
        console.log(this.text.getValue());
    }


    handleRequestClose() {
        PalindromeAction.requestCloseSnackBarAction();
    }

    render() {
        const appContentStyle = {
            margin: 0,
            paddingTop: "64px"
        };

        const styles = {
            root: {
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
            },
        };

        const fixedStyle = {
            position: "fixed",
            top: 0,
            float: "left",
            width: "100%",
            zIndex: 2
        };

        const style = {
            margin: 12,
        };

        return (
            <div>
                <AppBar
                    title={"Palindrome Test"}
                    style={fixedStyle}
                    children={<div style={appContentStyle}>
                        <div style={styles.root}>

                            <TextField
                                hintText="Full width"
                                fullWidth={true}
                                ref={(textInput) => this.text = textInput}
                                onChange={(e) => e.stopPropagation()}
                            />
                            <RaisedButton
                                label="Verify if is a palindrome"
                                primary={true}
                                onTouchTap={this.onTouchTapVerifyTextButton}
                                style={style}
                            />

                        </div>

                    </div>}
                />
                <Snackbar
                    open={this.state.snackBar.open}
                    message={this.state.snackBar.message}
                    autoHideDuration={this.state.snackBar.autoHideDuration}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }
}

PalindromeMainView.contextTypes = {
    router: React.PropTypes.object.isRequired
};
