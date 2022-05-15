export function tryConst<T>(
  tryFunction: () => T,
): ReturnType<typeof tryFunction> | any {
  try {
    return tryFunction();
  } catch (e: any) {
    console.log(e);
    return undefined;
  }
}
