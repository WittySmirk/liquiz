import { createSignal, onMount } from "solid-js";

export default function MatchItem(props: {text: string, x: number, y: number}) {
    const [x, setX] = createSignal<number>(props.x);
    const [y, setY] = createSignal<number>(props.y);
    const [selected, setSelected] = createSignal<boolean>(false);

    function drag(e: MouseEvent) {
        if(!selected()) return;
        setX(e.clientX);
        setY(e.clientY);
    }
    
    onMount(() => {
        window.addEventListener("mouseup", () => setSelected(false));
        window.addEventListener("mousemove", drag);
    });
    
    return (
        <span class="absolute select-none cursor-move" onMouseDown={() => setSelected(true)} style={{ left: x()+ "px", top: y() + "px"}}>
            {props.text}
        </span>
    )
}