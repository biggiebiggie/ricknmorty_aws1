import React, { Component } from "react";
import styles from "./ResetPassword.module.css";

export default class ResetPassword extends Component {
    state = {
        email: "",
        inputToken: "",
        newPassword: "",
        repeatNewPassword: "",
        requestedPassword: false
    };

    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    onFirstFormSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        }
        fetch('http://localhost:9090/api/user/reset-password', options)
            .then(res => res.json())
            .then(res => {
                console.log("here is the response: ", res);
                this.setState({ requestedPassword: true });
            })
            .catch(err => {
                console.error("here is the error: ", err);
            });

        // this.props.history.push("/");
    };

    onSecondFormSubmit = async (e) => {
        e.preventDefault();
        const { inputToken, newPassword, repeatNewPassword } = this.state;
        await fetch("http://localhost:9090/api/user/reset-password/confirm", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputToken,
                newPassword,
                repeatNewPassword
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log("here is the response: ", res);
                this.props.history.push("/login")
            })
            .catch(err => {
                console.error("here is the error: ", err);
            });

        // this.props.history.push("/");
    };

    render() {
        const { requestedPassword } = this.state;
        return (
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Reset Password</h1>
                    {requestedPassword === false
                        ? <form className={styles.form}>
                            <input
                                id="email"
                                placeholder="Email"
                                onChange={this.handleInputChange}
                            />
                            <button className={styles.submitButton} onClick={this.onFirstFormSubmit}>Submit</button>
                        </form>
                        : <form className={styles.form}>
                            <input
                                id="inputToken"
                                placeholder="Token"
                                onChange={this.handleInputChange}
                            />
                            <input
                                id="newPassword"
                                placeholder="New password"
                                onChange={this.handleInputChange}
                            />
                            <input
                                id="repeatNewPassword"
                                placeholder="Repeat new password"
                                onChange={this.handleInputChange}
                            />
                            <button className={styles.submitButton} onClick={this.onSecondFormSubmit}>Submit</button>
                        </form>}
                </div>
            </div>
        );
    }
}
