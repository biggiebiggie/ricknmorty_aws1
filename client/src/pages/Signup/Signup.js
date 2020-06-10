import React, { Component } from "react";

import styles from "./Signup.module.css";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  };
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onFormSubmit = async event => {
    event.preventDefault();
    const { username, email, password, repeatPassword } = this.state;

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        repeatPassword: repeatPassword
      })
    }

    await fetch('http://localhost:9090/api/user/register', options)
      .then(res =>
        res.json())
      .then(res => {
        console.log(res)
        if (res.status !== 1) return
        this.props.history.push("/login")
      }
      )
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign up</h1>
          <form className={styles.form} onSubmit={this.onFormSubmit}>
            <div>Username</div>
            <input
              type="text"
              name="username"
              onChange={this.handleInputChange}
            />
            <div>E-mail</div>
            <input
              type="email"
              name="email"
              onChange={this.handleInputChange}
            />
            <div>Password</div>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
            />
            <div>Repeat password</div>
            <input
              type="repeatPassword"
              name="repeatPassword"
              onChange={this.handleInputChange}
            />
            <div>
              <button className={styles.submitButton}>Signup</button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
