import {
    Accessor,
    createContext,
    createEffect,
    createSignal,
    For,
    JSX,
    onMount,
    Setter,
    Show,
    useContext,
} from 'solid-js';
import { useParams, useRouteData } from 'solid-start';
import MatchItem from '~/components/MatchItem';
import { routeData } from '~/routes/[userid]';
import { card } from '~/utils/testset';
import { shuffle } from '~/utils/utils';

interface MatchItemObject {
    x: Accessor<number>;
    y: Accessor<number>;
    w: Accessor<number>;
    h: Accessor<number>;
}

interface MatchItemPair {
    term: MatchItemObject;
    definition: MatchItemObject;
}

type MatchContextType = [
    Accessor<MatchItemPair[]>,
    Setter<MatchItemPair[]>,
    { aabb: (match: MatchItemPair) => boolean }
];

const MatchContext = createContext<MatchContextType>();

function MatchProvider(props: { children: JSX.Element }) {
    const [items, setItems] = createSignal<MatchItemPair[]>([]),
        match: MatchContextType = [
            items,
            setItems,
            {
                aabb(match: MatchItemPair): boolean {
                    const term = match.term,
                        definition = match.definition;
                    if (
                        term.x() + term.w() > definition.x() &&
                        term.x() < definition.x() + definition.w() &&
                        term.y() + term.h() > definition.y() &&
                        term.y() < definition.y() + definition.h()
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                },
            },
        ];
    return (
        <MatchContext.Provider value={match}>
            {props.children}
        </MatchContext.Provider>
    );
}

export const useMatchContext = () => useContext(MatchContext)!;

export const [left, setLeft] = createSignal<number>(1000000);

export default function Match() {
    const [width, setWidth] = createSignal<number>(0);
    const [height, setHeight] = createSignal<number>(0);
    const [cards, setCards] = createSignal<card[]>([]);
    const [playing, setPlaying] = createSignal<boolean>(false);
    const [time, setTime] = createSignal<number>(0);
    const [bestTime, setBestTime] = createSignal<number>(0); // TODO: Put in DB

    const data = useRouteData<typeof routeData>();
    const params = useParams();

    // TODO: Fix "mutating the store directly"
    function makeCards(cards: card[]) {
        let tempcards = shuffle(cards);
        if (tempcards.length > 5) {
            tempcards = tempcards.slice(0, 5);
        }
        return tempcards;
    }

    async function startPlaying() {
        setPlaying(true);

        const start = Date.now();
        setTime(0);
        setInterval(() => {
            const delta = Date.now() - start;

            setTime(Math.floor(delta / 1000));
        }, 1000);
    }

    onMount(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);

        setCards(makeCards(data()!.sets[0].cards));
        // setCards(data()!.sets[0].cards);
    });

    createEffect(() => {
        if (left() === 0) {
            setPlaying(false);

            if (time() < bestTime() || bestTime() == 0) {
                setBestTime(time());
            }

            setTime(0);
            setCards(makeCards(data()!.sets[0].cards));
            setLeft(1000000);
        }
    });

    return (
        <>
            <h1>Match</h1>
            <a href={`/${params.userid}/${params.set}/`}>Back to Set 🏠</a>

            <p>{bestTime() > 0 ? 'Best time:' + bestTime() : ''}</p>

            <MatchProvider>
                {playing() ? time() : ''}
                <Show
                    when={playing()}
                    fallback={<button onclick={startPlaying}>Start</button>}
                >
                    <Show when={left() > 0} fallback={<></>}>
                        <For each={cards()} fallback={<div>Loading</div>}>
                            {(card, index) => (
                                <>
                                    <MatchItem
                                        text={card.term}
                                        x={Math.floor(Math.random() * width())}
                                        y={Math.floor(Math.random() * height())}
                                        index={index()}
                                        term={true}
                                    />
                                    <MatchItem
                                        text={card.definition}
                                        x={Math.floor(Math.random() * width())}
                                        y={Math.floor(Math.random() * height())}
                                        index={index()}
                                        term={false}
                                    />
                                </>
                            )}
                        </For>
                    </Show>
                </Show>
            </MatchProvider>
        </>
    );
}
