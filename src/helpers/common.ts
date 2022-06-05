/**
 * Used to call a function with exception handling and get the result in place
 * @param function_ - callable function
 * @param args - arguments for the callable function
 * @returns the result of a function call, or undefined when an exception occurs
 */
export function tryCall<T extends (...args: Parameters<T>) => ReturnType<T>>(
  function_: T,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  try {
    return function_(...args);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
    return undefined;
  }
}
