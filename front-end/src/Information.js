import React from 'react';
const config = require("./config.js");
const requests = require("./requests.js");

class Information extends React.Component {
    constructor(props) {
        super(props);
        this.getUserinfo = this.getUserinfo.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUserinfo = this.changeUserinfo.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const params = { token: this.props.token }
        requests.getRequest(config.infURI, params, this.getUserinfo);
    }

    async getUserinfo(res) {
        const data = (await res.json());
        document.getElementById("userinfoOutput").value = data.userinfo;
    } 

    changePassword(e) {
        e.preventDefault();
        const data = { token: this.props.token, password: document.getElementById("password").value }
        requests.patchRequest(config.entURI, data, () => {});
    } 

    changeUserinfo(e) {
        e.preventDefault();
        const data = { token: this.props.token, userinfo: document.getElementById("userinfoOutput").value }
        requests.putRequest(config.infURI, data, () => { });
    }

    deleteAccount(e) {
        const data = { token: this.props.token }
        requests.deleteRequest(config.entURI, data, (res) => { });
        requests.deleteRequest(config.infURI, data, (res) => { this.logout() });
    }

    logout(e) {
        this.props.setToken("0.0.0");
        this.props.toAuthentication();
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.logout}>⮜ Log in</button>
                <div className="App-box">
                    <form onSubmit={this.changePassword}>
                        <p>Password</p>
                        <input id="password" type="password" placeholder="Your new password" required />
                        <button>Save Password</button>
                    </form>

                    <form onSubmit={this.changeUserinfo}>
                        <p>Userinfo</p>
                        <textarea id="userinfoOutput" rows="4" cols="50" placeholder="Info about you" />
                        <button>Save User Information</button>
                    </form>

                    <button onClick={this.deleteAccount}>Delete Account</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Information;
