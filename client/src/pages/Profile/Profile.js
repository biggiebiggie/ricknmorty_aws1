import React, { Component } from "react";
import CharacterCard from '../../components/CharacterCard/CharacterCard.js'
import { Link } from "react-router-dom";

import styles from "./Profile.module.css";

export default class Profile extends Component {
  state = {
    data: null,
    isLoading: true,
    user: null,
    userLoading: true
  };

  componentDidMount() {
    !this.props.auth.loggedIn
      ?
      this.props.history.push("/login")
      : this.getInfo()
  }

  getInfo = () => {
    this.getUserInfo();
    this.getUserCharacters();
  }

  getUserInfo = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    await fetch('http://localhost:9090/api/user/profile', options)
      .then(res => res.json())
      .then(res => {
        // if (res.status !== 1) return;
        this.setState({ user: res, userLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getUserCharacters = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    await fetch('http://localhost:9090/api/homemadecharacter/', options)
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res, isLoading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteCharacter = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    await fetch('http://localhost:9090/api/homemadecharacter/delete/' + id, options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.getUserCharacters();
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteUser = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    await fetch('http://localhost:9090/api/user/delete/', options)
      .then(res => res.json())
      .then(res => {
        this.props.updateAuth();
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { isLoading, data, user } = this.state;
    return (
      <main className={styles.mainContainer}>
        <h1 className={styles.headline}>Profile</h1>
        {isLoading
          ?
          <div>Loading</div>
          :
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <Link to={'/update-user'} className={styles.updateBtn}>Update</Link>
            <button className={styles.deleteBtn} onClick={this.deleteUser}>Delete</button>
          </div>
        }
        <div className={styles.titleWrapper}>
          <h3>My Characters: </h3>
          <Link to="/add-character">Add Character</Link>
        </div>
        <div className={styles.characterContainer}>
          {isLoading
            ? <div>Loading</div>
            : data.results.map((character, key) => {
              return (
                <div key={key}>
                  <CharacterCard key={key} data={character} />
                  <div className={styles.buttonContainer}>
                    <Link to={`/update-character?id=${character.id}`} className={styles.updateBtn}>Update</Link>
                    <button className={styles.deleteBtn} onClick={() => this.deleteCharacter(character.id)}>Delete</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </main>
    );
  }
}
