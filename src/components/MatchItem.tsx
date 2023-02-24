import { createSignal, onMount } from "solid-js";
import { useMatchContext } from "~/routes/[userid]/[set]/match";

// TODO: Fix why matchcontext is undefined until refresh

export default function MatchItem(props: {text: string, x: number, y: number, index: number, term: boolean}) {
    const [x, setX] = createSignal<number>(props.x);
    const [y, setY] = createSignal<number>(props.y);
    const [w, setW] = createSignal<number>(0);
    const [h, setH] = createSignal<number>(0);
    const [selected, setSelected] = createSignal<boolean>(false);
    let ref: HTMLSpanElement;

    const [items, setItems, {aabb}]  = useMatchContext();
    
    function drag(e: MouseEvent) {
        if(!selected()) return;
        setX(e.clientX);
        setY(e.clientY); 
    }

    function release() {
        setSelected(false);
        console.log(aabb(items()[props.index]));
    }

    onMount(() => {
        window.addEventListener("mouseup", release);
        window.addEventListener("mousemove", drag);
        setW(ref.offsetWidth);
        setH(ref.offsetHeight);

        if (items()[props.index] === undefined) {
            items().splice(props.index, 0, (() => {
                if(props.term) {
                    return {term: {x: x, y: y, w: w, h: h}, definition: {x: () => 0, y: () => 0, w: () => 0, h: () => 0}}
                } else {
                    return {term: {x: () => 0, y: () => 0, w: () => 0, h: () => 0}, definition: {x: x, y: y, w: w, h: h}} 
                }
            })())
        } else {
            items()[props.index] = (() => {
                if(props.term) {
                    return {term: {x: x, y: y, w: w, h: h}, definition: items()[props.index].definition}
                } else {
                    return {term: items()[props.index].term, definition: {x: x, y: y, w: w, h: h}}
                }
            })();
        }
        console.log({x: x(), y: y(), w: w(), h: h()});
        console.log(items());
    });
    
    return (
        <>
            {/* TODO: Fix type error for ref */}
            <span ref={ref} class="absolute select-none cursor-move" onMouseDown={() => setSelected(true)} style={{ left: x()+ "px", top: y() + "px"}}>
                {props.text}
            </span>
        </>
    )
}