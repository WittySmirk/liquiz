import { A, Head, Meta, Title } from 'solid-start'
import Counter from '~/components/Counter'

export default function Home() {
    return (
        <main>
            <Head>
                <Title>LiQuiz</Title>
                <Meta
                    name="description"
                    content="An open source flashcard studying app"
                />
            </Head>
            <h1>LiQuiz</h1>
            <h4>
                We don't like that Quizlet made stuff paid so we made it free
            </h4>
        </main>
    )
}
