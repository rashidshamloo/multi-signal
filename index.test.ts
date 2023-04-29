import multiSignal from '.';
import events from 'events';

describe('multiSignal(): Testing different abort methods', () => {
  test('Abort using controller.abort() - signal[]', () => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const signal1 = controller1.signal;
    const signal2 = controller2.signal;
    const testSignal = multiSignal(signal1, signal2);
    controller1.abort();
    expect(testSignal!.aborted).toBe(true);
  }, 500);

  test('Abort using already aborted signal - signal[]', () => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const signal1 = controller1.signal;
    const signal2 = controller2.signal;
    controller1.abort();
    const testSignal = multiSignal(signal1, signal2);
    expect(testSignal!.aborted).toBe(true);
  }, 500);

  test('Abort using timeout signal - signal[]', async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutSignal = AbortSignal.timeout(1);
    const testSignal = multiSignal(signal, timeoutSignal);
    setTimeout(() => expect(testSignal!.aborted).toBe(true), 2);
  }, 500);

  test('Abort using already aborted signal - [signal[]]', () => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const signal1 = controller1.signal;
    const signal2 = controller2.signal;
    controller1.abort();
    const testSignal = multiSignal([signal1, signal2]);
    expect(testSignal!.aborted).toBe(true);
  }, 500);

  test('Abort using controller.abort() - [signal[]]', () => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const signal1 = controller1.signal;
    const signal2 = controller2.signal;
    const testSignal = multiSignal([signal1, signal2]);
    controller1.abort();
    expect(testSignal!.aborted).toBe(true);
  }, 500);

  test('Abort using timeout signal - [signal[]]', () => {
    const signal = new AbortController().signal;
    const timeoutSignal = AbortSignal.timeout(1);
    const testSignal = multiSignal([signal, timeoutSignal]);
    setTimeout(() => expect(testSignal!.aborted).toBe(true), 2);
  });

  test('Abort using timeout signal - [signal[]] - 102 signals - no max listener warning should be shown', async () => {
    events.setMaxListeners(110);
    let signals: Array<AbortSignal> = [];
    for (let i = 0; i < 100; i++) signals.push(new AbortController().signal);
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutSignal = AbortSignal.timeout(1);
    const testSignal = multiSignal([signal, timeoutSignal].concat(signals));
    setTimeout(() => expect(testSignal!.aborted).toBe(true), 2);
    events.setMaxListeners(10);
  }, 500);
});
