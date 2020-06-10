import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

export default class Login extends Component {
  state = {
    email: "eli1@eli.dk",
    password: "123"
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.user);
  };

  onFormSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    await fetch('http://localhost:9090/api/user/login', options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status !== 1) return
        this.props.history.push("/")
        this.props.updateAuth();

      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={this.onFormSubmit}>
              <p>Email</p>
              <input type="text" name="email"
                onChange={this.handleInputChange}
              />

              <p>Password</p>
              <input type="password" name="password"
                onChange={this.handleInputChange}
              />
              <button className={styles.submitButton}>Login</button>
            </form>
          </div>
          <div className={styles.signUpContainer}>
            <div>
              <Link className={styles.signUpLink} to="/signup">
                Sign up?
            </Link>
            </div>
            <div>
              <Link className={styles.signUpLink} to="/reset-password">
                Request password reset
            </Link>
            </div>
          </div>
        </div>
      </main >
    );
  }
}
