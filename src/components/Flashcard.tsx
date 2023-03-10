import { createSignal, Show } from 'solid-js';
import { card } from '~/utils/testset';
import { setNext, learnAddCorrect } from '~/routes/[userid]/[set]/learn';
import { Container } from '~/components/Shared';

export enum FlashcardType {
    PAGE,
    PREVIEW,
    LEARN,
}

export default function Flashcard(props: {
    cards: card[];
    type: FlashcardType;
    index: number | undefined;
}) {
    const [finished, setFinished] = createSignal<boolean>(false);
    const [back, setBack] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<number>(0);

    // Figure out window controls

    function flip() {
        setBack(!back());
    }

    let increment = () => {};
    let decrement = () => {};

    if (props.type == FlashcardType.PAGE) {
        increment = () => {
            setBack(false);
            if (current() + 1 < props.cards.length) {
                setCurrent(current() + 1);
            } else {
                setFinished(true);
            }
        };
        decrement = () => {
            setBack(false);
            if (current() - 1 >= 0) {
                setCurrent(current() - 1);
            }
        };
    } else if (props.type == FlashcardType.PREVIEW) {
        increment = () => {
            setBack(false);
            if (current() + 1 < props.cards.length) {
                setCurrent(current() + 1);
            } else {
                setCurrent(0);
            }
        };
        decrement = () => {
            setBack(false);
            if (current() - 1 >= 0) {
                setCurrent(current() - 1);
            } else {
                setCurrent(props.cards.length - 1);
            }
        };
    }

    return (
        <Container center={props.type == FlashcardType.LEARN} onclick={flip}>
            <Show
                when={!finished()}
                fallback={
                    <>
                        <h1>100% Finished!</h1>
                        <div class="pt-5 pb-5">
                            <button
                                onclick={() => {
                                    setFinished(false);
                                    setCurrent(0);
                                    setBack(false);
                                }}
                                class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1"
                            >
                                Reset Cards
                            </button>
                        </div>
                    </>
                }
            >
                <Show when={props.type != FlashcardType.LEARN}>
                    <div class="pt-5">
                        <p class="text-highlight-color-dark">
                            {!back() ? 'Definition' : 'Term'}
                        </p>
                        <p>
                            {current() + 1} / {props.cards.length}
                        </p>
                    </div>
                </Show>

                <div>
                    <p class="text-3xl font-semibold">
                        {!back()
                            ? props.cards[current()].definition
                            : props.cards[current()].term}
                    </p>
                </div>
                <Show when={props.type == FlashcardType.LEARN && back()}>
                    <div class="pt-5 pb-5">
                        <button
                            onclick={() => {
                                if (props.index) {
                                    learnAddCorrect(props.index);
                                    setNext(true);
                                }
                            }}
                            class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1"
                        >
                            Next
                        </button>
                    </div>
                </Show>

                <Show when={props.type != FlashcardType.LEARN}>
                    <div class="pt-5 pb-5">
                        <button
                            onclick={decrement}
                            class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1"
                        >
                            {'<'}
                        </button>
                        <button
                            onclick={increment}
                            class="text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark text-3xl pl-16 pr-16 pt-1 pb-1 rounded-md ml-1 mr-1"
                        >
                            {'>'}
                        </button>
                    </div>
                </Show>
            </Show>
        </Container>
    );
}
