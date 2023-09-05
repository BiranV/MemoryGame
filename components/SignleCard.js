import classes from './SingleCard.module.css';

export default function Grid(props) {


    const handleClick = () => {
        if (!props.disabled) {
            props.handleChoice(props.card)
        }
    }

    return (
        <div className={classes.card} key={props.card.id}>
            <img className={props.flipped ? classes.frontflipped : classes.front} src={props.card.src} alt="card front" />
            <img className={props.flipped ? classes.coverflipped : classes.cover} src="images/cover.png" alt="card back" onClick={handleClick} />
        </div>
    )
}
