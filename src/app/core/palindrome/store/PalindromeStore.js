import autoBind from "react-autobind";
import {AppConstants} from "../../../constants/AppConstants";
import {AppDispatcher} from "../../../dispatcher/AppDispatcher";
import {EventEmitter} from "events";
import Immutable from "immutable";

const CHANGE_EVENT = "change";

let appState = {
    snackBar: {
        open: false,
        message: "",
        autoHideDuration: 4000
    }
};

class PalindromeStore extends EventEmitter {

    constructor() {
        super();
        autoBind(this);
    }

    _emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getState() {
        return Immutable.Map(appState).toObject();
    }

}


AppDispatcher.register((action) => {

    switch (action.actionType) {

        case AppConstants.ACTION.PALINDROME.VERIFY_TEXT_REQUEST_SUCCESS:

            appState.snackBar = {
                open: true,
                message: `${action.payload.text} is a palindrome !!!`,
                autoHideDuration: 4000
            };
            palindromeStore._emitChange();
            break;

        case AppConstants.ACTION.PALINDROME.VERIFY_TEXT_REQUEST_ERROR:

            appState.snackBar = {
                open: true,
                message: `${action.payload.text} is not a palindrome !!!`,
                autoHideDuration: 4000
            };
            palindromeStore._emitChange();
            break;


        case AppConstants.ACTION.PALINDROME.REQUEST_CLOSE_SNACK_BAR:
            appState.snackBar = {
                open: false,
                message: "",
                autoHideDuration: 4000
            };
            palindromeStore._emitChange();
            break;
    }
    return true;
});


export let palindromeStore = new PalindromeStore();
