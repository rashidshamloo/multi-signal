"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiSignal = void 0;
const multiSignal = (...inputSignals) => {
    const signals = Array.isArray(inputSignals[0])
        ? inputSignals[0]
        : inputSignals;
    // if only one signal is provided, return it
    const len = signals.length;
    if (len === 1)
        return signals[0];
    // new signal setup
    const controller = new AbortController();
    const signal = controller.signal;
    // add event listener
    for (let i = 0; i < len; i++) {
        // if signal is already aborted, abort new signal
        if (signals[i].aborted) {
            controller.abort(signals[i].reason);
            break;
        }
        // else add on signal abort: abort new signal
        signals[i].addEventListener('abort', () => {
            controller.abort(signals[i].reason);
        }, { signal });
    }
    return signal;
};
exports.multiSignal = multiSignal;
module.exports = exports.multiSignal;
