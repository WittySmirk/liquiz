import { card } from "./testset";

export function shuffle(cards: card[]) {
    return cards.sort(() => Math.random() - 0.5);
}