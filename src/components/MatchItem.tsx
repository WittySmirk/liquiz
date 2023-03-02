import { createEffect, createSignal, onMount, Show } from "solid-js";
import { left, setLeft, useMatchContext } from "~/routes/[userid]/[set]/match";

// TODO: Fix why matchcontext is undefined until refresh

export default function MatchItem(props: {text: string, x: number, y: number, index: number, term: boolean}) {
    const [x, setX] = createSignal<number>(props.x);
    const [y, setY] = createSignal<number>(props.y);
    const [w, setW] = createSignal<number>(0);
    const [h, setH] = createSignal<number>(0);
    const [matched, setMatched] = createSignal<boolean>(false);
    const [selected, setSelected] = createSignal<boolean>(false);
    let ref: HTMLSpanElement | undefined = undefined;

    const [items, setItems, {aabb}]  = useMatchContext();
    
    function drag(e: MouseEvent) {
        if(!selected()) return;
        setX(e.clientX);
        setY(e.clientY); 
    }

    function release() {
        setSelected(false);
        
        if(matched()) return;
        if (aabb(items()[props.index])) {
            console.log("match");
            setMatched(true); //Change to an animation or something
            setLeft(l => l - 1);
        }
    }

    onMount(() => {
        window.addEventListener("mouseup", release);
        window.addEventListener("mousemove", drag);
        setW(ref!.offsetWidth);
        setH(ref!.offsetHeight);
        
        {
            let tempItems = items();
            if (tempItems[props.index] === undefined) {
                tempItems.splice(props.index, 0, (() => {
                    if(props.term) {
                        return {term: {x, y, w, h}, definition: {x: () => 0, y: () => 0, w: () => 0, h: () => 0}}
                    } else {
                        return {term: {x: () => 0, y: () => 0, w: () => 0, h: () => 0}, definition: {x, y, w, h}} 
                    }
                })())
            } else {
                tempItems[props.index] = (() => {
                    if(props.term) {
                        return {term: {x, y, w, h}, definition: tempItems[props.index].definition}
                    } else {
                        return {term: tempItems[props.index].term, definition: {x, y, w, h}}
                    }
                })();
            }
            setItems(tempItems);
        }
        setLeft(items().length * 2);
    });
    
    return (
        <>
            <Show when={!matched()} fallback={<></>}>
                <span ref={ref} class="absolute select-none cursor-move" onMouseDown={() => setSelected(true)} style={{ left: x() + "px", top: y() + "px"}}>
                    {props.text}
                </span>
            </Show>
        </>
    )
}