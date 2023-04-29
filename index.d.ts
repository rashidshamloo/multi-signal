export const multiSignal: {
  /**
   * Merges multiple AbortSignals into a single signal. returned signal will be aborted if any of the input signals are aborted.
   *
   * MultiSignal ( signal1, signal2, ... ) : AbortSignal
   */
  (...signals: AbortSignal[]): AbortSignal;
  /**
   * Merges multiple AbortSignals into a single signal. returned signal will be aborted if any of the input signals are aborted.
   *
   * MultiSignal ( [ signal1, signal2, ... ] ) : AbortSignal
   */
  (...signals: [AbortSignal[]]): AbortSignal;
};

export default multiSignal;
