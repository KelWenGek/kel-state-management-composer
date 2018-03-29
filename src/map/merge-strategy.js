import { isPlainObject, merge } from '../util'
export function defaultMergeStrategy(target) {
    return function (state, payload) {
        state[target] = merge(state[target], payload);
    }
}

export function wrapMergeStrategyToFunc(mapMergeStrategy) {
    const mergeStrategy = typeof mapMergeStrategy === 'function'
        ? mapMergeStrategy()
        : mapMergeStrategy;
    function proxy(target) {
        const targetedMergeStrategy = target ? mergeStrategy[target] || defaultMergeStrategy : defaultMergeStrategy;
        function finalTargetedMergeStrategy(state, payload) {
            const targetedState = state[target];
            return targetedMergeStrategy.call(null, targetedState, payload)
        }
    }
    return proxy;
}

export function whenMergeStrategyIsObjectOrFunction(mapMergeStrategy) {
    return (typeof mapMergeStrategy === 'function' || isPlainObject(mapMergeStrategy))
        ? wrapMergeStrategyToFunc(mapMergeStrategy)
        : undefined
}

export function whenMergeStrategyIsOmitted(mapMergeStrategy) {
    return (!mapMergeStrategy)
        ? (target) => defaultMergeStrategy(target)
        : undefined
}

export default [
    whenMergeStrategyIsObjectOrFunction,
    whenMergeStrategyIsOmitted
]
