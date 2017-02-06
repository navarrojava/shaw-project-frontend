import autoBind from "react-autobind";
import fetch from "isomorphic-fetch";

const BASE_URL = "@@urlEndpointDefault/palindrome";

class PalindromeClient {

    constructor() {
        autoBind(this);
    }

    _getEntityUrl() {
        return BASE_URL;
    }

    _getHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "ApiKey": "@@ApiKey"
        };
    }

    /**
     *
     * @param {Object} text
     * @returns {Promise}
     */
    verifyTextIsPalindrome(text) {
        return new Promise((resolve, reject) => {
            fetch(`${this._getEntityUrl()}/verify`, {
                method: "POST",
                headers: this._getHeaders(),
                body: JSON.stringify(text)
            }).then((response) => {
                if (response.status !== 200) {
                    reject();
                } else {
                    resolve();
                }
            })
                .catch((error) => {
                    reject(error.message);
                });
        });
    }
}

export let palindromeClient = new PalindromeClient();
