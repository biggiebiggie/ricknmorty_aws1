import React, { Component } from "react";

import styles from "./UpdateUser.module.css";
import { Link } from "react-router-dom"

export default class UpdateUser extends Component {
    state = {
        username: "",
        email: "",
        newPassword: "",
        repeatNewPassword: "",
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.user);
    };

    onFormSubmit = async event => {
        event.preventDefault();
        const { username, email, newPassword, repeatNewPassword } = this.state;

        const options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, email, newPassword, repeatNewPassword
            })
        }
        await fetch('http://localhost:9090/api/user/update-user', options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.props.history.push("/profile")

            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <main className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Update user</h1>
                    <div className={styles.formContainer}>
                        <form className={styles.form} onSubmit={this.onFormSubmit}>
                            <p>Username</p>
                            <input type="text" name="username"
                                onChange={this.handleInputChange}
                            />
                            <p>Email</p>
                            <input type="text" name="email"
                                onChange={this.handleInputChange}
                            />

                            <p>Password</p>
                            <input type="password" name="newPassword"
                                onChange={this.handleInputChange}
                            />
                            <p>Password</p>
                            <input type="password" name="repeatNewPassword"
                                onChange={this.handleInputChange}
                            />
                            <button className={styles.submitButton}>Login</button>
                        </form>
                    </div>
                    <div className={styles.signUpContainer}>
                        <Link className={styles.signUpLink} to="/profile">
                            Back to profile
            </Link>
                    </div>
                </div>
            </main >
        );
    }
}
