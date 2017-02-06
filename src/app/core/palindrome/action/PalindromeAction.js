import {AppConstants} from "../../../constants/AppConstants";
import  {AppDispatcher}  from "../../../dispatcher/AppDispatcher";
import {palindromeClient} from "../client/PalindromeClient";

export class PalindromeAction {
    /**
     *
     * @param {String} text
     */
    static verifyIfIsPalindrome(text) {

        AppDispatcher.dispatch({
            actionType: AppConstants.ACTION.PALINDROME.VERIFY_TEXT_REQUEST_PENDING,
            payload: {
                text
            }
        });

        let objectToVerify = {word:text};
        palindromeClient.verifyTextIsPalindrome(objectToVerify).then(() =>
            AppDispatcher.dispatch({
                actionType: AppConstants.ACTION.PALINDROME.VERIFY_TEXT_REQUEST_SUCCESS,
                payload:{
                    text
                }
            })
        ).catch(() => {
            AppDispatcher.dispatch({
                actionType: AppConstants.ACTION.PALINDROME.VERIFY_TEXT_REQUEST_ERROR,
                payload:{
                    text
                }
            });
        });
    }

    static requestCloseSnackBarAction() {
        AppDispatcher.dispatch({
            actionType: AppConstants.ACTION.PALINDROME.REQUEST_CLOSE_SNACK_BAR,
        });
    }
}