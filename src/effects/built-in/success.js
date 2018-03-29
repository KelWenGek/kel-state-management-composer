import { merge } from '../../util';
export default function onSuccess({ mergeStrategy, selector = (payload, state) => payload }) {
    return function (state, payload) {
        state[`${payload.target}Loading`] = false;
        state[payload.target] = mergeStrategy(state[payload.target], (payload.selector || selector)(payload, state));
        state[`${payload.target}Error`] = null;
    }
}