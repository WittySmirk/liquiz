import {
    Switch,
    Match,
    Show,
    createSignal,
    createEffect,
    onMount,
    For,
} from 'solid-js';
import { useParams, useRouteData } from 'solid-start';
import { card } from '~/utils/testset';
import { routeData } from '~/routes/[userid]';
import Flashcard, { FlashcardType } from '~/components/Flashcard';
import { WriteComponent, WriteType } from '~/routes/[userid]/[set]/write';
import { Container } from '~/components/Shared';

enum LearnInputType {
    TEXT,
    MC,
    FLASHCARD,
}

interface Learning {
    index: number;
    level: number;
    correctInARow: number;
}

export const [next, setNext] = createSignal<boolean>(false);
const [levels, setLevels] = createSignal<Learning[]>([]);

export function learnAddCorrect(index: number) {
    if (levels()[index].correctInARow + 1 == 3) {
        levels()[index].level += 1;
        levels()[index].correctInARow = 0;
    } else {
        levels()[index].correctInARow += 1;
    }
}

export function learnWrong(index: number) {
    levels()[index].correctInARow = 0;
}

function LearnMCComponent(props: {
    real: card;
    others: card[] | null;
    index: number;
}) {
    const [othersWithAnswer, setOthersWithAnswer] = createSignal<card[]>([]);
    const [indexOfAnswer, setIndexOfAnswer] = createSignal<number>(0);

    onMount(() => {
        console.log(props.others);
        setIndexOfAnswer(Math.floor(Math.random() * 4));
        setOthersWithAnswer(props.others!);
        othersWithAnswer().splice(indexOfAnswer(), 0, props.real);
    });

    return (
        <>
            <Container center={false} onclick={undefined}>
                <p class="ml-1 mr-1 text-3xl mt-14">{props.real.definition}</p>
                <div class="mt-10 grid grid-rows-2 grid-cols-2 mr-5 ml-5 mb-5">
                    <For each={othersWithAnswer()}>
                        {(item, index) => (
                            <button
                                class="text-highlight-color-dark border-none outline outline-1 pt-2 pb-2 outline-highlight-color-dark bg-bg-color-dark text-xl pl-16 pr-16 pt-1 pb-1 rounded-md m-1"
                                onclick={() => {
                                    if (index() === indexOfAnswer()) {
                                        learnAddCorrect(props.index);
                                        setNext(true);
                                    } else {
                                        learnWrong(props.index);
                                        setNext(true);
                                    }
                                }}
                            >
                                {item.term}
                            </button>
                        )}
                    </For>
                </div>
            </Container>
        </>
    );
}

function LearnInput(props: {
    type: LearnInputType;
    index: number;
    cards: card[];
}) {
    function create_random_others(cards: card[]): card[] {
        let o: card[] = [];
        for (let i = 1; i < 4; i++) {
            o.push(cards[Math.floor(Math.random() * cards.length + 1)]);
        }
        return o;
    }

    const real = props.cards[props.index];
    let others = null;

    if (props.type === LearnInputType.MC) {
        others = create_random_others(props.cards);
    }

    return (
        <>
            <Switch fallback={<div>Not found</div>}>
                <Match when={props.type === LearnInputType.TEXT}>
                    <WriteComponent
                        cards={[real]}
                        type={WriteType.LEARN}
                        index={props.index}
                    />
                </Match>
                <Match when={props.type === LearnInputType.MC}>
                    <LearnMCComponent
                        real={real}
                        others={others}
                        index={props.index}
                    />
                </Match>
                <Match when={props.type === LearnInputType.FLASHCARD}>
                    <Flashcard
                        cards={[real]}
                        type={FlashcardType.LEARN}
                        index={props.index}
                    />
                </Match>
            </Switch>
        </>
    );
}

export default function Learn() {
    const data = useRouteData<typeof routeData>();
    const params = useParams();

    const cards: card[] = data()!.sets[0].cards;

    createEffect(() => {
        if (next()) {
            console.log('this happens');
            setNext(false);
        }
    });

    onMount(() => {
        for (let i = 0; i < cards.length; i++) {
            setLevels((l) => [...l, { index: i, level: 0, correctInARow: 0 }]);
        }
    });

    return (
        <>
            <h1>Learn</h1>
            <a href={`/${params.userid}/${params.set}/`}>Back to Set 🏠</a>
            <Show when={data()} fallback={<h1>Loading...</h1>}>
                {/*}<LearnInput
          type={LearnInputType.TEXT}
          index={0}
          cards={cards}
        />*/}

                <LearnInput type={LearnInputType.MC} index={0} cards={cards} />
                {/*<LearnInput
                    type={LearnInputType.FLASHCARD}
                    index={0}
                    cards={cards}
                />*/}
            </Show>
        </>
    );
}
