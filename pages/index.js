import { Fragment } from "react";
import Head from "next/head";
import Game from "@/components/Game";

export default function HomePage(props) {

    return (
        <Fragment>
            <Head>
                <title>MemoryGame</title>
                <meta name="description" content="memory game, beat the game!" />
            </Head>
            <Game />
        </Fragment>
    )
}