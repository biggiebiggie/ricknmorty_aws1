import React, { Component } from "react";

import styles from "./CharacterCard.module.css";

export default class CharacterCard extends Component {
  render() {
    const {
      data: {
        name,
        image,
        species,
        status
      }
    } = this.props

    return (
      <div className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.imageContainer} style={{
              backgroundImage: `url("${image}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>
            </div>

          </div>
          <div className={styles.container}>
            <div className={styles.characterInfo}>
              <p>{name}</p>
            </div>
            <div className={styles.characterInfo}>
              <p>{species}</p>
            </div>
            <div className={styles.characterInfo}>
              <p>{status}</p>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
