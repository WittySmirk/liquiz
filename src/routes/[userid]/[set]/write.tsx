import { createSignal, Show } from 'solid-js';
import { useParams, useRouteData } from 'solid-start';
import { routeData } from '~/routes/[userid]';
import type { card } from '~/utils/testset';
import { learnAddCorrect, learnWrong, setNext } from '~/routes/[userid]/[set]/learn';

export enum WriteType {
  PAGE,
  LEARN
}

export function WriteComponent(props: { cards: card[], type: WriteType, index: number | null }) {
  const [intermission, setIntermission] = createSignal<boolean>(false);
  const [current, setCurrent] = createSignal<number>(0);
  const [answered, setAnswered] = createSignal<boolean>(false);
  const [correct, setCorrect] = createSignal<boolean>(false);
  const [right, setRight] = createSignal<number>(0);

  let wrongs: card[] = props.cards;

  let answer: HTMLInputElement;

  function correctCheck() {
    if (
      answer.value.toLowerCase() === props.cards![current()].term.toLowerCase()
    ) {
      if (props.type === WriteType.LEARN) {
        if (props.index) {
          learnAddCorrect(props.index);
          setNext(true);
        }
      } else {
        setCorrect(true);
        setRight((r) => r + 1);
        wrongs?.splice(current(), 1);
      }
    } else {
      if (props.type === WriteType.LEARN) {
        if(props.index) {
          learnWrong(props.index);
          setNext(true);
        }
      }
      setCorrect(false);
    }
  }

  function next() {
    if (current() + 1 < props.cards!.length) {
      setCurrent((c) => c + 1);
    } else {
      setIntermission(true);
    }

    answer.value = '';
    setAnswered(false);
  }

  return (
    <>
      <section
        class="bg-undertone-color-dark rounded-2xl fixed flex flex-col items-center content border-solid border-undertone-color-dark"
        style={{
          width: 'clamp(370px, 50%, 50rem)',
          height: 'clamp(400px, 70%, 60rem)',
          top: '18%',
        }}
      >
        <Show
          when={!intermission()}
          fallback={
            <div>
              <h1>
                {Math.round(
                  (right() / props.cards!.length) * 100
                )}
                % Done
              </h1>
              <button
                onClick={() => {
                  setIntermission(false);

                  props.cards = wrongs;
                  setCurrent(0);

                  answer.value = '';
                  setAnswered(false);
                }}
                class="rounded text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark"
              >
                Keep Going
              </button>
            </div>
          }
        >
          <Show when={props.type != WriteType.LEARN}>
            <div class="text-center">
              <h2 class="text-highlight-color-dark">
                {current() + 1} / {props.cards!.length}
              </h2>
              <p>
                Score {right()} / {props.cards!.length}
              </p>
            </div>
          </Show>

          <p class="ml-1 mr-1 text-2xl">
            {props.cards![current()].definition}
          </p>

          <div
            style={{
              'margin-bottom': '0.1rem',
              'margin-left': '0.1rem',
              'margin-right': '3px',
            }}
            class="rounded bg-bg-color-dark w-full"
          >
            <form
              onsubmit={(e) => {
                e.preventDefault();
                setAnswered(true);
                correctCheck();
              }}
              class="flex flex-col"
            >
              <label
                for="answer"
                class="rounded text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark ml-1 font-bold text-xl"
              >
                Answer
              </label>
              <input
                ref={answer!}
                type="text"
                name="answer"
                id="answer"
                class="rounded m-1 text-highlight-color-dark outline outline-1 outline-highlight-color-dark border-none bg-bg-color-dark"
              />
              <button type="submit" class="m-1">
                Submit
              </button>

              <Show when={props.type != WriteType.LEARN}>
                <Show when={answered()}>
                  <div class="ml-1 mb-1">
                    <h4 class="text-highlight-color-dark">
                      {correct()
                        ? 'Correct!'
                        : 'Incorrect!'}
                    </h4>
                    <p>{props.cards![current()].term}</p>
                    <button
                      onClick={next}
                      class="rounded text-highlight-color-dark border-none outline outline-1 outline-highlight-color-dark bg-bg-color-dark"
                    >
                      Next
                    </button>
                  </div>
                </Show>
              </Show>
            </form>
          </div>
        </Show>
      </section>
    </>
  );
}

export default function Write() {
  const params = useParams();
  const data = useRouteData<typeof routeData>();

  let cards: card[] | undefined = data()?.sets[0].cards;

  return (
    <>
      <h1>Write</h1>
      <a href={`/${params.userid}/${params.set}/`}>Back to Set 🏠</a>

      <Show when={cards} fallback={<p>Loading</p>}>
        <WriteComponent cards={cards!} type={WriteType.PAGE} />
      </Show>
    </>
  );
}
