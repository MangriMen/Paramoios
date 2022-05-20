export function tryCall<T extends (...args: Parameters<T>) => ReturnType<T>>(
  tryFunction: T,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  try {
    return tryFunction(...args);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return undefined;
  }
}
