import { Show } from "solid-js";
import { useParams, useRouteData } from "solid-start"
import Flashcard from "~/components/Flashcard";
import { routeData } from "~/routes/[userid]";

export default function Flaschards() {
    const params = useParams();

    const data = useRouteData<typeof routeData>();

    return (
        <>
            <h1>Flashcards</h1>
            
            <a href={`/${params.userid}/${params.set}/`}>Back to Set 🏠</a>
            <Show when={data()} fallback={<h1>Loading...</h1>}>
                <Flashcard props={{ cards: data()!.sets[0].cards, preview: false }} />
            </Show>
        </>
    )
}