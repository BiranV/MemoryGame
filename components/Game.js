import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SingleCard from "./SignleCard"
import classes from './Game.module.css';

export default function Game() {

    const router = useRouter();

    const [name, setName] = useState("")
    const [cards, setCards] = useState([])
    const [mistakes, setMistakes] = useState(0)
    const [choiceOne, setchoiceOne] = useState(null)
    const [choiceTwo, setchoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [scoreboard, setScoreBoard] = useState()

    const cardImages = [
        { "src": "/images/1.png", matched: false },
        { "src": "/images/2.png", matched: false },
        { "src": "/images/3.png", matched: false },
        { "src": "/images/4.png", matched: false },
        { "src": "/images/5.png", matched: false },
        { "src": "/images/6.png", matched: false },
        { "src": "/images/7.png", matched: false },
        { "src": "/images/8.png", matched: false },
    ]

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards)
        setMistakes(0)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prev => {
                    return prev.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        }
                        else {
                            return card;
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
                setMistakes(prev => prev + 1)
            };
        }
        checkMode()
    }, [choiceOne, choiceTwo])

    const handleChoice = (card) => {
        choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
    }

    const checkMode = () => {
        const res = cards.filter(card => card.matched === true);
        if (res.length === 16) {
            checkRecord(mistakes)
        } else return;
    }

    const resetTurn = () => {
        setchoiceOne(null)
        setchoiceTwo(null)
        setDisabled(false)
    }

    const exitGame = () => {
        setchoiceOne(null)
        setchoiceTwo(null)
        setDisabled(false)
        setName("")
        setCards([])
    }

    const checkRecord = async (mistakes) => {
        const data = {
            name: name,
            score: 100 - (mistakes * 3)
        }
        await fetch('/api/controllers', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        router.push("/scoreboard");
    }

    return (
        <Fragment>
            <div className={classes.container}>
                {cards.length === 0 &&
                    <div className={classes.action}>
                        <input
                            className={classes.nameinput}
                            name="name"
                            type="text"
                            maxLength="15"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <button className={classes.btn} onClick={shuffleCards} disabled={!name} >Start</button>
                    </div>
                }
                {cards.length > 0 &&
                    <>
                        <div className={classes.grid}>
                            {cards.map(card => (
                                <SingleCard
                                    key={card.id}
                                    card={card}
                                    handleChoice={handleChoice}
                                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                                    disabled={disabled}
                                />
                            ))}
                        </div>
                        <div className={classes.exit}>
                            <button className={classes.btn} onClick={exitGame} >Exit Game</button>
                        </div>
                    </>
                }
            </div >
        </Fragment>
    )
}
