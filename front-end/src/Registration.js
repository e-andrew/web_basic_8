import React from 'react';
const config = require("./config.js");
const requests = require("./requests.js");

function Registration({ toAuthentication }) {
    function onClick(e) {
        toAuthentication();
    }

    function onSubmit(e) {
        e.preventDefault();

        const data = {
            login: document.getElementById("login").value,
            password: document.getElementById("password").value,
            password_again: document.getElementById("password_again").value
        }

        requests.postRequest(config.entURI, data, (res) => toAuthentication());
    }

    return (
        <React.Fragment>
            <button onClick={onClick}>⮜ Log in</button>
            <form className="App-box" onSubmit={onSubmit}>
                <p>E-mail</p>
                <input id="login" type="email" placeholder="Your email" required />
                <p>Password</p>
                <input id="password" type="password" placeholder="Your password" required />
                <p>Password Again</p>
                <input id="password_again" type="password" placeholder="Your password again" required />
                <button>Create New Account</button>
            </form>
        </React.Fragment>
    );
}

export default Registration;
