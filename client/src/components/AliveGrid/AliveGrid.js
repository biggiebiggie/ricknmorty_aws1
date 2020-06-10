import React, { useState, useEffect } from 'react'

// Components
import CharacterCard from '.././CharacterCard/CharacterCard.js'

// Styles
import styles from './AliveGrid.module.css'


function AliveGrid() {
    const [data, setData] = useState({ results: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            fetch("https://rickandmortyapi.com/api/character/?status=Alive")
                .then(res => res.json())
                .then(res =>
                    setData(res),
                    setIsLoading(false)
                )

        }
        fetchData();
    }, []);


    return (
        <section className={styles.aliveGrid}>
            <h1 className={styles.headline}>Alive:</h1>
            <div className={styles.characterContainer}>
                {isLoading
                    ? <div>Loading</div>
                    : data.results.map((character, key) => {
                        return (
                            <CharacterCard key={key} data={character} />
                        );
                    })}
            </div>
        </section>
    )
}

export default AliveGrid;

// export default class AliveGrid extends Component {

//     state = {
//         data: null,
//         isLoading: true
//     };

//     componentDidMount() {
//         this.fetchData();
//     }

//     fetchData = async () => {


//         this.setState({ data, isLoading: false });
//     }

//     render() {
//         const { data, isLoading } = this.state;
//         return (
//             <section className={styles.aliveGrid}>
//                 <h1 className={styles.headline}>Alive:</h1>
//                 <div className={styles.characterContainer}>
//                     {isLoading
//                         ? <div>Loading</div>
//                         : data.results.map((character, key) => {
//                             return (
//                                 <CharacterCard key={key} data={character} />
//                             );
//                         })}
//                 </div>
//             </section>
//         )
//     }
// }