import { useParams, useRouteData } from 'solid-start'
import { routeData } from '~/routes/[userid]'
import Flashcard, { FlashcardType } from '~/components/Flashcard'
import { Show } from 'solid-js'

export default function Set() {
    const params = useParams()

    const data = useRouteData<typeof routeData>()

    return (
        <>
            <h1>{data()?.sets[0].title}</h1>

            <section class="pb-6">
                <a href={`/${params.userid}/${params.set}/flashcards`}>
                    Flashcards 📇
                </a>
                <a href={`/${params.userid}/${params.set}/write`}>Write ✏️</a>
                <a href={`/${params.userid}/${params.set}/learn`}>Learn 🧠</a>
                <a href={`/${params.userid}/${params.set}/match`}>Match 🔍</a>
                <a href={`/${params.userid}/${params.set}/gravity`}>
                    Gravity 🪨
                </a>
            </section>
            <section>
                <Show when={data()} fallback={<h1>Loading...</h1>}>
                    <Flashcard
                        cards={data()!.sets[0].cards}
                        type={FlashcardType.PREVIEW}
                    />
                </Show>
            </section>
        </>
    )
}
