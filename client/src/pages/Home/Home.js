import React, { Component } from "react";

import styles from "./Home.module.css"
import AliveGrid from "../../components/AliveGrid/AliveGrid";
import DeadGrid from "../../components/DeadGrid/DeadGrid";

export default class Home extends Component {
  state = {};

  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.aliveGrid}>
          <AliveGrid />
        </div>
        <div className={styles.deadGrid}>
          <DeadGrid />
        </div>
      </main>
    );
  }
}
