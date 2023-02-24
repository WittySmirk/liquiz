import { Accessor, createContext, createSignal, JSX, Setter, useContext } from "solid-js";
import { useRouteData } from "solid-start";
import MatchItem from "~/components/MatchItem";
import { routeData } from "~/routes/[userid]";

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

type MatchContextType = [Accessor<MatchItemPair[]>, Setter<MatchItemPair[]>, { aabb: (match: MatchItemPair) => boolean }];

const MatchContext = createContext<MatchContextType>();

function MatchProvider(props: { children: JSX.Element}) {
    const [items, setItems] = createSignal<MatchItemPair[]>([]), 
        match: MatchContextType = [
            items,
            setItems,
            {
                aabb(match: MatchItemPair): boolean {
                    const term = match.term, definition = match.definition;
                    if (term.x() + term.w() > definition.x() && term.x() < definition.x() + definition.w() && term.y() + term.h() > definition.y() && term.y() < definition.y() + definition.h()) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]
    return (
        <MatchContext.Provider value={match}>
            {props.children}
        </MatchContext.Provider>
    )
}

export const useMatchContext = () => useContext(MatchContext)!;

export default function Match() {
    const data = useRouteData<typeof routeData>();

    return (
        <>
            <MatchProvider>
                <MatchItem text="ayo" x={10} y={10} index={0} term={true}></MatchItem>
                <MatchItem text="bruh" x={100} y={100} index={0} term={false}></MatchItem>
            </MatchProvider>
        </>
    )
}