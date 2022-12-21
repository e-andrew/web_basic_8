import React from 'react';
const config = require("./config.js");
const requests = require("./requests.js");

function Authentication({ toRegistration, toInformation, setToken }) {
    function onClick(e) {
        toRegistration();
    }

    async function responseHandler(res) {
        setToken((await res.json()).token);
        toInformation();
    }

    function onSubmit(e) {
        e.preventDefault();

        const params = { login: document.getElementById("login").value, password: document.getElementById("password").value };
        requests.getRequest(config.entURI, params, responseHandler);
    }

    return (
        <React.Fragment>
            <button onClick={onClick}>Registration ⮞</button>
            <form className="App-box" onSubmit={onSubmit}>
                <p>E-mail</p>
                <input id="login" type="email" placeholder="Your email" required />
                <p>Password</p>
                <input id="password" type="password" placeholder="Your password" required />
                <button>Log in</button>
            </form>
        </React.Fragment>
    );
}

export default Authentication;


