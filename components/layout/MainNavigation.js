import Link from "next/link"
import classes from './MainNavigation.module.css';

export default function MainNavigation() {

    return (
        <header className={classes.header}>
            <Link href='/' className={classes.logo}>MemoryGame</Link>
        </header >
    )
}
