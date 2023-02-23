import { createSignal, Show } from "solid-js";
import { card } from "~/utils/testset";

export default function Flashcard({ props }: { props: { cards: card[], preview: boolean } }) {
    const [finished, setFinished] = createSignal<boolean>(false);
    const [back, setBack] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<number>(0);

    // Figure out window controls

    function flip() {
        setBack(!back());
    }

    let increment = () => { };
    let decrement = () => { };

    if (!props.preview) {
        increment = () => {
            setBack(false);
            if (current() + 1 < props.cards.length) {
                setCurrent(current() + 1);
            } else {
                setFinished(true);
            }
        }
        decrement = () => {
            setBack(false);
            if (current() - 1 >= 0) {
                setCurrent(current() - 1);
            }
        }
    } else {
        increment = () => {
            setBack(false);
            if (current() + 1 < props.cards.length) {
                setCurrent(current() + 1);
            } else {
                setCurrent(0);
            }
        }
        decrement = () => {
            setBack(false);
            if (current() - 1 >= 0) {
                setCurrent(current() - 1);
            } else {
                setCurrent(props.cards.length - 1);
            }
        }
    }

    return (
        <section
            onclick={flip}
            onkeypress={(e) => e.preventDefault}
            onkeydown={(e) => e.preventDefault}
            onkeyup={(e) => e.preventDefault}
        >
            <Show when={!finished()}
                fallback={<>
                    <h1>100% Finished!</h1>
                    <div>
                        <button onclick={() => {
                            setFinished(false);
                            setCurrent(0);
                            setBack(false);
                        }}>Reset Cards</button>
                    </div>
                </>}
            >
                <div>
                    <p>{!back() ? 'Definition' : 'Term'}</p>
                    <p>{current() + 1} / {props.cards.length}</p>
                </div>
                <div>
                    <p>{!back() ? props.cards[current()].definition : props.cards[current()].term}</p>
                </div>

                <div>
                    <button onclick={decrement}>{'<'}</button>
                    <button onclick={increment}>{'>'}</button>
                </div>
            </Show>
        </section>
    )
}