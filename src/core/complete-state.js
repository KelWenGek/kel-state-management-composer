export default function completeState(target) {
    return {
        [`${target}Loading`]: false,
        [target]: {
            data: null,
            loaded: false
        },
        [`${target}Error`]: null
    }
}