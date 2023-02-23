import { useParams, useRouteData } from "solid-start";
import { routeData } from "~/routes/[userid]";
import  Flashcard from "~/components/Flashcard";
import { Show } from "solid-js";

export default function Set() {
    const params = useParams();

    const data = useRouteData<typeof routeData>();

    return (
        <div>
            <Show when={data()} fallback={<h1>Loading...</h1>}>
                <h1>{data()?.sets[0].title}</h1>
                <Flashcard props={{ cards: data()!.sets[0].cards, preview: true }} />
            </Show>
            {params.userid} {params.set}
        </div>
    )
}