import React, { Component } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
  };

  logout = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await fetch("http://localhost:9090/api/user/logout", options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.props.updateAuth();
        this.props.history.push("/login");
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.title}>
            <Link to="/">RickAndMorty</Link>
          </div>
        </div>
        {
          !this.props.auth.loggedIn ? (
            <div className={styles.container}>
              <div className={styles.menu}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          ) : (
              <div className={styles.container}>
                <div className={styles.menu}>
                  <Link to="/profile">{this.props.auth.user.username}</Link>
                  <button onClick={this.logout}>Logout</button>
                </div>
              </div>
            )}
      </section>
    );
  }
}
