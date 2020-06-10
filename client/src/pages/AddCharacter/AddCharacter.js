import React, { Component } from "react";

import styles from "./AddCharacter.module.css";
import { Link } from "react-router-dom"

export default class AddCharacter extends Component {
    state = {
        name: "",
        species: "",
        status: "",
        image: ""
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.user);
    };

    onFormSubmit = async event => {
        event.preventDefault();
        const { name, species, status, image } = this.state;

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                species: species,
                status: status,
                image: image
            })
        }
        await fetch('http://localhost:9090/api/homemadecharacter/create', options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status !== 1) return
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
                    <h1 className={styles.title}>Add Character</h1>
                    <div className={styles.formContainer}>
                        <form className={styles.form} onSubmit={this.onFormSubmit}>
                            <p>Name</p>
                            <input type="text" name="name"
                                onChange={this.handleInputChange}
                            />

                            <p>Species</p>
                            <input type="text" name="species"
                                onChange={this.handleInputChange}
                            />
                            <p>Status</p>
                            <input type="text" name="status"
                                onChange={this.handleInputChange}
                            />
                            <p>Image url</p>
                            <input type="text" name="image" value="https://m.media-amazon.com/images/I/81B3AoJqb9L._SS500_.jpg"
                                onChange={this.handleInputChange}
                            />
                            <button className={styles.submitButton}>Create</button>
                        </form>
                    </div>
                    <div className={styles.signUpContainer}>
                        <Link className={styles.signUpLink} to="/profile">
                            Back to Profile
                         </Link>
                    </div>
                </div>
            </main >
        );
    }
}
