import * as effects from '../effects'
export default function completeMutation(initMapMergeStrategy, targets) {
    const mutations = {};
    effects.types.forEach(type => {
        mutations[`SET_${type.toUpperCase()}`] = effects[`on${type}`](initMapMergeStrategy())
    });
    if (targets && targets.length) {
        targets.forEach(target => {
            effects.types.forEach(type => {
                const effectHandler = effects[`on${type}`](initMapMergeStrategy(target));
                mutations[`SET_${target.toUpperCase()}_${type.toUpperCase()}`] = function (state, payload) {
                    payload = Object.assign({}, payload || {}, { target });
                    effectHandler.call(this, state, payload);
                }
            });
        });
    }
    return mutations;
}
