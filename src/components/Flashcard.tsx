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
            class="bg-undertone-color-dark rounded-2xl text-center mt-1 flex flex-col justify-between"
            style={{ flex: "1 2 25rem", width: "clamp(370px, 50%, 50rem)"}}
        >
            <Show when={!finished()}
                fallback={<>
                    <h1>100% Finished!</h1>
                    <div class="pt-5 pb-5">
                        <button onclick={() => {
                            setFinished(false);
                            setCurrent(0);
                            setBack(false);
                            
                        }}
                            class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1">Reset Cards</button>
                    </div>
                </>}
            >
                <div class="pt-5">
                    <p class="text-highlight-color-dark">{!back() ? 'Definition' : 'Term'}</p>
                    <p>{current() + 1} / {props.cards.length}</p>
                </div>
                <div>
                    <p class="text-3xl font-semibold">{!back() ? props.cards[current()].definition : props.cards[current()].term}</p>
                </div>

                <div class="pt-5 pb-5">
                    <button onclick={decrement} class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1">{'<'}</button>
                    <button onclick={increment} class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1">{'>'}</button>
                </div>
            </Show>
        </section>
    )
}