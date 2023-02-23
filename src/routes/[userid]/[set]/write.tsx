import { createEffect, createSignal, Show } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { routeData } from "~/routes/[userid]";
import type { card } from "~/utils/testset";

export default function Write() {
    const [intermission, setIntermission] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<number>(0);
    const [answered, setAnswered] = createSignal<boolean>(false);
    const [answer, setAnswer] = createSignal<string>("");
    const [correct, setCorrect] = createSignal<boolean>(false);
    const [right, setRight] = createSignal<number>(0);

    const params = useParams();
    const data = useRouteData<typeof routeData>();

    let cards: card[] | undefined = data()?.sets[0].cards;
    let wrongs: card[] | undefined = cards;

    function correctCheck() {
        if (answer().toLowerCase() === cards![current()].term.toLowerCase()) {
            setCorrect(true);
            setRight(right() + 1);
            wrongs?.splice(current(), 1);
        } else {
            setCorrect(false);
        }
    }

    function next() {
        if (current() + 1 < cards!.length) {
            setCurrent(current() + 1); 
        } else {
            setIntermission(true);
        }
        
        setAnswer("");
        setAnswered(false);
    }

    return (
        <>
            <h1>Write</h1>
            <a href={`/${params.userid}/${params.set}/`}>Back to Set 🏠</a>

            <Show when={cards} fallback={<p>Loading</p>}>
                <section>
                    <Show when={!intermission()} fallback={
                        <div>
                            <h1>{Math.round((right() / cards!.length) * 100)}% Done</h1>
                            <button onClick={() => {
                                setIntermission(false);

                                cards = wrongs;
                                setCurrent(0);

                                setAnswer("");
                                setAnswered(false);
                            }}>Keep Going</button>
                        </div>
                    }>
                        <div>
                            <h2>{current() + 1} / {cards!.length}</h2>
                        </div>

                        <p>{cards![current()].definition}</p>

                        <div>
                            <form onsubmit={(e) => {
                                e.preventDefault();
                                setAnswered(true);
                                correctCheck();
                            }}>
                                <label for="answer">Answer</label>
                                <input type="text" name="answer" id="answer" value={answer()} onChange={(e) => setAnswer(e.currentTarget.value)} />
                            </form>
                        </div>
                        <Show when={answered()} fallback={<></>}>
                            <div>
                                <h4>{correct() ? 'Correct!' : 'Incorrect!'}</h4>
                                <p>{cards![current()].term}</p>
                                <button onClick={next}>Next</button>
                            </div>
                        </Show>
                    </Show>
                </section>
            </Show>
        </>
    );
}