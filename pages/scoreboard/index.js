import { Fragment } from 'react'
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import RecordsList from '@/components/RecordsList.js'

export default function Scoreboard(props) {

    return (
        <Fragment>
            <Head>
                <title>Scoreoard | MemoryGame</title>
                <meta name="description" content="top ten of the game" />
            </Head>
            <RecordsList items={props.items} />
        </Fragment>
    )
}

export async function getServerSideProps() {
    const client = await MongoClient.connect(process.env.MONGO_URI)
    const db = client.db();
    const collection = db.collection('game');
    const items = await collection.find().toArray();

    const sorted = items.sort(function (a, b) {
        return b['score'] - a['score'];
    });

    const res = sorted.slice(0, 10);
    client.close();

    return {
        props: {
            items: res.map(item => ({
                id: item._id.toString(),
                name: item.name,
                score: item.score
            }))
        },
    }
}
