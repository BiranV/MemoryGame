import { useRouter } from 'next/router';
import classes from './RecordsList.module.css';

export default function RecordsList(props) {

    const router = useRouter();

    const playAgain = () => {
        router.push("/");
    }

    return (
        <div className={classes.container}>
            <h2>SCOREBOARD | TOP TEN</h2>
            <div className={classes.header}>
                <p>Name</p>
                <p>Score</p>
            </div>
            <ul>
                {props.items.map((item, index) => (
                    <li key={index}>
                        <div>{item.name}</div>
                        <div>{item.score}</div>
                    </li>
                ))}
            </ul>
            <button className={classes.btn} onClick={playAgain}>Play Again</button>
        </div>
    )
}
