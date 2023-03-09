import { JSX, children } from 'solid-js';

export function Container(props: {
    center: boolean;
    onclick: (() => void) | undefined;
    children: JSX.Element;
}) {
    const c = children(() => props.children);
    return (
        <section
            class={
                (props.center ? 'justify-center' : 'justify-between') +
                ' ' +
                'bg-undertone-color-dark rounded-2xl text-center mt-1 flex flex-col'
            }
            style={{ flex: '1 2 25rem', width: 'clamp(370px, 50%, 50rem)' }}
            onclick={props.onclick}
        >
            {c()}
        </section>
    );
}
